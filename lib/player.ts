import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  playerKills: { type: Number, default: 0 },
});

PlayerSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // Convert ObjectId to string
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
