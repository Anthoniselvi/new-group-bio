import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
} from "../controllers/Profile.js";

const router = express.Router();

router.post("/add", postProfile);
router.get("/all", getAllProfiles);
router.get("/:profileId", getProfileById);
router.delete("/:profileId", deleteProfile);

export default router;
