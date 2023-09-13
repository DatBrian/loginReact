import { check } from "express-validator";

export const UserDTO = [

    check("username").notEmpty().withMessage("El campo username es obligatorio"),

    check("password").notEmpty().withMessage("El campo password es obligatorio"),

    check("role").notEmpty().withMessage("Ingrese al menos un rol donde [1] es admin y [2] es usuario"),

    check("permisos").notEmpty().withMessage("Ingresar al menos un permiso de la siguiente manera: /ruta:[version]")
]