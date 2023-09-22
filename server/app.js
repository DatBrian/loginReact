/* eslint-disable no-undef */
import express from "express";
import routemap from "express-routemap";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
import Connection from "./db/Connection.js";
import resError from "./utils/ResError.js";
import SetupDb from "./db/SetupDb.js";
import { schemas } from "./models/schemas/index.js";
import ClientError from "./utils/ClientError.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd(), 'VITE');

class App extends Connection {
    constructor(routes) {
        super();
        this.app = express();
        this.port = Number(env.VITE_PORT_BACKEND) || 5093;
        this.initMiddlewares();
        this.initConnection();
        this.initRoutes(routes);
    }

    getServer() {
        return this.app;
    }

    closeServer(done) {
        this.server = this.app.listen(this.port, () => {
            done();
        });
    }

    async initConnection() {
        try {
            const connection = await this.connect();
            console.log(chalk.bgGreen.black("✔️  Conexión establecida 🔌 "));
            const setupDb = new SetupDb(this.getDatabase());
            const collections = schemas;
            await setupDb.setupCollections(collections);
            console.log(
                chalk.blue(
                    "---------------------------------------------------------------------------------"
                )
            );
            console.log(
                chalk.green.bold(
                    `🌐 ¡Se ha establecido la conexión a: ${env.VITE_DB_NAME}!`
                )
            );
            console.log(
                chalk.blue(
                    "---------------------------------------------------------------------------------"
                )
            );
            return connection;
        } catch (error) {
            console.error(
                chalk.bgRed.white("❌ Error al establecer la conexión:")
            );
            new ClientError("Error al establecer la conexión");
        }
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"));
        // eslint-disable-next-line no-unused-vars
        this.app.use((err, _req, res, _next) => {
            const { statusCode, message } = err;
            resError(res, statusCode, message);
        });
    }

    initRoutes(routes) {
        this.app.use(`/api/login`, new AuthRoutes().router);
        routes.forEach((route) => {
            this.app.use(`/api/${route.path}`, route.router);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log();
            console.log(chalk.bgCyan.white.bold("🗺️  Rutas disponibles: 🚴 "));
            routemap(this.app);
            console.log(chalk.bgGreen.black("✨ Servidor en línea ✨ "));
            console.log(
                chalk.blue(
                    "--------------------------------------------------------------------------------"
                )
            );
            console.log(
                chalk.green.bold(
                    `🚀 ¡El servidor se ha levantado exitosamente en http://${env.VITE_HOSTNAME}:${this.port}!`
                )
            );
            console.log(
                chalk.blue(
                    "--------------------------------------------------------------------------------"
                )
            );
        });
    }
}
export default App;