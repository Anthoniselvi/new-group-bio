import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
} from "../controllers/Profile.js";

const router = express.Router();

router.post("/add", postProfile);
router.get("/all", getAllProfiles);
router.get("/:profileId", getProfileById);

export default router;
