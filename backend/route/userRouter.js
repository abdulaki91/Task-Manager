import express from "express";
import * as UserController from "../controller/userController.js";
import authentication from "../middleware/authentication.js";
const router = express.Router();
router.get("/me", authentication, UserController.getUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;
