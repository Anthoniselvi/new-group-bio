import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  updateProfile,
} from "../controllers/Profile.js";

const router = express.Router();

router.post("/add", postProfile);
router.get("/all", getAllProfiles);
router.get("/:profileId", getProfileById);
router.delete("/:profileId", deleteProfile);
router.put("/:profileId", updateProfile);

export default router;
