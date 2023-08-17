import express from "express";
import loginController from "../../controllers/authentication/loginController.js";
import registerController from "../../controllers/authentication/registerController.js";
import getUser from "../../controllers/authentication/userController.js";

import VerifyToken from "../../utils/VerifyToken.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user",VerifyToken, getUser);

export default router;
