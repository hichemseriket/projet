"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
const config_json_1 = __importDefault(require("../../../config.json"));
log4js_1.configure({
    appenders: { out: { type: "stdout" }, app: { type: "file", filename: config_json_1.default.loggerManager.logFilePatch } },
    categories: { default: { appenders: ["out", "app"], level: "trace" }
    }
});
const logger = log4js_1.getLogger();
/**
 * V 2.0.1
 */
class LoggerManager {
    constructor() {
        this.logLevel = "info";
        this.logCode = "ERR_UNDEFINED";
        this.logMsg = "Undefined error message";
    }
    /**
     * Log and return a trace
     * ex: "niveau d’information ultrafin"
     * @param title: string
     * @param message: string
     */
    traceLogger(title, message) {
        this.logLevel = "trace";
        this.buildLogger(title, message);
        this.printLogger();
        return this.getLog();
    }
    /**
     * Log and return a debug
     * ex: "Affichage de valeur de données"
     * @param title: string
     * @param message: string
     * @param fullDetail: boolean - default = false - Show full error
     */
    debugLogger(title, message, fullDetail = false) {
        this.logLevel = "debug";
        this.buildLogger(title, message);
        this.printLogger(fullDetail);
        return this.getLog();
    }
    /**
     * Log and return an info
     * ex : "Chargement d'un fichier de configuration, début et fin d'exécution d'un traitement long"
     * @param title: string
     * @param message: string
     */
    infoLogger(title, message) {
        this.logLevel = "info";
        this.buildLogger(title, message);
        this.printLogger();
        return this.getLog();
    }
    /**Log and return a warning
     * ex: "Erreur de login, données invalides"
     * @param title: string
     * @param message: any
     * @param fullDetail: boolean - default = false - Show full error
     */
    warnLogger(title, message, fullDetail = false) {
        this.logLevel = "warn";
        this.buildLogger(title, message);
        this.printLogger(fullDetail);
        return this.getLog();
    }
    /**
     * Log and throw an error
     * ex: "Toutes les exceptions capturées qui n'empêchent pas l'application de fonctionner"
     * @param title: string
     * @param message: any
     */
    errorLogger(title, message) {
        this.logLevel = "error";
        this.buildLogger(title, message);
        this.printLogger(true);
        throw this.getLog();
    }
    /**
     * Log and throw a fatal error
     * ex: "Indisponibilité d'une base de données, toutes les exceptions qui empêchent l'application de fonctionner"
     * @param title
     * @param message
     * @constructor
     */
    FatalLogger(title, message) {
        this.logLevel = "fatal";
        this.buildLogger(title, message);
        this.printLogger(true);
        throw this.getLog();
    }
    /**
     * Return the logger object
     */
    getLog() {
        return {
            logLevel: this.logLevel,
            logCode: this.logCode,
            logMsg: this.logMsg
        };
    }
    // PRIVATE =======================================================================================
    /**
     * Return a builded error object.
     * @param title: string - Resume in 1 to 3 word
     * @param message: string - Describe the error.
     */
    buildLogger(title, message) {
        this.setLogCode(title);
        this.logMsg = message;
    }
    /**
     * Print a message error in console and return a object error
     * @param fullDetail: boolean - default = false. Show the detail error in console
     */
    printLogger(fullDetail = false) {
        logger[this.logLevel](this.logCode + " " + this.logMsg);
        if (fullDetail) {
            console.error(new Error(this.logCode + " - " + this.logMsg));
        }
    }
    /**
     * Set the logger's code format
     * @param title: string
     */
    setLogCode(title) {
        this.logCode = `-->[${title}]`;
    }
}
exports.LoggerManager = LoggerManager;
//# sourceMappingURL=logger-manager.js.map