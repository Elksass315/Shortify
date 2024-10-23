import { Sequelize } from "sequelize";
import winston from "winston";

export default async function () {
    const sequelize = new Sequelize(process.env.DB_URL,
        {
            logging: msg => winston.info(msg)
        }
    );

    try {
        await sequelize.authenticate();
        console.log(`Connection has been established successfully to ${process.env.DB_URL}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        winston.error(error.message, error);
        process.exit(1);
    }
}