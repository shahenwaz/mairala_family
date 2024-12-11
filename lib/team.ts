import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true }, // Custom unique ID for the team
  name: { type: String, required: true },
  tournamentId: { type: String, required: true }, // References the tournament
  rw: { type: Number, default: 0 }, // Rounds Won
  kills: { type: Number, default: 0 },
  playerCount: { type: Number, default: 0 },
});

TeamSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // Convert ObjectId to string
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
