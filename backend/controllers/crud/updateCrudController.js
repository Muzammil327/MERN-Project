import Crud from "../../models/crud/crudModel.js";
import asyncHandler from "express-async-handler";

const updateCrudController = asyncHandler(async (req, res) => {
  const { fname, lname, email, task } = req.body;
  const { id } = req.params;

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
  try {
    const user = await Crud.findByIdAndUpdate(id, { fname, lname, email, task }, { new: true });
    return res.json({
      status: 200,
      success: true,
      message: "Your Task is updating.",
      user
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: "Your Task is not updating.",
      error
    });
  }
});

export default updateCrudController;
