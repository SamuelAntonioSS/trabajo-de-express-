
import express from "express";
import branchesController from "../controllers/branchesController.js"

const router = express.Router();

router.route("/")
.get(branchesController.getbranches)
.post(branchesController.createbranches)

router
.route("/:id")
.put(branchesController.updatebranches)
.delete(branchesController.deletebranches);

export default router;