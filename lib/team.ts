import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  tournamentId: { type: String, required: true },
  rw: { type: Number, default: 0 },
  teamKills: { type: Number, default: 0 },
  playerCount: { type: Number, default: 0 },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
