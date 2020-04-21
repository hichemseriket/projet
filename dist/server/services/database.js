"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
const typeorm_1 = require("typeorm");
const logger_manager_1 = require("./logger-manager/logger-manager");
// TODO entités ici
class Mysql {
    constructor() {
        dotenv_1.default.config();
        this.dbOld = mysql_1.default.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        });
    }
    connectDb() {
        return new Promise((resolve) => {
            try {
                typeorm_1.getConnection();
                resolve(typeorm_1.getConnection());
            }
            catch (e) {
                typeorm_1.createConnection()
                    .then((connection) => {
                    if (connection.isConnected) {
                        resolve(connection);
                    }
                    else {
                        new logger_manager_1.LoggerManager().errorLogger("Database not connected", "Nous ne parvenons pas à nous connecter à la base de données");
                    }
                })
                    .catch((error) => {
                    new logger_manager_1.LoggerManager().FatalLogger("Database create connection failed", error);
                });
            }
        });
    }
}
exports.default = new Mysql();
//# sourceMappingURL=database.js.map