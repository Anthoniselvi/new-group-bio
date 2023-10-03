import dotenv from "dotenv";

dotenv.config();

export const postAdmin = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.status(200).json({ message: "Signed in successfully" });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  }
};
