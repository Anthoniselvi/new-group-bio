import express from "express";
import {
  postMember,
  getAllMembers,
  getMemberbyMemberId,
  getAllMembersByGroupId,
  deleteMember,
  updateMember,
} from "../controllers/Member.js";

const router = express.Router();

router.post("/new", postMember);
router.get("/all", getAllMembers);
router.get("/:memberId", getMemberbyMemberId);
router.get("/all/:groupId", getAllMembersByGroupId);
router.delete("/:memberId", deleteMember);
router.put("/:memberId", updateMember);

export default router;
