import Bcrypt from "bcrypt";
import randomstring from "randomstring";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {IMailModel} from "../../../services/mailer/IMailModel";
import Mailer from "../../../services/mailer/mailer";
import {UserInfoClass} from "../class/user-info.class";
import GuestController from "../controllers/guest.controller";

class UserController {

    /**
     * Get all data of user's id
     * @param id
     */
    public getUser(id: number) {
        return new Promise(async (resolve: (value: UserInfoClass) => void, reject) => {
            const User = await new UserInfoClass(id).createInfo() as UserInfoClass;
            if (User) {
                resolve(User);
            }
        });
    }

    /**
     * Update the user data (user parameter) in database
     * @param id [number] - id of user
     * @param item [TUserInfo] - "name" | "firstName"
     * @param value [string] - value of item will be updated
     */
    public updateUser(id: number, item: ItemType, value: string) {
        return new Promise(async (resolve) => {
            const User = await new UserInfoClass(id).createInfo();
            switch (item) {
                case "FirstName":
                    User!.FirstName = value;
                    break;
                case "Name":
                    User!.Name = value;
                    break;
                default:
                    new LoggerManager().errorLogger("updateUser > no item", "This function need a valid item type");
                    break;
            }
            User!.saveInfoInDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        });
    }

    /**
     * when user will change him password
     * @param idUser: number
     * @param currentPassword: string
     */
    public onWillUpdatePassword(idUser: number, currentPassword: string) {
        return new Promise(async (resolve, reject) => {
            const User = await new UserInfoClass(idUser).createInfo();
            if (User) {
                const cryptedPassword = await User.getPassword();
                // vérifier le mot de passe de l'utilisateur
                if (cryptedPassword) {
                    this.verifyPassword(currentPassword, cryptedPassword)
                        .catch((error) => { reject(error); })
                        .then(async (done) => {
                            if (done) {
                                // génèrer keytemp et insert dans la database
                                const keyTemp = randomstring.generate(25);
                                const keyTempSaved = await User.setKeytemp(keyTemp);
                                if (keyTempSaved) {
                                    // envoyer le mail
                                    this.sendMailToUser(User.Mail, keyTemp, idUser, "changePass")
                                        .catch((error) => { reject(error); })
                                        .then(() => {
                                            resolve({success: true});
                                        });
                                }
                            } else {
                                reject(new LoggerManager().warnLogger("password_incorrect", "Votre mot de passe est incorrect"));
                            }
                        });
                }
            }
        });
    }

    /**
     * when user will change him mail
     * @param idUser: number
     * @param newMail: string
     */
    public onWillUpdateMail(idUser: number, newMail: string) {
        return new Promise(async (resolve, reject) => {
            const User = await new UserInfoClass(idUser).createInfo();
            if (User) {
                // vérifier si le mail n'éxiste pas déjà
                GuestController.isMailExist(newMail).then(async (result) => {
                   if (result) {
                       reject(new LoggerManager().warnLogger("onWillUpdateMail > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                   } else {
                       // génèrer keytemp et insert dans la database
                       const keyTemp = randomstring.generate(25);
                       const keyTempSaved = await User.setKeytemp(keyTemp);
                       if (keyTempSaved) {
                           // envoyer un mail de confirmation au nouveau mail
                           this.sendMailToUser(newMail, keyTemp, idUser, "changeMail", newMail)
                               .catch((error) => { reject(error); })
                               .then(() => {
                                   resolve({success: true});
                               });
                       }
                   }
                });
            }
        });
    }

    // PRIVATE ========================================================

    /**
     * Compare an uncrypted password with a crypted password with Bcrypt. Resolve true or false.
     * @param uncryptedPassword [string]
     * @param cryptedPassword [string]
     */
    private verifyPassword(uncryptedPassword: string, cryptedPassword: string) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(uncryptedPassword, cryptedPassword)
                .catch((err) => {
                    reject(new LoggerManager().warnLogger("Compare_crypted_password", err));
                })
                .then((res) => {
                    if (res) {
                        resolve(true);
                    } else {
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
    private sendMailToUser(to: string, keyTemp: string, idUser: number, model: IMailModel["model"], newMail?: string) {
        return new Promise((resolve, reject) => {
            let subject = "Inscription au site lambda";
            if (model === "forgotPass") {subject = "Ré-initialisation du mot de passe"; }
            if (model === "changePass") {subject = "initialisation du mot de passe"; }
            const mailModel: IMailModel = {to, subject, model, variable: {keyTemp, idUser, newMail}};
            Mailer.send(mailModel)
                .then((res) => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default new UserController();
