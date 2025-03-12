
import express from "express";
import employeesController from "../controllers/employeesControlers";



const router =  express.Router();



router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees)

router("/:id")
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees);

export default router;

