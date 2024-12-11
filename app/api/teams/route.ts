import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import Team from "@/lib/team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { method } = req;
  const { tournamentId } = req.query;

  try {
    switch (method) {
      case "GET":
        if (!tournamentId) {
          return res.status(400).json({ error: "Tournament ID is required" });
        }
        const teams = await Team.find({ tournamentId });
        return res.status(200).json(teams);

      case "POST":
        const { uniqueId, name, rw, kills, playerCount } = req.body;

        if (!uniqueId || !name || !tournamentId || playerCount === undefined) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const newTeam = new Team({
          uniqueId,
          name,
          tournamentId,
          rw: rw || 0,
          kills: kills || 0,
          playerCount,
        });

        await newTeam.save();
        return res.status(201).json(newTeam);

      case "PUT":
        const { id, ...updateData } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Team ID is required" });
        }

        const updatedTeam = await Team.findByIdAndUpdate(id, updateData, {
          new: true,
        });

        if (!updatedTeam) {
          return res.status(404).json({ error: "Team not found" });
        }

        return res.status(200).json(updatedTeam);

      case "DELETE":
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ error: "Team ID is required" });
        }

        const deletedTeam = await Team.findByIdAndDelete(deleteId);

        if (!deletedTeam) {
          return res.status(404).json({ error: "Team not found" });
        }

        return res.status(200).json({ message: "Team deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
