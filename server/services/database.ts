import dotenv from "dotenv";
import mysql from "mysql";
import {createConnection, getConnection} from "typeorm";
import {LoggerManager} from "./logger-manager/logger-manager";
// TODO entités ici

class Mysql {

    /**
     * Database
     */
    public dbOld;

    constructor() {
        dotenv.config();

        this.dbOld = mysql.createPool(
            {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PWD,
                database: process.env.DB_NAME
        });
    }

    public connectDb() {
        return new Promise((resolve) => {
            try {
                getConnection();
                resolve(getConnection());
            } catch (e) {
                createConnection()
                    .then((connection) => {
                        if (connection.isConnected) {
                            resolve(connection);
                        } else {
                            new LoggerManager().errorLogger("Database not connected", "Nous ne parvenons pas à nous connecter à la base de données");
                        }
                    })
                    .catch((error) => {
                        new LoggerManager().FatalLogger("Database create connection failed", error);
                    });
            }
        });
    }
}

export default new Mysql();
