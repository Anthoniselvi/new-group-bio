import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  groupId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  course: { type: String, default: "" },
  year: { type: Number, default: "" },
  location: { type: String, default: "" },
  phone: { type: Number, default: "" },
  company: { type: String, default: "" },
  designation: { type: String, default: "" },
  industry: { type: String, default: "" },
  offers: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  website: { type: String, default: "" },
});

const Profiles = mongoose.model("Profiles", ProfileSchema);
export default Profiles;
