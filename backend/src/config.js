import dotenv from "dotenv";

// Ejecutamos la libreria
// para acceder al .env
dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI || "mongodb://localhost:27017/cocacolaDB",
  },
  server: {
    port: process.env.PORT || 4000,
  },
  JWT:{
    secret: process.env.JWT_SECRET || "secret123",
    expiresIn: process.env.JWT_EXPIRES || "30d",
  },
  emailAdmin: {
    email: process.env.ADMIN_EMAIL || "yxcug@gmail.com",
    password: process.env.ADMIN_PASSWORD || "123test",
  },
  email:{
    email_user: process.env.EMAIL_USER || "antonysanz06@gmail.com" ,
    email_pass: process.env.EMAIL_PASS || "uuzn tlnn rokt nulg",
  },
  cloudinary:{
    cloudinary_name: process.env.CLOUDINARY_NAME || "duecojmrt",
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || " 991572735439291",
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "U7hREqw7HN4TaoKywIco_lDaxr8",
    cloudinary_api_environment: process.env.CLOUDINARY_API_ENVIRONMENT || "CLOUDINARY_URL=cloudinary://991572735439291:U7hREqw7HN4TaoKywIco_lDaxr8@duecojmrt",
  },
};