
const branchesController = {};
import branchesModel from "../models/Branches.js"

// S E L E C T 

branchesController.getbranches = async (req, res) => {
    const branches = await branchesModel.find();
    res.json(branches);
};

//  I N S E R T 
branchesController.createbranches = async (req, res) => {
    const {name, addres, birthday, telephone, schedule} = req.body;
    const newbranches = new branchesModel({name, addres, birthday, telephone, schedule});
    await newbranches.save();
    res.json({ message: "branches save"});
};

// D E L E T E 
branchesController.deletebranches = async (req, res) => {
    const deletebranches = await branchesModel.findByIdAndDelete(req.params.id);
    if (!deletebranches) {
        return res.status(404).json({ message:  "branches dont find" });
    }
};

// U P D A T E 
branchesController.updatebranches = async (req, res) => {
    //Solicito todos los valores
    const {name, addres, birthday, telephone, schedule} = req.body;
    //Actualizo
    await branchesModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
             addres,
              birthday,
               telephone,
                schedule
        },
        { new: true}
    );
    res.json({ message: "branches update "});
}

export default branchesController;
