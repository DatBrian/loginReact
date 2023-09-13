/* eslint-disable no-useless-catch */
import bcrypt from "bcryptjs";
import Connection from "../../db/Connection.js";
import chalk from "chalk";

class UserSchema {
    constructor(database) {
        this.database = database;
        this.entity = "user";
        this.Collection = database.collection(this.entity);
    }

    static registerProperties() {
        return {
            _id: {
                bsonType: "objectId",
            },
            user: {
                bsonType: "string",
            },
            contraseña: {
                bsonType: "string",
            },
        };
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId",
            },
            user: {
                bsonType: "string",
                description: "username is required",
            },
            contraseña: {
                bsonType: "string",
                description: "Password is required",
            },
            rol: {
                bsonType: "array",
                description: "role",
                items: {
                    bsonType: "int",
                },
            },
            permisos: {
                bsonType: "object",
                description: "Ingrese los permisos",
                properties: {
                    "/user": {
                        bsonType: "array",
                        items: {
                            bsonType: "string",
                            description: "Ingrese la version autorizada",
                        },
                    },
                },
            },
        };
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        additionalProperties: false,
                        required: ["user", "contraseña", "rol"],
                        properties: {
                            _id: {
                                bsonType: "objectId",
                            },
                            user: {
                                bsonType: "string",
                                description: "username is required",
                            },
                            contraseña: {
                                bsonType: "string",
                                description: "Password is required",
                            },
                            rol: {
                                bsonType: "array",
                                description: "role",
                                items: {
                                    bsonType: "string",
                                },
                            },
                            permisos: {
                                bsonType: "object",
                                description: "Ingrese los permisos",
                                properties: {
                                    "/route": {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "string",
                                            description:
                                                "Ingrese la version autorizada",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    static async matchPassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }

    static async findUser(username) {
        const connection = new Connection();
        try {
            await connection.connect();
            const exist = await connection
                .getDatabase()
                .collection("user")
                .findOne({ user: username });
            return exist ? true : false;
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
    }

    static async createUser(user) {
        const connection = new Connection();
        try {
            await connection.connect();
            const encryptedPassword = await this.encryptPassword(
                user.contraseña
            );
            const newUser = {
                user: user.user,
                contraseña: encryptedPassword,
                rol: user.rol,
                permisos: user.permisos,
            };
            await connection
                .getDatabase()
                .collection("user")
                .insertOne(newUser);
            const response = {
                status: 200,
                message: "Usuario registrado correctamente",
                user: newUser,
            };
            return response;
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
    }

    async createData() {
        console.log();
        console.log(
            chalk.bgYellowBright.black(
                `No hay datos para la colección ${this.entity}`
            )
        );
    }
}
export default UserSchema;
