import faqsModel from "../models/faqs.js";

const faqsController = {};

//SELECT

faqsController.getfaqs =async (req, res) => {
    try {
        const faqs = await faqsModel.find();
    res.status(200).json(faqs);
    } catch (error) {
        console.log("error" + error)
        res.status(400).json({message: "Internal error"})
    }

    
};

/*************************INSERT***************************/

faqsController.createfaqs = async (req, res) => {

    try {
        //1- Pido las cosas
        const {question, answer, level, isActive} =req.body;

        if(level < 1 || level > 5){
            return res.status(400).json({message: "Ingrese nivel validó"})
        }

        //Validacion de campos vacios
        if(!question || !answer || !level || !isActive){
            return res.status(400).json({message: "Ingrese los datos"})
        }

        //Validacion de longitud
        if(question.length < 4 || answer.length < 4){
           return res.status(400).json({message: "Ingrese mas letras"})
        }

        //2- Guardo enb la base de datos
    const newfaqs = new faqsModel ({question, answer, level, isActive});
    await newfaqs.save();
    //3-
    res.json({message: "faqs save"});
    } catch (error) {}
    
}

//DELETE

faqsController.deletefaqs = async (req, res) => {
    try {
      await faqsModel.findByIdAndDelete(req.params.id);
        res.json({message: "faqs"})
    
    
    } catch (error) {
        console.error("error"+error)
        res.status(404).json({message: "Internal server"})
    }
    
};

//UPDATE

faqsController.updatefaqs = async (req, res) => {
    //solicito valores
    const{question, answer, level, isActive} = req.body;
    //Atualizado
    await faqsModel.findByIdAndUpdate(
        req.params.id,
        {question, answer, level, isActive},
        {new: true}
    );
    res.json({message: "faqs update"});
}

export default faqsController;