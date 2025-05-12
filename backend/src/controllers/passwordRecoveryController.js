import jsonwebtoken from "jsonwebtoken"// Token
import bcryptjs from "bcryptjs" //Encriptar

import clientsModel from "../models/Customers.js";
import employeeModel from "../models/Employees.js";

import { HTMLRecoveryEmail, sendEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";


// 1- Crea un array de funciones 

const passwordRecoveryController = {};


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

//////////// VERIFICAR EL CÒDIGO QUE ME ENVIARON POR CORREO
passwordRecoveryController.verifyCode = async (req, res) =>{
    const { code } = req.body;
    
    try {
        // Obtener el token
        const token = req.cookies.tokenRecoveryCode;

        // Extraer todos los datos del token
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)

        // Comparar el codigo que esta guardado en el token 
        // con el codigo que el usuario escribió
        if(decoded.code !== code){
            return res.json({ message: "Invalid code mi rey"});
        }

        //Marcamos el token como verficado (si es correcto)
        const newToken = jsonwebtoken.sign(
            //1- ¿Que vamos a guardar?
            {email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                verfied: true
            },
            //2- secret key
            config.JWT.secret,
            //3- ¿Cuando vence?
            {expiresIn: "25m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge:25*60*1000})

        res.json({message: "Code verified sucessfully osea si esta bien mi rey"})
    } catch (error) {
        console.log("error" + error);
    }

};    

passwordRecoveryController.newPassword = async (req, res) =>{
        const { newPassword } = req.body;
        
        try {
            //Acceder al token que esta en las galletas
            const token = req.cookies.tokenRecoveryCode

            //decodificar el token
            const decoded = jsonwebtoken.verify(token, config.JWT.secret)

            //verificar si el codigo ya fue verificado
            if(!decoded.verfied){
                return res.json({message:"Code not verified mi rey, mal ahi"});
            }

            let user;


            // Encriptar la contraseña 
            const hashedPassword = await bcryptjs.hash(newPassword, 10)

            //Guardamos la nueva contradeña en la base de datos
            if(decoded.userType === "client"){
                user = await clientsModel.findOneAndUpdate(
                    {email: decoded.email},
                    {password: hashedPassword},
                    {new: true}
                )
            }else if (decoded.userType === "employee"){
                user = await employeeModel.findOneAndUpdate(
                    {email: decoded.email},
                    {password: hashedPassword},
                    {new: true}
                )
            }

            res.clearCookie("tokenRecoveryCode")

            res.json({message: "Password update mi rey"})
            
        } catch (error) {
            console.log("error" + error);
        }
    };
    


export default passwordRecoveryController;