/* eslint-disable no-useless-catch */
import Connection from "../../db/Connection.js";
import UserSchema from "../../models/schemas/UserSchema.js";
import ClientError from "../../utils/ClientError.js";

class AuthController extends Connection {
    constructor() {
        super();
        this.service = null;
    }

    async findUser(req, res) {
        try {
            if (!req.rateLimit) return;
            res.status(req.data.status).send(req.data);
        } catch (error) {
            new ClientError(400, "Error al obtener los Auth Controlador");
            throw error.message;
        }
    }

    async createUser(req, res) {
        try {
            await this.connect();
            const exist = await UserSchema.findUser(req.body.user);
            const response =
                exist === false
                    ? await UserSchema.createUser(req.body)
                    : `El usuario con username: ${req.body.user} ya existe`;
            res.json(response);
        } catch (error) {
            throw error;
        } finally {
            this.close();
        }
    }
}
export default AuthController;