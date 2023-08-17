import mongoose from "mongoose";

const AuthUserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
    },
  },
  { timestamps: true }
);

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

export default AuthUser;