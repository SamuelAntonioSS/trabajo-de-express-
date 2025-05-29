

const employeesController = {};
import employeesModel from "../models/Employees.js";

// S E L E C T 

employeesController.getEmployees = async(req, res) =>{
    const employees = await employeesModel.find()
    res.json(employees)
}

// I N S E R T 

employeesController.insertEmployees = async (req, res) => {
  try {
    const newEmployees = new employeesModel(req.body);
    await newEmployees.save();
    res.json({ message: "employees saved" });
  } catch (error) {
    console.error("Error al guardar empleado:", error);
    res.status(500).json({ message: "Error al guardar", error: error.message });
  }
};

// D E L E T E 

employeesController.deleteEmployees = async (req, res) =>{
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "employees deleted"});
}

// U P D A T E 

employeesController.updateEmployees = async (req, res) =>{
    const {name, lastName, birthday, email, addres, hireDate, password, telephone, dui, issNumber, isVerified} = req.body;
    const updateEmployees = await employeesModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, addres, hireDate, password, telephone, dui, issNumber, isVerified},{new: true}
    )
    res.json({message: "employees update"});
};

export default employeesController;

