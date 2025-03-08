import { Sequelize } from "sequelize";
import { createLogger } from "../misc/utils";
const logger = createLogger("sequelize")
const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: true
}) 

async function connect(){
    try {
        await db.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

export {
    db,
    Sequelize
}