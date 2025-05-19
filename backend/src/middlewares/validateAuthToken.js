import jsonweboken, { decode } from "jsonwebtoken";
import { config } from "../config.js"

export const validateAuthToken = (allowedUserTypes = [])=> {


    return(req, res, next) =>{

        try {

            //1- Validar si existen las cookies 
            if(!req.cookies){
                 return res.json({message: "No cookies found, ahthorization required"})
            }

            //2- Extraer el token de las cookies
            const {authToken} = req.cookies;

            //3- Extraemos toda la información que tiene el token
            const decoded = jsonweboken.verify(authToken, config.JWT.secret)

            //Almacenar los datos del usuario en un request
            req.user = decoded

            //Verificar si existe
            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Acces denied"})
            }

            //Si el si esta, podemos continuar
            next()

        } catch (error) {
            console.log("error"+error)
        }
    }


}