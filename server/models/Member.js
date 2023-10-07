import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  groupId: { type: String, required: true },
  mobile: { type: Number, required: true },
  name: { type: String, default: "" },
  image: { type: String, default: "" },
  course: { type: String, default: "" },
  year: { type: Number, default: "" },
  location: { type: String, default: "" },
  company: { type: String, default: "" },
  designation: { type: String, default: "" },
  industry: { type: String, default: "" },
  offers: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  website: { type: String, default: "" },
});

const Members = mongoose.model("Members", MemberSchema);
export default Members;
