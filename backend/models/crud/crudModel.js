import mongoose from "mongoose";

const crudSchema = new mongoose.Schema(
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
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Crud = mongoose.model("Crud", crudSchema);

export default Crud;