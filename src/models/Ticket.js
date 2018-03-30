import mongoose from "mongoose";

const schema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  master: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

export default mongoose.model("Ticket", schema);
