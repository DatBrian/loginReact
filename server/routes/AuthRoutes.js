import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import AuthController from "../api/v1/AuthController.js";
import { limitLogin } from "../helpers/limit.js";
import { crearToken } from "../helpers/JWT.js";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware.js";
import { UserDTO } from "../models/dto/UserDTO.js";
import UserSchema from "../models/schemas/UserSchema.js";
import { RegisterDTO } from "../models/dto/RegisterDTO.js";

class AuthRoutes {
    constructor() {
        this.path = "/auth";
        this.router = Router();
        (this.controller = new AuthController()),
            (this.version = routesVersioning());
        this.initRoutes();
        this.schema = null;
    }

    async initRoutes() {
        this.router.post(
            `/signin`,
            limitLogin(),
            new ValidateDTOMiddleware(
                RegisterDTO,
                UserSchema.registerProperties()
            ).validate(),
            crearToken,
            (req, res) => {
                this.version({
                    "1.0.0": this.controller.findUser(req, res),
                });
            }
        );
        this.router.post(
            `/signup`,
            new ValidateDTOMiddleware(
                UserDTO,
                UserSchema.properties()
            ).validate(),
            (req, res) => {
                this.version({
                    "1.0.0": this.controller.createUser(req, res),
                });
            }
        );
    }
}

export default AuthRoutes;
