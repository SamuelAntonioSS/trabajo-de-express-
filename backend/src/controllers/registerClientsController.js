import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto"  // Codigo aleatorio

import clientsModel from "../models/Customers.js"
import {config} from "../config.js"
import { text } from "express";
import { error } from "console";

//Creamos un array de funciones
const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    //-1 Solicitar las cosa que vamos a guardar
    const {
        name,
         lastName,
          birthday,
           email,
            password,
             telephone,
              dui,
               isVerified,
            } = req.body;

    try{

        const existsClient = await clientsModel.findOne({email})
        if(existsClient){
            return res.json({message: "Client already exists"})
        }

        // Encriptar la contraseña del empleado
        const passwordHash = await bcryptjs.hash(password, 10)

        // Guardo al cliente en la base de datos
        const newClient = new clientsModel({
            name,
         lastName,
          birthday,
           email,
            password: passwordHash,
             telephone,
              dui: dui || null,
               isVerified: isVerified || false,
        });

        await newClient.save();

        // Generamo un token aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex");
        
        // Crear el token
        const tokenCode = jsonwebtoken.sign(
            //1 ¿Que vamos a guardar?
            {email, verificationCode},
            //2- Palabra secreta
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: "2h"}
        )

        res.cookies("VerificationToken", tokenCode, {maxAge: 2*60*60*1000})

        // Enviar el correo electronico
        //1- Trasporter => Quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth:{
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        });

        //2- mailoptionns => Quien lo envia

        const mailOptions = {

            from: config.email.email_user,
            // ¿quien lo recibe?
            to: email,
            // Asunto
            subject: "Verificacion de correo",
            // Cuerpo del correo electronico
            text: `Para verificar tu correo , utiliza el siguiente codigo ${verificationCode}\n El codigo vence en dos horas utilizalo antes de ese tiempo rey`

        }  
        //3- Enviar correo

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) return res.json({message: "Error"}) 

                console.log("Cooreo enviado" + info.response) 
        })

        res.json({message: "CLient registered. Please verify your email whit the code send"})

    }catch (error){
    res.json({message: "Error" + error})
    }
};

//Verificar el codigo

registerClientsController.verifyCodeEmail = async (req, res) => {
    const {verificationCode} = req.body;

    const token = req.cookies.VerificationToken;

    try{

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode } = decoded

        //Comparar el código que enviamos al correo 
        //Con el que el usuario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        //Cambiamos el esatdo de "isverified a true"
        const client = await clientsModel.findOne({email});
        client.isVerified = true;
        await client.save();

        res.json({message: "Email verified sucessfull"})

        //Quito la cookie con el token
        res.clearCookie("VerificationToken");

    } catch(error){
        res.json({message: "error"});

    }
};

export default registerClientsController;