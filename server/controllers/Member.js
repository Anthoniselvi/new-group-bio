import Members from "../models/Member.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Groups from "../models/Group.js";

export const postMember = (req, res) => {
  const { mobile, groupId } = req.body;

  const memberId = uuidv4();

  if (!mobile) {
    return res
      .status(400)
      .json({ message: "Mobile Number is a mandatory field" });
  }

  Groups.findOne({ groupId })
    .then((group) => {
      if (!group) {
        return res.status(200).json({ message: "Group not found" });
      }

      const newProfile = new Members({
        memberId,
        groupId,
        mobile,
      });

      newProfile
        .save()
        .then(() => res.json({ message: "Member added successfully" }))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
    })
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

export const getAllMembers = (req, res) => {
  Members.find()
    .then((members) => res.json(members))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getMemberbyMemberId = (req, res) => {
  const memberId = req.params.memberId;
  console.log("memberId: " + memberId);

  Members.findOne({ memberId: memberId })
    .then((member) => {
      if (!member) {
        return res.status(200).json({ message: "Member not found" });
      }
      res.json(member);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteMember = (req, res) => {
  const memberId = req.params.memberId;

  Members.deleteOne({ memberId: memberId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(200).json({ message: "Member not found" });
      }
      res.json({ message: "Member deleted successfully" });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateMember = (req, res) => {
  const memberId = req.params.memberId;
  const updatedData = req.body;

  Members.findOne({ memberId })
    .then((member) => {
      if (!member) {
        return res.status(200).json({ message: "Member not found" });
      }

      // Update member properties
      member.name = updatedData.name;
      member.image = updatedData.image;
      member.course = updatedData.course;
      member.year = updatedData.year;
      member.location = updatedData.location;
      member.company = updatedData.company;
      member.designation = updatedData.designation;
      member.industry = updatedData.industry;
      member.offers = updatedData.offers;
      member.linkedin = updatedData.linkedin;
      member.website = updatedData.website;

      // Save the updated member
      member
        .save()
        .then(() => res.json({ message: "Member updated successfully" }))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
    })
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

export const getAllMembersByGroupId = (req, res) => {
  const groupId = req.params.groupId;

  Members.find({ groupId: groupId })
    .then((members) => {
      if (!members || members.length === 0) {
        return res.status(200).json({ message: "Members not found" });
      }
      res.json(members);
      console.log("Members by groupId: " + JSON.stringify(members));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
