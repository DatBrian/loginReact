import { SignJWT, jwtVerify } from "jose";
import Connection from "../db/Connection.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import UserSchema from "../models/schemas/UserSchema.js";
dotenv.config();
const crearToken = async (req, res, next) => {
    try {
        const connection = new Connection();
        await connection.connect();
        const conexionDB = await connection.getDatabase();

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Datos no enviados" });
        }
        const {user, contraseña} = req.body

        const usuario = await conexionDB.collection("user").findOne({"user": user});

        if (!usuario) {
            return res.status(401).send({ message: `El usuario ${usuario} no fue encontrado` });
        }


        const passwordMatch = await UserSchema.matchPassword( contraseña, usuario.contraseña);

        if (!passwordMatch) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        }

        const encoder = new TextEncoder();
        const id = usuario._id.toString();

        const jwtConstructor = await new SignJWT({ id: id })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("3h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.data = {
            status: 200,
            message: "Usuario encontrado!! Toma tu token :D",
            token: jwtConstructor,
        };
        next();
    } catch (error) {
        // Manejo de errores aquí
        console.error("Error de conexión a la base de datos:", error);
        return res.status(500).send({ message: "Error interno del servidor" });
    }
};

const validarToken = async (req, token) => {
    try {
        const connection = new Connection();
        await connection.connect();
        const conexionDB = await connection.getDatabase();
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        let res = await conexionDB.collection("user").findOne({
            _id: new ObjectId(jwtData.payload.id),
            [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`,
        });

        let { _id, permisos, ...usuario } = res;
        return usuario;
    } catch (error) {
        return false;
    }
};
export { crearToken, validarToken };
