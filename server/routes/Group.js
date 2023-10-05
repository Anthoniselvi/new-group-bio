import express from "express";
import {
  postGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
} from "../controllers/Group.js";

const router = express.Router();

router.post("/add", postGroup);
router.get("/all", getAllGroups);
router.put("/:groupId", updateGroup);
router.delete("/:groupId", deleteGroup);

export default router;
