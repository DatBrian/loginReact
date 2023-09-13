import rateLimit from "express-rate-limit";
export let limitLogin = ()=>{
    return rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 10,
        standardHeaders: true, 
        legacyHeaders: false, 
        skip: (req,res)=>{
            if(req.headers["content-length"]>80){
                res.status(413).send({
                    message: "Intentos de Solicitud Alcanzado, Vuelva a intentarlo en una Hora"
                });
                return true;
            }
        }, 
        message: (req,res)=>{
            res.status(429).send({
                message: "Limite alcanzado"
            });
        }
    })    
}

export let limitUsuario = ()=>{
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true, 
        legacyHeaders: false, 
        message: (req,res)=>{
            res.status(429).send({
                message: "Limite alcanzado"
            });
        }
    })    
}