import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("Master", schema);
