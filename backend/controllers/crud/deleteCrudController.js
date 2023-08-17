import Crud from "../../models/crud/crudModel.js";
import asyncHandler from "express-async-handler";

const deleteCrudController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Crud.findByIdAndDelete(id);
    return res.json({
      status: 200,
      success: true,
      message: "Your Task is deleting.",
      user
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: "Your Task is not deleting.",
      error
    });
  }
};

export default deleteCrudController;
