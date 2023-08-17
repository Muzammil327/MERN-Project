import Crud from "../../models/crud/crudModel.js";
import asyncHandler from "express-async-handler";

const createCrudController = asyncHandler(async (req, res) => {
  const { fname, lname, email, task } = req.body;
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
  if (!task) {
    return res.json({
      status: 400,
      success: false,
      error: "Task is Required.",
    });
  }

  //   existing email
  const existingEmail = await Crud.find({ email });
  if (!existingEmail) {
    return res.json({
      status: 400,
      success: false,
      error: "Your Email is already exists.",
    });
  }

  try {
    const newUser = new Crud({ fname, lname, email, task });
    const user = await newUser.save();

    return res.json({
      status: 200,
      success: true,
      message: "Crud Successfully Created.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 401,
      success: false,
      error: "I am not creating the crud.",
      error,
    });
  }
});

export default createCrudController;
