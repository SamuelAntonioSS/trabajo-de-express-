import express from "express";
import registerEmployeessController from "../controllers/registerEmployeesController.js";

const router = express.Router();

router.route("/").post(registerEmployeessController.register);

export default router;