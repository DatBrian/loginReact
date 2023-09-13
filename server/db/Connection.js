import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

class Connection {
    constructor() {
        this.client = new MongoClient(this.getUri());
    }

    getUri() {
        return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_IDENTIFIER}.mongodb.net/?retryWrites=true&w=majority`;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME);
        } catch (error) {
            console.error("Error al conectar con la base de datos:", error);
            throw error;
        }
    }

    getDatabase() {
        if (!this.db) {
            throw new Error("No hay una conexión establecida.");
        }
        return this.db;
    }

    async close() {
        try {
            await this.client.db().command({ ping: 1 });
            await this.client.close();
        } catch (error) {
            console.error("Error al cerrar la conexión:", error);
        }
    }
}
export default Connection;