import * as EmailValidator from "email-validator";
import config from "../../../../config.json";
import {UserEntity} from "../../../orm/entity/user-system/user.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";

export class UserClass {

    private id!: number;
    private mail!: string;
    private registerDate!: Date;
    private role!: number;
    private activ!: number;

    constructor(id: number ) {
            this.setId(id);
    }

    /**
     * return the crypted password on database
     */
    public async getPassword() {
        return new Promise((resolve: (value: string) => void) => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.id);
                if (user?.password) {
                    resolve(user.password);
                }
            });
        });
    }

    public async setPassword(value: string) {
        return new Promise((resolve) => {
            if (value.length >= 25 && value.length <= 255) {
                MariaDb.connectDb().then(async () => {
                    const user = await UserEntity.findOne(this.id);
                    if (user) {
                        user.password = value;
                        await user.save();
                        resolve(true);
                    }
                });
            } else {
                new LoggerManager().errorLogger("set password failed", "setPassword function(" + value + ") must be greater than or equal to 25 and less than or equal to 255");
            }
        });
    }

    public async getKeytemp() {
        return new Promise((resolve: (value: string | null) => void) => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.id);
                if (user) {
                    resolve(user.tempKey);
                }
            });
        });
    }

    /**
     * Set the keytemp on database durint x time in terms of "keyTempDelaySurvive" config
     * @param value [string]
     */
    public async setKeytemp(value: string) {
        return new Promise((resolve) => {
            if (value.length >= 25 && value.length <= 255) {
                MariaDb.connectDb().then(async () => {
                    const user = await UserEntity.findOne(this.id);
                    if (user) {
                        user.tempKey = value;
                        await user.save();
                        this.removeKeytemp();
                        resolve(true);
                    }
                });
            } else {
                new LoggerManager().errorLogger("set keyTemp failed", "setKeytemp function(" + value + ") must be greater than or equal to 25 and less than or equal to 255");
            }
        });
    }

    /**
     * Create user with database.
     * @return this
     */
    public async create() {
        const user = await this.setAttribute();
        if (user) { return this; }
    }

    /**
     * Save user in database
     */
    public saveInDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.id);
                if (user) {
                    user.id = this.Id;
                    user.mail = this.Mail;
                    user.registerDate = this.RegisterDate;
                    user.role = this.Role;
                    user.activ = this.Activ;
                    await user.save();
                    resolve(user);
                } else {
                    throw new LoggerManager().warnLogger("this user doesn't exists", "L'utilisateur demandé n'a pas été trouvé");
                }
            });
        });
    }

    public deleteFromDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                console.log(this.id);
                const user = await UserEntity.findOne(this.id);
                if (user) {
                    await user.remove();
                    resolve(user);
                } else {
                    throw new LoggerManager().warnLogger("this user don't exist", "L'utilisateur demander n'a pas été trouver");
                }
            });
        });
    }

    // ===================================================================================================
    // PRIVATE============================================================================================

    private removeKeytemp() {
        setTimeout(() => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.id);
                if (user?.tempKey) {
                    user.tempKey = null;
                    await user.save();
                    console.log("keytemp removed");
                }
            });
        }, config.user.keyTempDelaySurvive);
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                UserEntity.findOne(this.Id).then((user) => {
                    if (user) {
                        this.Mail = user.mail;
                        this.setRegisterDate(user.registerDate);
                        this.Role = user.role;
                        this.Activ = user.activ;
                        resolve(user);
                    } else {
                        throw new LoggerManager().warnLogger("this user doesn't exists", "L'utilisateur demandé n'a pas été trouvé");
                    }
                });
            });
        });
    }
    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            new LoggerManager().errorLogger("set Id failed", "User.id(" + value + ") must be greater than zero");
        }
    }
    private setRegisterDate(value: Date) {
        this.registerDate = value;
    }

    // ===================================================================================================
    // GETTER & SETTER ===================================================================================

    set Role(value: number) {
        if ( value >= 0 && value <= 2) {
            this.role = value;
        } else {
            new LoggerManager().errorLogger("set Role failed", "User.role(" + value + ") must be greater than or equal to zero and less than or equal to 2");
        }
    }

    get Mail(): string { return this.mail; }
    set Mail(value: string) {
        if (EmailValidator.validate(value) && value.length >= 2 && value.length <= 80) {
            this.mail = value;
        } else {
            new LoggerManager().errorLogger("set Mail failed", "User.mail(" + value + ") must be a valid e-mail and have between 2 and 80 character");
        }
    }

    get Activ(): number { return this.activ; }
    set Activ(value: number) {
        if (value >= 0 && value <= 2) {
            this.activ = value;
        } else {
            new LoggerManager().errorLogger("set Activ failed", "User.activ(" + value + ") value must be 0, 1 or 2");
        }
    }

    get Id(): number { return this.id; }

    get RegisterDate(): Date { return this.registerDate; }
}
