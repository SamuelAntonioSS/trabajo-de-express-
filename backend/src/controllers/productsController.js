//array de funciones del CRUD

const productsController = {};
import productsModel from "../models/Products.js";
// S E L E C T

productsController.getProducts = async(req, res) =>{
   const products = await productsModel.find()
   res.json(products)
}

// I N S E R T

