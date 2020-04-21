import { configure, getLogger } from "log4js";
import config from "../../../config.json";
import {ILogger, TLogger} from "../../../core/logger-manager/Ilogger";

configure({
    appenders: {out: { type: "stdout" }, app: { type: "file", filename: config.loggerManager.logFilePatch }},
    categories: {default: { appenders: [ "out", "app" ], level: "trace" }
    }
});
const logger = getLogger();

/**
 * V 2.0.1
 */

export class LoggerManager {
    private logLevel: TLogger;
    private logCode: string;
    private logMsg: any | string;

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
    public traceLogger(title: string, message: string) {
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
    public debugLogger(title: string, message: string, fullDetail = false) {
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
    public infoLogger(title: string, message: string) {
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
    public warnLogger(title: string, message: any, fullDetail = false) {
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
    public errorLogger(title: string, message: any) {
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
    public FatalLogger(title: string, message: any) {
        this.logLevel = "fatal";
        this.buildLogger(title, message);
        this.printLogger(true);
        throw this.getLog();
    }

    /**
     * Return the logger object
     */
    public getLog(): ILogger {
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
    private buildLogger(title: string, message: any) {
        this.setLogCode(title);
        this.logMsg = message;
    }

    /**
     * Print a message error in console and return a object error
     * @param fullDetail: boolean - default = false. Show the detail error in console
     */
    private printLogger(fullDetail = false) {
        logger[this.logLevel](this.logCode + " " + this.logMsg);
        if (fullDetail) {
            console.error(new Error(this.logCode + " - " + this.logMsg));
        }
    }

    /**
     * Set the logger's code format
     * @param title: string
     */
    private setLogCode(title: string) {
        this.logCode = `-->[${title}]`;
    }
}
