import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true }, // Custom UID
  title: { type: String, required: true },
  prizePool: { type: Number, required: true },
  status: { type: String, enum: ["Ongoing", "Finalized"], required: true },
  logo: { type: String, required: true }, // Logo URL
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  background: { type: String, required: true }, // Background URL
  colorScheme: { type: String, enum: ["green", "yellow"], required: true },
});

// Add a virtual `id` field that maps to `_id`
TournamentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Tournament ||
  mongoose.model("Tournament", TournamentSchema);
