import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/Profile.js";
import adminRoutes from "./routes/Admin.js";
import groupRoutes from "./routes/Group.js";
import memberRoutes from "./routes/Member.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/group", groupRoutes);
app.use("/member", memberRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running Server Port: ${PORT}`));
  })
  .catch((error) => console.error("MongoDB Connection Error:", error));
