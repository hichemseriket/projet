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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userGroup_entity_1 = require("../../../orm/entity/user-system/userGroup.entity");
const userInfo_entity_1 = require("../../../orm/entity/user-system/userInfo.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
class GroupClass {
    constructor(id, name, validate, suggest, administrate) {
        this.setName(name);
        this.setValidate(validate);
        this.setSuggest(suggest);
        this.setAdministrate(administrate);
        this.setId(id);
    }
    saveNewGroup() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const newGroup = yield userGroup_entity_1.UserGroupEntity.create();
                if (newGroup) {
                    newGroup.name = this.name;
                    newGroup.validate = this.validate;
                    newGroup.suggest = this.suggest;
                    newGroup.administrate = this.administrate;
                    yield newGroup.save();
                    resolve(newGroup);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("Can't create this group", "Impossible de créer le groupe");
                }
            }));
        });
    }
    saveInDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const groupRights = yield userGroup_entity_1.UserGroupEntity.findOne({ where: { name: this.name } });
                if (groupRights) {
                    groupRights.validate = this.validate;
                    groupRights.suggest = this.suggest;
                    groupRights.administrate = this.administrate;
                    yield groupRights.save();
                    resolve(groupRights);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                }
            }));
        });
    }
    deleteInfoGroup(groupId) {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                var e_1, _a;
                const users = yield userInfo_entity_1.UserInfoEntity.find({ relations: ["group"] });
                if (users) {
                    try {
                        for (var users_1 = __asyncValues(users), users_1_1; users_1_1 = yield users_1.next(), !users_1_1.done;) {
                            const user = users_1_1.value;
                            if (user.group.id === groupId) {
                                user.group.id = 1;
                                yield user.save();
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (users_1_1 && !users_1_1.done && (_a = users_1.return)) yield _a.call(users_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                }
            }));
            resolve(true);
        });
    }
    deleteGroup(groupName) {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const selectedGroup = yield userGroup_entity_1.UserGroupEntity.findOne({ where: { name: groupName } });
                if (selectedGroup) {
                    if (selectedGroup.id > 3) {
                        yield selectedGroup.remove();
                        resolve(true);
                    }
                    else {
                        throw new logger_manager_1.LoggerManager().warnLogger("You can't delete this group", "Vous ne pouvez pas supprimer ce groupe");
                    }
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                }
            }));
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const newGroup = yield this.setAttribute();
            if (newGroup) {
                return this;
            }
        });
    }
    deleteGroupFunction(groupId, groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            const done = yield this.deleteInfoGroup(groupId);
            if (done) {
                yield this.deleteGroup(groupName);
            }
        });
    }
    // public deleteGroup(groupName: string) {
    //     return new Promise((resolve) => {
    //         MariaDb.connectDb().then(async () => {
    //             const selectedGroup = await UserGroupEntity.findOne({where: {name: groupName}});
    //             if (selectedGroup) {
    //                 await selectedGroup.remove();
    //                 resolve(true);
    //             } else {
    //                 throw new LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
    //             }
    //         });
    //     });
    // }
    setAttribute() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => {
                userGroup_entity_1.UserGroupEntity.findOne({ where: { name: this.name } }).then((newGroup) => {
                    if (newGroup) {
                        newGroup.validate = this.validate;
                        newGroup.suggest = this.suggest;
                        newGroup.administrate = this.administrate;
                        resolve(newGroup);
                    }
                    else {
                        throw new logger_manager_1.LoggerManager().warnLogger("this group doesn't exists", "Le groupe demandé n'a pas été trouvé");
                    }
                });
            });
        });
    }
    setName(value) {
        this.name = value;
    }
    setId(value) {
        this.id = value;
    }
    setAdministrate(value) {
        this.administrate = value;
    }
    get Name() { return this.name; }
    get Id() { return this.id; }
    get Validate() { return this.validate; }
    setValidate(value) {
        this.validate = value;
    }
    get Suggest() { return this.suggest; }
    setSuggest(value) {
        this.suggest = value;
    }
}
exports.GroupClass = GroupClass;
//# sourceMappingURL=group.class.js.map