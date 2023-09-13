import { check } from "express-validator";

export const UserDTO = [

    check("username").notEmpty().withMessage("El campo username es obligatorio"),

    check("password").notEmpty().withMessage("El campo password es obligatorio"),

    check("roles").notEmpty().withMessage("Ingrese al menos un rol"),

    check("permisos").notEmpty().withMessage("Ingresar al menos un permiso de la siguiente manera: /ruta:[version]")
]