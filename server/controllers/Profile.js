import Profiles from "../models/Profile.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { v4 as uuidv4 } from "uuid";

export const postProfile = (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const course = req.body.course;
  const year = req.body.year;
  const location = req.body.location;
  const phone = req.body.phone;
  const company = req.body.company;
  const designation = req.body.designation;
  const industry = req.body.industry;
  const offers = req.body.offers;
  const linkedin = req.body.linkedin;
  const website = req.body.website;

  // Generate a unique profileId using UUID
  const profileId = uuidv4();

  const newProfile = new Profiles({
    profileId,
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
