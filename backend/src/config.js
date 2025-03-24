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
};