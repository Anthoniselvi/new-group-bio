import Members from "../models/Member.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Groups from "../models/Group.js";

export const postMember = (req, res) => {
  const { mobile, groupId } = req.body;

  const memberId = uuidv4();

  if (!mobile) {
    return res.status(400).json("Mobile Number is mandatory field");
  }

  Groups.findOne({ groupId })
    .then((group) => {
      if (!group) {
        return res.status(404).json("Group not found");
      }

      const newProfile = new Members({
        memberId,
        groupId,
        mobile,
      });

      newProfile
        .save()
        .then(() => res.json("Member added"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllMembers = (req, res) => {
  Members.find()
    .then((members) => res.json(members))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getMemberbyMemberId = (req, res) => {
  const memberId = req.params.memberId; // Use req.params._id directly
  console.log("memberId: " + memberId);
  Members.findOne({ memberId: memberId })
    .then((member) => {
      if (!member) {
        return res.status(404).json("Member not found");
      }
      res.json(member);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteMember = (req, res) => {
  const memberId = req.params.memberId;
  Members.deleteOne({ memberId: memberId })
    .then((member) => {
      if (member.deletedCount === 0) {
        return res.status(404).json("Member not found");
      }
      res.json("Member deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateMember = (req, res) => {
  const memberId = req.params.memberId;

  const updatedData = req.body;

  Members.findOne({ memberId })
    .then((member) => {
      if (!member) {
        return res.status(404).json("Member not found");
      }

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

      member
        .save()
        .then(() => res.json("Member updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllMembersByGroupId = (req, res) => {
  const groupId = req.params.groupId;
  console.log("groupId: " + groupId);

  // Use groupId to query profiles
  Members.find({ groupId: groupId })
    .then((members) => {
      if (!members || members.length === 0) {
        return res.status(404).json("Members not found");
      }
      res.json(members);
      console.log("Members by groupId: " + JSON.stringify(members));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
