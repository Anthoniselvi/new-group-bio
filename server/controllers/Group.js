import { v4 as uuidv4 } from "uuid";
import Groups from "../models/Group.js";
import Members from "../models/Member.js";

export const postGroup = (req, res) => {
  const { groupName, groupType, groupDescription, groupImage } = req.body;
  const groupId = groupName.toLowerCase().replace(/\s+/g, "_");

  const newGroup = new Groups({
    groupId,
    groupName,
    groupType,
    groupDescription,
    groupImage,
  });

  newGroup
    .save()
    .then(() => res.json("New Group added"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        // Handle validation errors
        const errors = {};
        for (let field in err.errors) {
          errors[field] = err.errors[field].message;
        }
        res.status(400).json({ errors });
      } else {
        // Handle other errors
        res.status(500).json("Error: " + err.message);
      }
    });
};

export const getAllGroups = (req, res) => {
  Groups.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const updateGroup = (req, res) => {
  const groupId = req.params.groupId;
  const updatedData = req.body;

  Groups.findOne({ groupId })
    .then((group) => {
      if (!group) {
        return res.status(200).json({ message: "Group not found" });
      }

      // Update group properties
      group.groupName = updatedData.groupName;
      group.groupType = updatedData.groupType;
      group.groupDescription = updatedData.groupDescription;
      group.groupImage = updatedData.groupImage;

      // Save the updated group
      group
        .save()
        .then(() => res.json({ message: "Group updated successfully" }))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
    })
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

export const deleteGroup = (req, res) => {
  const groupId = req.params.groupId;

  Members.deleteMany({ groupId: groupId })
    .then(() => {
      Groups.deleteOne({ groupId: groupId })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.status(200).json({ message: "Group not found" });
          }
          res.json({
            message: "Group and associated members deleted successfully",
          });
        })
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
    })
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

export const getSingleGroupbyGroupId = (req, res) => {
  const groupId = req.params.groupId;
  Groups.findOne({ groupId })
    .then((group) => {
      if (!group) {
        return res.status(200).json({ message: "Group not found" });
      }
      res.json(group);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
