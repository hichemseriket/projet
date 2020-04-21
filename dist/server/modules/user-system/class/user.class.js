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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailValidator = __importStar(require("email-validator"));
const config_json_1 = __importDefault(require("../../../../config.json"));
const user_entity_1 = require("../../../orm/entity/user-system/user.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
class UserClass {
    constructor(id) {
        this.setId(id);
    }
    /**
     * return the crypted password on database
     */
    getPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                    const user = yield user_entity_1.UserEntity.findOne(this.id);
                    if (user === null || user === void 0 ? void 0 : user.password) {
                        resolve(user.password);
                    }
                }));
            });
        });
    }
    setPassword(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (value.length >= 25 && value.length <= 255) {
                    database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                        const user = yield user_entity_1.UserEntity.findOne(this.id);
                        if (user) {
                            user.password = value;
                            yield user.save();
                            resolve(true);
                        }
                    }));
                }
                else {
                    new logger_manager_1.LoggerManager().errorLogger("set password failed", "setPassword function(" + value + ") must be greater than or equal to 25 and less than or equal to 255");
                }
            });
        });
    }
    getKeytemp() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                    const user = yield user_entity_1.UserEntity.findOne(this.id);
                    if (user) {
                        resolve(user.tempKey);
                    }
                }));
            });
        });
    }
    /**
     * Set the keytemp on database durint x time in terms of "keyTempDelaySurvive" config
     * @param value [string]
     */
    setKeytemp(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (value.length >= 25 && value.length <= 255) {
                    database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                        const user = yield user_entity_1.UserEntity.findOne(this.id);
                        if (user) {
                            user.tempKey = value;
                            yield user.save();
                            this.removeKeytemp();
                            resolve(true);
                        }
                    }));
                }
                else {
                    new logger_manager_1.LoggerManager().errorLogger("set keyTemp failed", "setKeytemp function(" + value + ") must be greater than or equal to 25 and less than or equal to 255");
                }
            });
        });
    }
    /**
     * Create user with database.
     * @return this
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.setAttribute();
            if (user) {
                return this;
            }
        });
    }
    /**
     * Save user in database
     */
    saveInDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_entity_1.UserEntity.findOne(this.id);
                if (user) {
                    user.id = this.Id;
                    user.mail = this.Mail;
                    user.registerDate = this.RegisterDate;
                    user.role = this.Role;
                    user.activ = this.Activ;
                    yield user.save();
                    resolve(user);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this user doesn't exists", "L'utilisateur demandé n'a pas été trouvé");
                }
            }));
        });
    }
    deleteFromDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(this.id);
                const user = yield user_entity_1.UserEntity.findOne(this.id);
                if (user) {
                    yield user.remove();
                    resolve(user);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this user don't exist", "L'utilisateur demander n'a pas été trouver");
                }
            }));
        });
    }
    // ===================================================================================================
    // PRIVATE============================================================================================
    removeKeytemp() {
        setTimeout(() => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_entity_1.UserEntity.findOne(this.id);
                if (user === null || user === void 0 ? void 0 : user.tempKey) {
                    user.tempKey = null;
                    yield user.save();
                    console.log("keytemp removed");
                }
            }));
        }, config_json_1.default.user.keyTempDelaySurvive);
    }
    setAttribute() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => {
                user_entity_1.UserEntity.findOne(this.Id).then((user) => {
                    if (user) {
                        this.Mail = user.mail;
                        this.setRegisterDate(user.registerDate);
                        this.Role = user.role;
                        this.Activ = user.activ;
                        resolve(user);
                    }
                    else {
                        throw new logger_manager_1.LoggerManager().warnLogger("this user doesn't exists", "L'utilisateur demandé n'a pas été trouvé");
                    }
                });
            });
        });
    }
    setId(value) {
        if (value > 0) {
            this.id = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Id failed", "User.id(" + value + ") must be greater than zero");
        }
    }
    setRegisterDate(value) {
        this.registerDate = value;
    }
    // ===================================================================================================
    // GETTER & SETTER ===================================================================================
    set Role(value) {
        if (value >= 0 && value <= 2) {
            this.role = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Role failed", "User.role(" + value + ") must be greater than or equal to zero and less than or equal to 2");
        }
    }
    get Mail() { return this.mail; }
    set Mail(value) {
        if (EmailValidator.validate(value) && value.length >= 2 && value.length <= 80) {
            this.mail = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Mail failed", "User.mail(" + value + ") must be a valid e-mail and have between 2 and 80 character");
        }
    }
    get Activ() { return this.activ; }
    set Activ(value) {
        if (value >= 0 && value <= 2) {
            this.activ = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Activ failed", "User.activ(" + value + ") value must be 0, 1 or 2");
        }
    }
    get Id() { return this.id; }
    get RegisterDate() { return this.registerDate; }
}
exports.UserClass = UserClass;
//# sourceMappingURL=user.class.js.map