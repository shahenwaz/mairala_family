import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tournamentId: { type: String, required: true },
  rw: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  playerCount: { type: Number, default: 0 },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
