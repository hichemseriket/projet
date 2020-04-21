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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const randomstring_1 = __importDefault(require("randomstring"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const mailer_1 = __importDefault(require("../../../services/mailer/mailer"));
const user_info_class_1 = require("../class/user-info.class");
const guest_controller_1 = __importDefault(require("../controllers/guest.controller"));
class UserController {
    /**
     * Get all data of user's id
     * @param id
     */
    getUser(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_info_class_1.UserInfoClass(id).createInfo();
            if (User) {
                resolve(User);
            }
        }));
    }
    /**
     * Update the user data (user parameter) in database
     * @param id [number] - id of user
     * @param item [TUserInfo] - "name" | "firstName"
     * @param value [string] - value of item will be updated
     */
    updateUser(id, item, value) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_info_class_1.UserInfoClass(id).createInfo();
            switch (item) {
                case "FirstName":
                    User.FirstName = value;
                    break;
                case "Name":
                    User.Name = value;
                    break;
                default:
                    new logger_manager_1.LoggerManager().errorLogger("updateUser > no item", "This function need a valid item type");
                    break;
            }
            User.saveInfoInDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        }));
    }
    /**
     * when user will change him password
     * @param idUser: number
     * @param currentPassword: string
     */
    onWillUpdatePassword(idUser, currentPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_info_class_1.UserInfoClass(idUser).createInfo();
            if (User) {
                const cryptedPassword = yield User.getPassword();
                // vérifier le mot de passe de l'utilisateur
                if (cryptedPassword) {
                    this.verifyPassword(currentPassword, cryptedPassword)
                        .catch((error) => { reject(error); })
                        .then((done) => __awaiter(this, void 0, void 0, function* () {
                        if (done) {
                            // génèrer keytemp et insert dans la database
                            const keyTemp = randomstring_1.default.generate(25);
                            const keyTempSaved = yield User.setKeytemp(keyTemp);
                            if (keyTempSaved) {
                                // envoyer le mail
                                this.sendMailToUser(User.Mail, keyTemp, idUser, "changePass")
                                    .catch((error) => { reject(error); })
                                    .then(() => {
                                    resolve({ success: true });
                                });
                            }
                        }
                        else {
                            reject(new logger_manager_1.LoggerManager().warnLogger("password_incorrect", "Votre mot de passe est incorrect"));
                        }
                    }));
                }
            }
        }));
    }
    /**
     * when user will change him mail
     * @param idUser: number
     * @param newMail: string
     */
    onWillUpdateMail(idUser, newMail) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_info_class_1.UserInfoClass(idUser).createInfo();
            if (User) {
                // vérifier si le mail n'éxiste pas déjà
                guest_controller_1.default.isMailExist(newMail).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("onWillUpdateMail > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                    }
                    else {
                        // génèrer keytemp et insert dans la database
                        const keyTemp = randomstring_1.default.generate(25);
                        const keyTempSaved = yield User.setKeytemp(keyTemp);
                        if (keyTempSaved) {
                            // envoyer un mail de confirmation au nouveau mail
                            this.sendMailToUser(newMail, keyTemp, idUser, "changeMail", newMail)
                                .catch((error) => { reject(error); })
                                .then(() => {
                                resolve({ success: true });
                            });
                        }
                    }
                }));
            }
        }));
    }
    // PRIVATE ========================================================
    /**
     * Compare an uncrypted password with a crypted password with Bcrypt. Resolve true or false.
     * @param uncryptedPassword [string]
     * @param cryptedPassword [string]
     */
    verifyPassword(uncryptedPassword, cryptedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(uncryptedPassword, cryptedPassword)
                .catch((err) => {
                reject(new logger_manager_1.LoggerManager().warnLogger("Compare_crypted_password", err));
            })
                .then((res) => {
                if (res) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    /**
     * Send a mail to user
     * @param to [string] - email of user
     * @param keyTemp [string] - temporary key
     * @param idUser [number] - id of user
     * @param model [string] - "test" | "changeMail" | "changeMailToOld" | "contactMail" | "changePass" | "forgotPseudo" | "initPass"
     */
    sendMailToUser(to, keyTemp, idUser, model, newMail) {
        return new Promise((resolve, reject) => {
            let subject = "Inscription au site lambda";
            if (model === "forgotPass") {
                subject = "Ré-initialisation du mot de passe";
            }
            if (model === "changePass") {
                subject = "initialisation du mot de passe";
            }
            const mailModel = { to, subject, model, variable: { keyTemp, idUser, newMail } };
            mailer_1.default.send(mailModel)
                .then((res) => {
                resolve(true);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map