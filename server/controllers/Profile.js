import Profiles from "../models/Profile.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { v4 as uuidv4 } from "uuid";
import Groups from "../models/Group.js"; // Import the Groups model

export const postProfile = (req, res) => {
  const {
    name,
    image,
    course,
    year,
    location,
    phone,
    company,
    designation,
    industry,
    offers,
    linkedin,
    website,
    groupId,
  } = req.body;

  const profileId = uuidv4();

  if (
    !name ||
    !location ||
    !company ||
    !designation ||
    !industry ||
    !offers ||
    !linkedin ||
    !website
  ) {
    return res
      .status(400)
      .json(
        "Name, location, Company, Designation, Industry, Offers, Linkedin and Website are mandatory fields"
      );
  }
  // Retrieve the groupType for the specified groupId
  Groups.findOne({ groupId })
    .then((group) => {
      if (!group) {
        return res.status(404).json("Group not found");
      }

      // Check groupType and validate course and year accordingly
      if (group.groupType === "0" && (!course || !year)) {
        return res
          .status(400)
          .json("Course and Year are mandatory for this groupType");
      }

      // Create a new profile associated with the groupId
      const newProfile = new Profiles({
        profileId,
        groupId, // Include groupId in the profile
        name,
        image,
        course,
        year,
        location,
        phone,
        company,
        designation,
        industry,
        offers,
        linkedin,
        website,
      });

      newProfile
        .save()
        .then(() => res.json("Profile added"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllProfiles = (req, res) => {
  Profiles.find()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getProfileById = (req, res) => {
  const profileId = req.params.profileId; // Use req.params._id directly
  console.log("profileId: " + profileId);
  Profiles.findOne({ profileId: profileId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteProfile = (req, res) => {
  const profileId = req.params.profileId;
  Profiles.deleteOne({ profileId: profileId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json("Entry not found");
      }
      res.json("Entry deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateProfile = (req, res) => {
  const profileId = req.params.profileId;

  // Parse the JSON data from the request body
  const updatedData = req.body;

  Profiles.findOne({ profileId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json("Profile not found");
      }

      // Update the profile data with the parsed JSON data
      profile.name = updatedData.name;
      profile.image = updatedData.image;
      profile.course = updatedData.course;
      profile.year = updatedData.year;
      profile.location = updatedData.location;
      profile.phone = updatedData.phone;
      profile.company = updatedData.company;
      profile.designation = updatedData.designation;
      profile.industry = updatedData.industry;
      profile.offers = updatedData.offers;
      profile.linkedin = updatedData.linkedin;
      profile.website = updatedData.website;

      profile
        .save()
        .then(() => res.json("Profile updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getProfilesByGroupId = (req, res) => {
  const groupId = req.params.groupId;
  console.log("groupId: " + groupId);

  // Use groupId to query profiles
  Profiles.find({ groupId: groupId })
    .then((profiles) => {
      if (!profiles || profiles.length === 0) {
        return res.status(404).json("Profiles not found");
      }
      res.json(profiles);
      console.log("Profiles by groupId: " + JSON.stringify(profiles));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
