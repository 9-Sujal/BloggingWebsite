import mongoose from "mongoose";
const schema = new mongoose.Schema({ _id: String, count: { type: Number, default: 0 } });
export default mongoose.models.Visitor || mongoose.model("Visitor", schema);