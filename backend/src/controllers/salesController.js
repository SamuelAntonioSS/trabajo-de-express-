import SalesModel from "../models/Sales.js";

//Arrary de funciones vacio
const salesController = {};

//Select

salesController.getAllSales = async(req, res)=>{
    try {
        const sales = await SalesModel.find()
        res.status(200).json(sales)
    } catch (error) {
        console.log("Error"+error)
        res.status(500).json({message: "Internal server"});
    }
}

//Insert
salesController.insertSales = async (req, res)=>{
    try {
        //Pedir los datos a utilizar
        const {product, category, customer, total} = req.body;

        if (total < 0) {
            res. status(400).json({message: "Ingrese un valor valido"})
        }

        const newSales = new SalesModel({product, category, customer, total});
        await newSales.save()

        //Mensaje de confirmacion
        res.status(200).json({ message: "Venta registrada"})

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Editar

salesController.updateSales = async (req, res)=>{
    try {
        //Pedir los datos
        const {product, category, customer, total} = req.body;

        if (total < 0) {
            res. status(400).json({message: "Ingrese un valor valido"})
        }
        await SalesModel.findByIdAndUpdate(
            req.params.id,
            {product, category, customer, total},
            {new: true}
        );

        //Mensaje de confirmacion
        res.status(200).json({ message: "Venta update"})


    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Eliminar

salesController.deleteSales = async (req, res)=>{
    try {
        await SalesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Sales deleted"})
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//=========================
// Ventas por categoria 
//=========================

salesController.getSalesByCategory = async(req, res)=>{
    try {
        
        const resultado = await SalesModel.aggregate(
            [
                {
                    $group:{
                        _id: "$category",
                        totalVentas: {$sum: "$total"}
                    }
                },
                //Odernar los resultados
                {
                    $sort: {totalVentas: -1}
                }
            ]
        )


        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//============
//Producto mas vendido
//============

salesController.getTopSellingProducts = async(req, res) =>{
    try {
        const resultado = await SalesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$products",
                        totalSales: {$sum: 1}
                    }
                },
                //Ordenar los resultados
                {
                    $sort: {totalSales: -1}
                },
                //Limitar la cantidad de datos a mostrar
                {
                    $limit: 5
                }
            ]
        )

        res.status(200).json(resultado);
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//============
//Ganancias totales 
//============

salesController.totalEarnings = async(req, res) =>{
    try {
        const resultado = await SalesModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        gananciasTotales: {$sum: "$total"}
                    }

                }
            ]
        )

        res.status(200).json(resultado)
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//============
//Cliente frecuentes
//============

salesController.getFrequentCustomers = async(req, res) =>{
    try {
        const resultado = await SalesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$customer",
                        comprasRealizadas: {$sum: 1}
                    }

                },
                //Ordenar las compras
                {
                    $sort: {comprasRealizadas: -1}
                },
                //Limitar
                {
                    $limit: 3
                }
            ]
        )

        res.status(200).json(resultado)
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

export default salesController;