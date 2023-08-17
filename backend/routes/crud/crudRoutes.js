import express from "express";

import createCrudController from "../../controllers/crud/createCrudController.js";
import deleteCrudController from "../../controllers/crud/deleteCrudController.js";
import updateCrudController from "../../controllers/crud/updateCrudController.js";
import getCrudController from "../../controllers/crud/getCrudController.js";

const router = express.Router();

router.post("/create", createCrudController);
router.get("/get", getCrudController);
router.put("/update/:id", updateCrudController);
router.delete("/delete/:id", deleteCrudController);

export default router;
