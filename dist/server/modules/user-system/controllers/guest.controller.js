"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const ValidMail = __importStar(require("email-validator"));
const randomstring_1 = __importDefault(require("randomstring"));
const user_entity_1 = require("../../../orm/entity/user-system/user.entity");
const userGroup_entity_1 = require("../../../orm/entity/user-system/userGroup.entity");
const userInfo_entity_1 = require("../../../orm/entity/user-system/userInfo.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const mailer_1 = __importDefault(require("../../../services/mailer/mailer"));
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const user_class_1 = require("../class/user.class");
class GuestController {
    /**
     * log in the user
     * @param mail: string
     * @param password: string
     */
    login(mail, password) {
        return new Promise((resolve, reject) => {
            if (this.checkMail(mail)) {
                if (this.checkPassword(password)) {
                    this.isMailExist(mail)
                        .then((user) => {
                        if (user) {
                            if (user.password !== null) {
                                bcrypt_1.default.compare(password, user.password)
                                    .then((passAccess) => {
                                    if (passAccess) {
                                        token_class_1.default.generateToken(user.id)
                                            .then((token) => {
                                            resolve(token);
                                        })
                                            .catch(() => {
                                            reject(new logger_manager_1.LoggerManager().warnLogger("undefined_UserId", "User id is undefined or null."));
                                        });
                                    }
                                    else {
                                        reject(new logger_manager_1.LoggerManager().warnLogger("invalid_password", "Votre mot de passe est incorrect"));
                                    }
                                })
                                    .catch((err) => {
                                    new logger_manager_1.LoggerManager().errorLogger("cryptage_failed", "Le cryptage du mot de passe a échoué.");
                                });
                            }
                            else {
                                reject(new logger_manager_1.LoggerManager().warnLogger("not_acces", "Vous n'avez pas accès"));
                            }
                        }
                        else {
                            reject(new logger_manager_1.LoggerManager().warnLogger("user_not_found", "L'adresse e-mail n'éxiste pas dans notre répertoire"));
                        }
                    });
                }
                else {
                    reject(new logger_manager_1.LoggerManager().warnLogger("Password empty", "Vous devez saisir un mot de passe"));
                }
            }
            else {
                reject(new logger_manager_1.LoggerManager().warnLogger("Invalid mail", "L'adresse e-mail n'est pas valide"));
            }
        });
    }
    /**
     * Add a new user
     * @param mail: string
     * @param password: string
     * @param passwordConfirm: string
     * @param gcu: boolean
     */
    register(mail, password, passwordConfirm, gcu) {
        return new Promise((resolve, reject) => {
            // Mail checking
            if (this.checkMail(mail)) {
                this.isMailExist(mail)
                    .then((result) => {
                    // Checking if empty
                    if (result) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("register > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                        // Checking if Gcu was accepted
                    }
                    else if (!gcu) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("register > isGcuAccepted", "Les conditions générales d'utilisation doivent etre acceptées"));
                        // Checking if password is valide
                    }
                    else if (!this.validatePassword(password)) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("register > isPasswordExist", "Le mot de passe ne respecte pas les restrictions"));
                        // Compare two password
                    }
                    else if (!this.compareTwoPassword(password, passwordConfirm)) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("register > passwordMatching", "Les deux mots de passe sont différents"));
                    }
                    else {
                        // Crypt the password
                        this.passCrypted(password)
                            .then((resultCrypt) => {
                            // Create a temporary key
                            const tempKey = randomstring_1.default.generate(25);
                            const content = [[mail], [resultCrypt], [tempKey]];
                            // Insert into database
                            database_1.default.connectDb().then(() => {
                                const newUser = new user_entity_1.UserEntity();
                                newUser.mail = mail;
                                newUser.password = resultCrypt;
                                const newUserInfo = new userInfo_entity_1.UserInfoEntity();
                                newUserInfo.user = newUser;
                                const newGroup = new userGroup_entity_1.UserGroupEntity();
                                newGroup.id = 1;
                                newUserInfo.group = newGroup;
                                newUser.save().then((res) => __awaiter(this, void 0, void 0, function* () {
                                    yield newUserInfo.save();
                                    resolve(true);
                                }));
                            });
                            /*else {
                            // Insert user ID
                            Mysql.db.query("INSERT INTO users_info SET id_user = ?", [res.insertId], (errorInsUsersInfo, resInsUsersInfo) => {
                                if (errorInsUsersInfo) {
                                    new LoggerManager().errorLogger("register > insert user ID", errorInsUsersInfo);
                                } else {
                                    resolve(true);
                                }
                            });
                        }*/
                        });
                    }
                });
            }
        });
    }
    /**
     * initialize a new password
     * @param idUser: number
     * @param keyTemp: string
     * @param pass1: string
     * @param pass2: string
     */
    initPassword(idUser, keyTemp, pass1, pass2) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_class_1.UserClass(idUser).create();
            if (User) {
                const previousPassword = yield User.getPassword();
                const dbKeytemp = yield User.getKeytemp();
                // Verify the request's keytemp with database's keytemp. Resolve true if match.
                if (keyTemp !== dbKeytemp) {
                    reject(new logger_manager_1.LoggerManager().warnLogger("initPassword > keytemp don't match", "La clé ne correspond pas"));
                    // verify if password is valide
                }
                else if (!this.validatePassword(pass1)) {
                    reject(new logger_manager_1.LoggerManager().warnLogger("initPassword > validatePassword", "Le mot de passe ne respecte pas les restrictions"));
                    // Compare two password
                }
                else if (!this.compareTwoPassword(pass1, pass2)) {
                    reject(new logger_manager_1.LoggerManager().warnLogger("initPassword > compareTwoPassword", "Les deux mots de passe doivent être identique"));
                }
                else {
                    // check if password is same of previous password
                    bcrypt_1.default.compare(pass1, previousPassword)
                        .then((passAccess) => __awaiter(this, void 0, void 0, function* () {
                        if (passAccess) {
                            reject(new logger_manager_1.LoggerManager().warnLogger("initPassword > BcryptCompare", "Le nouveau mot de passe doit être différent de l'ancien"));
                        }
                        else {
                            // crypt the password
                            const newPassCrypted = yield this.passCrypted(pass1);
                            // Set new password to database
                            yield User.setPassword(newPassCrypted);
                            resolve(true);
                        }
                    }))
                        .catch((err) => {
                        new logger_manager_1.LoggerManager().errorLogger("password compare failed", "La comparaison du mot de passe a échoué");
                    });
                }
            }
        }));
    }
    confirmMail(idUser, keyTemp, password, newMail) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_class_1.UserClass(idUser).create();
            if (User) {
                const cryptedPassword = yield User.getPassword();
                const dbKeytemp = yield User.getKeytemp();
                const oldMail = User.Mail;
                // vérifier que le mail n'éxiste pas dans la database
                this.isMailExist(newMail).then((result) => {
                    if (result) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("confirmMail > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                        // vérifier que le keytemp correspond avec celui de la database
                    }
                    else if (dbKeytemp !== keyTemp) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("confirmMail > keytemp don't match", "La clé ne correspond pas"));
                        // vérifier si le mail est valide
                    }
                    else if (!this.checkMail(newMail)) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("confirmMail > mail invalide", "L'adresse e-mail renseignée n'est pas valide"));
                    }
                    else {
                        // vérifier que le password correspond avec celui de la database
                        bcrypt_1.default.compare(password, cryptedPassword)
                            .then((passAccess) => __awaiter(this, void 0, void 0, function* () {
                            if (passAccess) {
                                // changer l'adresse mail dans la database
                                User.Mail = newMail;
                                yield User.saveInDatabase();
                                resolve(true);
                                // envoyer un message à l'ancien mail pour l'informer
                                const mailModel = {
                                    to: oldMail,
                                    subject: "Changement d'adresse e-mail sur votre compte",
                                    model: "changeMailToOld",
                                    variable: { newMail }
                                };
                                mailer_1.default.send(mailModel)
                                    .then((res) => {
                                    resolve(true);
                                })
                                    .catch((error) => {
                                    reject(error);
                                });
                            }
                            else {
                                reject(new logger_manager_1.LoggerManager().warnLogger("confirmMail > BcryptCompare", "Le mot de passe est incorrect"));
                            }
                        }))
                            .catch((err) => {
                            new logger_manager_1.LoggerManager().errorLogger("password compare failed", "La comparaison du mot de passe a échoué");
                        });
                    }
                });
            }
        }));
    }
    /**
     * Check is mail already exist in database. Return the result sql request or false.
     * Resolve user if exist
     * @param mail: string
     */
    isMailExist(mail) {
        return new Promise((resolve, reject) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                user_entity_1.UserEntity.findOne({ mail })
                    .then((user) => {
                    if (user) {
                        resolve(user);
                    }
                    else {
                        resolve();
                    }
                });
            }));
        });
    }
    // PRIVATE ==============================================================
    /**
     * return a crypted password
     * @param password [string] - uncrypted password
     */
    passCrypted(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, 10).then((res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    reject("erreur");
                }
            });
        });
    }
    /**
     * Compare two password is identicate. Resolve true if identicate
     * @param pass1: string
     * @param pass2: string
     */
    compareTwoPassword(pass1, pass2) {
        return pass1 === pass2;
    }
    /**
     * Verify if the password is valide. Resolve true if validate
     * @param password: string
     */
    validatePassword(password) {
        const regexp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\'\:\"\|\,\.\<\>\?]).{8,}$/;
        if (!password.match(regexp)) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Check if password is valid (not null, not undefined, not empty)
     * @param password: string
     */
    checkPassword(password) {
        return (password !== "" || password !== undefined || true);
    }
    /**
     * Check if email is valid (not null, not undefined, not empty, mail is valid)
     * @param email: string
     */
    checkMail(email) {
        return (email !== "" || email !== undefined || true || ValidMail.validate(email));
    }
}
exports.default = new GuestController();
//# sourceMappingURL=guest.controller.js.map