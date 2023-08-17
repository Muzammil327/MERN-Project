import AuthUser from "../models/authentication/authModel.js";
import JWT from "jsonwebtoken";

export default async function VerifyToken(req, res, next) {
  const cookies = req.headers.cookie;

  const token = cookies.split("=")[1];
  try {
    if (!token) {
      return res.json({
        success: false,
        message: "NO Token Given",
      });
    }
    JWT.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid TOken" });
      }
      console.log(user.id);
      req.id = user.id;
    });
    next();
  } catch (error) {
    console.log(error);
  }
}
