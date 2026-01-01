import express from "express";
import * as Task from "../controller/taskController.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();
router.post("/create", authentication, Task.createTask);
export default router;
