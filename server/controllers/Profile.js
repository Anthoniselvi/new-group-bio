import Profiles from "../models/Profile.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const postProfile = (req, res) => {
  //   const profileId = req.body.profileId;
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

  const newProfile = new Profiles({
    // profileId,
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
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllProfiles = (req, res) => {
  Profiles.find()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getProfileById = (req, res) => {
  const profileId = req.params._id;
  //   const profileId = req.query._id;
  Profiles.findOne({ profileId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteProfile = (req, res) => {
  const profileId = req.params._id;
  Profiles.deleteOne({ profileId: profileId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json("Entry not found");
      }
      res.json("Entry deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
