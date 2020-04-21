import Bcrypt from "bcrypt";
import * as ValidMail from "email-validator";
import {Logger} from "log4js";
import randomstring from "randomstring";
import {UserEntity} from "../../../orm/entity/user-system/user.entity";
import {UserGroupEntity} from "../../../orm/entity/user-system/userGroup.entity";
import {UserInfoEntity} from "../../../orm/entity/user-system/userInfo.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {IMailModel} from "../../../services/mailer/IMailModel";
import Mailer from "../../../services/mailer/mailer";
import Token from "../../../services/secure/token.class";
import {UserClass} from "../class/user.class";

class GuestController {

  /**
   * log in the user
   * @param mail: string
   * @param password: string
   */
  public login(mail: string, password: string) {
      return new Promise((resolve, reject) => {
          if (this.checkMail(mail)) {
              if (this.checkPassword(password)) {
                  this.isMailExist(mail)
                      .then( (user) => {
                          if (user) {
                              if (user.password !== null) {
                                  Bcrypt.compare(password, user.password)
                                      .then((passAccess) => {
                                          if (passAccess) {
                                              Token.generateToken(user.id)
                                                  .then((token) => {
                                                      resolve(token);
                                                  })
                                                  .catch(() => {
                                                    reject(new LoggerManager().warnLogger("undefined_UserId", "User id is undefined or null."));
                                                  });
                                          } else {
                                            reject(new LoggerManager().warnLogger("invalid_password", "Votre mot de passe est incorrect"));
                                          }
                                      })
                                      .catch((err) => {
                                        new LoggerManager().errorLogger("cryptage_failed", "Le cryptage du mot de passe a échoué.");
                                      });
                              } else {
                                reject(new LoggerManager().warnLogger("not_acces", "Vous n'avez pas accès"));
                              }
                          } else {
                              reject(new LoggerManager().warnLogger("user_not_found", "L'adresse e-mail n'éxiste pas dans notre répertoire"));
                          }
                      });
                  } else {
                      reject(new LoggerManager().warnLogger("Password empty", "Vous devez saisir un mot de passe"));
                  }
              } else {
                  reject(new LoggerManager().warnLogger("Invalid mail", "L'adresse e-mail n'est pas valide"));
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

    public register(mail: string, password: string, passwordConfirm: string, gcu: boolean) {
        return new Promise((resolve: (value?: any) => void, reject) => {
            // Mail checking
            if (this.checkMail(mail)) {
                this.isMailExist(mail)
                    .then((result) => {
                        // Checking if empty
                        if (result) {
                            reject(new LoggerManager().warnLogger("register > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                            // Checking if Gcu was accepted
                        } else if (!gcu) {
                            reject(new LoggerManager().warnLogger("register > isGcuAccepted", "Les conditions générales d'utilisation doivent etre acceptées"));
                            // Checking if password is valide
                        } else if (!this.validatePassword(password)) {
                            reject(new LoggerManager().warnLogger("register > isPasswordExist", "Le mot de passe ne respecte pas les restrictions"));
                            // Compare two password
                        } else if (!this.compareTwoPassword(password, passwordConfirm)) {
                            reject(new LoggerManager().warnLogger("register > passwordMatching", "Les deux mots de passe sont différents"));
                        } else {
                            // Crypt the password
                            this.passCrypted(password)
                                .then((resultCrypt: any) => {
                                    // Create a temporary key
                                    const tempKey = randomstring.generate(25);
                                    const content = [[mail], [resultCrypt], [tempKey]];
                                    // Insert into database
                                    MariaDb.connectDb().then(() => {
                                        const newUser = new UserEntity();
                                        newUser.mail = mail;
                                        newUser.password = resultCrypt;
                                        const newUserInfo = new UserInfoEntity();
                                        newUserInfo.user = newUser;
                                        const newGroup = new UserGroupEntity();
                                        newGroup.id = 1;
                                        newUserInfo.group = newGroup;
                                        newUser.save().then(async (res) => {
                                            await newUserInfo.save();
                                            resolve(true);
                                        });
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
  public initPassword(idUser: number, keyTemp: string, pass1: string, pass2: string) {
      return new Promise(async (resolve, reject) => {
             const User = await new UserClass(idUser).create();
             if (User) {
                 const previousPassword = await User.getPassword();
                 const dbKeytemp = await User.getKeytemp();

                 // Verify the request's keytemp with database's keytemp. Resolve true if match.
                 if (keyTemp !== dbKeytemp) {
                     reject(new LoggerManager().warnLogger("initPassword > keytemp don't match", "La clé ne correspond pas"));
                 // verify if password is valide
                 } else if (!this.validatePassword(pass1)) {
                     reject(new LoggerManager().warnLogger("initPassword > validatePassword", "Le mot de passe ne respecte pas les restrictions"));
                     // Compare two password
                 } else if (!this.compareTwoPassword(pass1, pass2)) {
                     reject(new LoggerManager().warnLogger("initPassword > compareTwoPassword", "Les deux mots de passe doivent être identique"));
                 } else {
                     // check if password is same of previous password
                     Bcrypt.compare(pass1, previousPassword)
                         .then(async (passAccess) => {
                             if (passAccess) {
                                 reject(new LoggerManager().warnLogger("initPassword > BcryptCompare", "Le nouveau mot de passe doit être différent de l'ancien"));
                             } else {
                                 // crypt the password
                                const newPassCrypted = await this.passCrypted(pass1);
                                 // Set new password to database
                                await User.setPassword(newPassCrypted);
                                resolve(true);
                             }
                         })
                         .catch((err) => {
                             new LoggerManager().errorLogger("password compare failed", "La comparaison du mot de passe a échoué");
                         });
                 }
             }
      });
  }

  public confirmMail(idUser: number, keyTemp: string, password: string, newMail: string) {
      return new Promise(async (resolve, reject) => {
          const User = await new UserClass(idUser).create();
          if (User) {
              const cryptedPassword = await User.getPassword();
              const dbKeytemp = await User.getKeytemp();
              const oldMail = User.Mail;
              // vérifier que le mail n'éxiste pas dans la database
              this.isMailExist(newMail).then((result) => {
                  if (result) {
                      reject(new LoggerManager().warnLogger("confirmMail > isMailExist", "L'adresse e-mail existe déjà dans notre répertoire"));
                      // vérifier que le keytemp correspond avec celui de la database
                  } else if (dbKeytemp !== keyTemp) {
                      reject(new LoggerManager().warnLogger("confirmMail > keytemp don't match", "La clé ne correspond pas"));
                      // vérifier si le mail est valide
                  } else if (!this.checkMail(newMail)) {
                      reject(new LoggerManager().warnLogger("confirmMail > mail invalide", "L'adresse e-mail renseignée n'est pas valide"));
                  } else {
                      // vérifier que le password correspond avec celui de la database
                      Bcrypt.compare(password, cryptedPassword)
                          .then(async (passAccess) => {
                              if (passAccess) {
                                  // changer l'adresse mail dans la database
                                  User.Mail = newMail;
                                  await User.saveInDatabase();
                                  resolve(true);

                                  // envoyer un message à l'ancien mail pour l'informer
                                  const mailModel: IMailModel = {
                                      to: oldMail,
                                      subject: "Changement d'adresse e-mail sur votre compte",
                                      model: "changeMailToOld",
                                      variable: {newMail}
                                  };
                                  Mailer.send(mailModel)
                                      .then((res) => {
                                          resolve(true);
                                      })
                                      .catch((error) => {
                                          reject(error);
                                      });
                              } else {
                                  reject(new LoggerManager().warnLogger("confirmMail > BcryptCompare", "Le mot de passe est incorrect"));
                              }
                          })
                          .catch((err) => {
                              new LoggerManager().errorLogger("password compare failed", "La comparaison du mot de passe a échoué");
                          });
                  }
              });

          }
      });
  }

    /**
     * Check is mail already exist in database. Return the result sql request or false.
     * Resolve user if exist
     * @param mail: string
     */
    public isMailExist(mail: string) {
        return new Promise((resolve: (value?: UserEntity) => void, reject) => {
            MariaDb.connectDb().then(async () => {
                UserEntity.findOne({mail})
                    .then((user) => {
                        if (user) {
                            resolve(user);
                        } else {
                            resolve();
                        }
                    });
            });
        });
    }

  // PRIVATE ==============================================================

    /**
     * return a crypted password
     * @param password [string] - uncrypted password
     */
    private passCrypted(password: string) {
        return new Promise ((resolve: (value: string) => void, reject) => {
            Bcrypt.hash(password, 10).then((res) => {
                if (res) {
                    resolve(res);
                } else {
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
    private compareTwoPassword(pass1: string, pass2: string) {
        return pass1 === pass2;
    }

    /**
     * Verify if the password is valide. Resolve true if validate
     * @param password: string
     */
    private validatePassword(password: string) {
        const regexp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\'\:\"\|\,\.\<\>\?]).{8,}$/;
        if (!password.match(regexp)) {
            return false;
        } else {
            return true;
        }
    }

  /**
   * Check if password is valid (not null, not undefined, not empty)
   * @param password: string
   */
  private checkPassword(password: string) {
      return (password !== "" || password !== undefined || true);
  }

    /**
     * Check if email is valid (not null, not undefined, not empty, mail is valid)
     * @param email: string
     */
    private checkMail(email: string) {
        return (email !== "" || email !== undefined || true || ValidMail.validate(email));
    }
}

export default new GuestController();
