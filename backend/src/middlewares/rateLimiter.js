import rateLimit from "express-rate-limit"

//1- Configuramos la libreria
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: {
        status: 429,
        error: "Too many request"
    }
});

export default limiter;