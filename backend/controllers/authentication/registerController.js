import AuthUser from "../../models/authentication/authModel.js";
import { hashPassword } from "../../helper/bcrypt.js";

const registerController = async (req, res) => {
  const { fname, lname, password, cpassword, email } = req.body;
  //   validation
  if (!fname) {
    return res.json({
      status: 400,
      success: false,
      error: "First Name is required.",
    });
  }
  if (!lname) {
    return res.json({
      status: 400,
      success: false,
      error: "Last Name is Required.",
    });
  }
  if (!email) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is Required.",
    });
  }
  if (!password) {
    return res.json({
      status: 400,
      success: false,
      error: "Password is Required.",
    });
  }
  if (!cpassword) {
    return res.json({
      status: 400,
      success: false,
      error: "Confirm Password is Required.",
    });
  }
  if (password !== cpassword) {
    return res.json({
      status: 400,
      success: false,
      error: "Password and Confirm Password is not Match.",
    });
  }
  //   existing email
  const existingEmail = await AuthUser.findOne({ email });
  if (existingEmail) {
    return res.json({
      status: 400,
      success: false,
      error: "Already Register please login",
    });
  }
  // ------------ password hash ------------
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = new AuthUser({
      fname,
      lname,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });
    // send user data
    const user = await newUser.save();
    return res.json({
      status: 200,
      success: true,
      message: "Register Successfull.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: "Error during user register.",
      error,
    });
  }
};

export default registerController;
