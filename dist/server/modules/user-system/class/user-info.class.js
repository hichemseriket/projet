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
const user_entity_1 = require("../../../orm/entity/user-system/user.entity");
const userInfo_entity_1 = require("../../../orm/entity/user-system/userInfo.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const user_class_1 = require("./user.class");
class UserInfoClass extends user_class_1.UserClass {
    constructor(id) {
        super(id);
    }
    /**
     * Create user and userInfo with database.
     * @return this
     */
    createInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const done = yield this.create();
            if (done) {
                const doneInfo = yield this.setUserInfoAttribute();
                if (doneInfo) {
                    return this;
                }
            }
        });
    }
    /**
     * Save user and userInfo in database
     */
    saveInfoInDatabase() {
        return new Promise((resolve) => {
            this.saveInDatabase().then((user) => {
                if (user) {
                    database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                        const userInfo = yield userInfo_entity_1.UserInfoEntity.findOne({ user: user }, { relations: ["group"] });
                        if (userInfo) {
                            // userInfo.user = user as UserEntity;
                            userInfo.lastName = this.Name;
                            userInfo.firstName = this.FirstName;
                            userInfo.group.id = this.GroupId;
                            yield userInfo.save();
                            resolve(userInfo);
                        }
                        else {
                            throw new logger_manager_1.LoggerManager().warnLogger("this user doesn't exist", "L'utilisateur demandé n'a pas été trouver");
                        }
                    }));
                }
            });
        });
    }
    /**
     * Delete user and userInfo in database
     */
    deleteInfoInDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_entity_1.UserEntity.findOne(this.Id);
                userInfo_entity_1.UserInfoEntity.findOne({ user }).then((userInfo) => {
                    if (userInfo) {
                        userInfo.remove();
                        resolve(userInfo);
                    }
                    else {
                        throw new logger_manager_1.LoggerManager().warnLogger("this user doesn't exist", "L'utilisateur demandé n'a pas été trouver");
                    }
                });
            }));
        });
    }
    // ===================================================================================================
    // PRIVATE============================================================================================
    setUserInfoAttribute() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_entity_1.UserEntity.findOne(this.Id);
                userInfo_entity_1.UserInfoEntity.findOne({ user }, { relations: ["group"] }).then((userInfo) => {
                    if (userInfo) {
                        this.Name = userInfo.lastName;
                        this.FirstName = userInfo.firstName;
                        this.GroupId = userInfo.group.id;
                        this.Validate = userInfo.group.validate;
                    }
                    resolve(userInfo);
                });
            }));
        });
    }
    // ===================================================================================================
    // GETTER & SETTER ===================================================================================
    get Validate() { return this.validate; }
    set Validate(value) {
        this.validate = value;
    }
    get Name() { return this.name; }
    set Name(value) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.name = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "UserInfo.name(" + value + ") must have between 2 and 80 character");
        }
    }
    get FirstName() { return this.firstName; }
    set FirstName(value) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.firstName = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "UserInfo.firstName(" + value + ") must have between 2 and 80 character");
        }
    }
    get GroupId() { return this.groupId; }
    set GroupId(value) {
        if (value > 0) {
            this.groupId = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "UserInfo.groupUser(" + value + ") must be greater than zero");
        }
    }
}
exports.UserInfoClass = UserInfoClass;
//# sourceMappingURL=user-info.class.js.map