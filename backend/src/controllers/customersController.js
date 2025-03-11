
const customersController = {};
import customersModel from "../models/Customers.js"

// S E L E C T

customersController.getCustomers = async(req, res) =>{
    const customers = await customersModel.find()
    res.json(customers)
}

// I N S E R T 

customersController.insertCustomers = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const newCustomers = new customersModel({name, lastName, birthday, email, password, telephone, dui, isVerified})
    await newCustomers.save()
    res.json({message: "customers saved"});
}

// D E L E T E

customersController.deleteCustomers = async (req, res) =>{
    await customersModel.findByIdAndDelete(req.params.id);
    res.json({message: "customers deleted"});
}

// U P D A T E 

customersController.updateCustomers = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updateCustomers = await customersModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, password, telephone, dui, isVerified},{new: true}
    )
    res.json({message: "customers update"});
};

export default customersController;