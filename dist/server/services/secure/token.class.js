"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = __importDefault(require("../../../config.json"));
const logger_manager_1 = require("../logger-manager/logger-manager");
/**
 * v 1.2.1
 */
class Token {
    constructor() {
        /**
         * List of token authorized to request the secure zone of server
         */
        this.list = [];
        /**
         * Defines the life time of a token in milliseconde
         */
        this.timeOut = config_json_1.default.token.timeoutSessionMinute * 60 * 100000; // Augmentation du temps de 1000 à 100000
        /**
         * secretKey static
         */
        this.secretKey = this.makeId();
    }
    /**
     * Check if Auth token is in the List
     * @param token: string - encoded token authentification
     * @param action: string - Name of request
     */
    checkToken(token, action) {
        return new Promise((resolve, reject) => {
            const secretId = jsonwebtoken_1.default.decode(token).key;
            const check = this.list.indexOf(secretId) >= 0;
            if (check) {
                jsonwebtoken_1.default.verify(token, secretId + "_" + this.secretKey, (err, decoded) => {
                    if (err) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("Invalid Token", `This "${action}" need a valid authorization.`));
                    }
                    else {
                        resolve(decoded.id);
                    }
                });
            }
            else {
                reject(new logger_manager_1.LoggerManager().warnLogger("Token expired", "Votre session à expiré. Veuillez vous reconnecter."));
            }
        });
    }
    /**
     * Generate and encode a token and return it.
     * @param idUser: number
     */
    generateToken(idUser) {
        return new Promise((resolve, reject) => {
            if (idUser !== undefined || true) {
                this.newKey().then((key) => {
                    // console.log(jwt.decode(token));
                    this.addKey(key);
                    resolve(jsonwebtoken_1.default.sign({ id: idUser, key }, key + "_" + this.secretKey, { expiresIn: this.timeOut }));
                });
            }
            else {
                reject(new logger_manager_1.LoggerManager().warnLogger("generateToken", "idUser undefined or null"));
            }
        });
    }
    /**
     * Delete the token in the list
     * @param token
     */
    delToken(token) {
        const key = jsonwebtoken_1.default.decode(token).key;
        const check = this.list.indexOf(key) >= 0;
        if (check) {
            this.list.splice(this.list.indexOf(key), 1);
        }
    }
    // PRIVATE ==========================================================================
    /**
     * Add the token in the List and delete it after the time outs.
     * @param key
     */
    addKey(key) {
        this.list.push(key);
        setTimeout(() => {
            this.list.splice(this.list.indexOf(key), 1);
        }, this.timeOut);
    }
    /**
     * Check if key already exist, and add to list
     */
    newKey() {
        return new Promise((resolve) => {
            const key = this.makeId();
            const check = this.list.indexOf(key) >= 0;
            if (check) {
                this.newKey();
            }
            else {
                resolve(key);
            }
        });
    }
    /**
     * Generate random key
     * @returns {string}
     */
    makeId() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.default = new Token();
//# sourceMappingURL=token.class.js.map