import jsonwebtoken from "jsonwebtoken"// Token
import bcryptjs from "bcryptjs" //Encriptar

import clientsModel from "../models/Customers.js";
import employeeModel from "../models/Employees.js";

import { HTMLRecoveryEmail, sendEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config";

// 1- Crea un array de funciones 
 passwordRecoveryController.requestCode = async (req, res) =>{
    const {email} = req.body;

    try {
        
        let userFound;
        let userType;

        userFound = await clientsModel.findOne({email});
        if (userFound) {
            userType = "client"
        } else {
            userFound = await employeeModel.findOne({email});
            userType = "employee";
        }

        if(!userFound){
            return res.json({message: "User not found"})
        }

        // generar un codigo de 6 digitos
        const code = Math.floor(10000 + Math.random()*60000).toString();
        
        // generar un token 
        const token = jsonwebtoken.sign(
            //1- ¿que voy a guardar?
            {email, code, userType, verfied: false},
            //2- secret key 
            config.JWT.secret,
            //3- ¿cuando expira?
            {expiresIn: "25m"}
        )

        res.cookie("tokenRecoveryCode", token, {maxAge: 25*60*1000})

        await sendEmail(
            email,
            "Password recovery Code",
            `your verification code is ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "Verification code send"})


    } catch (error) {
        console.log("error" + error )
    }
}