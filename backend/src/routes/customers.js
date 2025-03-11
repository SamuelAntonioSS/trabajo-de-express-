
import express from "express";
import customersController from "../controllers/customersController.js";



const router =  express.Router();

router.route("/")
.get(customersController.getCustomers)
.post(customersController.insertCustomers)

router
.route("/:id")
.put(customersController.updateCustomers)
.delete(customersController.deleteCustomers);

export default router;