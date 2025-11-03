// models/Enquiry.js
import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseInterest: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Enquiry", schema);
