import chalk from "chalk";
import ClientError from "../utils/ClientError.js";

class SetupDb {
    constructor(database) {
        this.db = database;
    }

    async setupCollections(entitiesA) {
        try {
            const entities = entitiesA;
            for (const EntityClass of entities) {
                const entity = await new EntityClass(await this.db);
                const collectionExist = await this.collectionExist(
                    entity.entity
                );

                if (!collectionExist) {
                    await entity.generateCollection();
                    await entity.createData();
                } else {
                    console.log();
                    console.log(
                        chalk.bgYellowBright(
                            `Colección ${entity.entity} omitida...`
                        )
                    );
                }
            }
            console.log();
            console.log(
                chalk.bgBlueBright(
                    chalk.black.bold(
                        "Colecciones actualizadas correctamente :D "
                    )
                )
            );
        } catch (error) {
            console.log(error);
            throw error.message;
        }
    }

    async collectionExist(collection) {
        try {
            const collections = await this.db.listCollections().toArray();
            return await collections.some((col) => col.name === collection);
        } catch (error) {
            new ClientError("Error al verificar las colecciones");
            throw error.message;
        }
    }
}

export default SetupDb;
