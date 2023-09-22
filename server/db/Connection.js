import { MongoClient } from "mongodb";
import { loadEnv } from "vite";
const env = loadEnv("development", process.cwd(), 'DB');

class Connection {
    constructor() {
        this.client = new MongoClient(this.getUri());
    }

    getUri() {
        return `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.${env.DB_IDENTIFIER}.mongodb.net/?retryWrites=true&w=majority`;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(env.DB_NAME);
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