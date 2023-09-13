import { check } from "express-validator";


export const RegisterDTO = [
     check("username").notEmpty().withMessage("El campo username es requerido"),

     check("password").notEmpty().withMessage("El campo password es requerido")
]