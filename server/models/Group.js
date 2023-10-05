import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  groupName: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading and trailing whitespace
    minlength: 1, // Minimum length for the group name
  },
  groupType: {
    type: String,
    required: true,
    validate: {
      validator: (value) => ["0", "1", "2"].includes(value),
      message: "Invalid groupType value",
    },
    get: (value) => {
      switch (value) {
        case "0":
          return "Alumni";
        case "1":
          return "Business";
        case "2":
          return "Friends";
        default:
          return value; // Return the original value if it doesn't match any mapping
      }
    },
    set: (value) => {
      switch (value) {
        case "Alumni":
          return "0";
        case "Business":
          return "1";
        case "Friends":
          return "2";
        default:
          return value; // Return the original value if it doesn't match any mapping
      }
    },
  },
  groupDescription: { type: String },
  groupImage: { type: String },
});

const Groups = mongoose.model("Groups", GroupSchema);
export default Groups;
