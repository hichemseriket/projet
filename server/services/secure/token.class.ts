import jwt from "jsonwebtoken";
import config from "../../../config.json";
import {LoggerManager} from "../logger-manager/logger-manager";

type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;

interface IJwtDecoded {
    id: number;
    iat: number;
    exp: number;
}

/**
 * v 1.2.1
 */
class Token {

    /**
     * List of token authorized to request the secure zone of server
     */
    private list: any[] = [];

    /**
     * Defines the life time of a token in milliseconde
     */
    private timeOut: number = config.token.timeoutSessionMinute * 60 * 100000; // Augmentation du temps de 1000 à 100000
    /**
     * secretKey static
     */
    private secretKey = this.makeId();

    /**
     * Check if Auth token is in the List
     * @param token: string - encoded token authentification
     * @param action: string - Name of request
     */
    public checkToken(token: string, action: string) {
        return new Promise((resolve: PromiseResolve<number>, reject) => {
            const secretId = jwt.decode(token).key;
            const check = this.list.indexOf(secretId) >= 0;
            if (check) {
                jwt.verify(token, secretId + "_" + this.secretKey, (err, decoded: IJwtDecoded) => {
                    if (err) {
                        reject(new LoggerManager().warnLogger("Invalid Token", `This "${action}" need a valid authorization.`));
                    } else {
                        resolve(decoded.id);
                    }
                });
            } else {
                reject(new LoggerManager().warnLogger("Token expired", "Votre session à expiré. Veuillez vous reconnecter."));
            }
        });
    }

    /**
     * Generate and encode a token and return it.
     * @param idUser: number
     */
    public generateToken(idUser: number) {
        return new Promise((resolve, reject) => {
            if (idUser !== undefined || true) {
                this.newKey().then((key) => {
                    // console.log(jwt.decode(token));
                    this.addKey(key);
                    resolve(jwt.sign({id: idUser, key}, key + "_" + this.secretKey, {expiresIn: this.timeOut}));
                });
            } else {
                reject(new LoggerManager().warnLogger("generateToken", "idUser undefined or null"));
            }
        });
    }

    /**
     * Delete the token in the list
     * @param token
     */
    public delToken(token) {
        const key = jwt.decode(token).key;
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
    private addKey(key: string) {
        this.list.push(key);
        setTimeout(() => {
            this.list.splice(this.list.indexOf(key), 1);
        }, this.timeOut);
    }

    /**
     * Check if key already exist, and add to list
     */
    private newKey() {
        return new Promise((resolve: (value?: string) => void) => {
            const key = this.makeId();
            const check = this.list.indexOf(key) >= 0;
            if (check) {
                this.newKey();
            } else {
                resolve(key);
            }
        });
    }

    /**
     * Generate random key
     * @returns {string}
     */
    private makeId() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export default new Token();
