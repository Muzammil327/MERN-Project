import Crud from "../../models/crud/crudModel.js";
import asyncHandler from "express-async-handler";

const getCrudController = async (req, res) => {
  try {
    const user = await Crud.find();
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export default getCrudController;
