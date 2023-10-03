import express from "express";
import { postAdmin } from "../controllers/Admin.js";

const router = express.Router();

router.post("/add", postAdmin);

export default router;
