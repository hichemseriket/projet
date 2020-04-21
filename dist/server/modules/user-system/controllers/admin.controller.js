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
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../../orm/entity/user-system/user.entity");
const user_info_class_1 = require("../class/user-info.class");
const user_class_1 = require("../class/user.class");
class AdminController {
    getUsersList() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const userList = [];
            const users = yield user_entity_1.UserEntity.find();
            try {
                for (var users_1 = __asyncValues(users), users_1_1; users_1_1 = yield users_1.next(), !users_1_1.done;) {
                    const user = users_1_1.value;
                    const newUser = new user_info_class_1.UserInfoClass(user.id);
                    yield newUser.createInfo();
                    if (newUser) {
                        userList.push(newUser);
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
            resolve(userList);
        }));
    }
    /**
     * Update the user data (admin parameter) in database
     * @param id [number] - id of user
     * @param item [TUserInfo] - "groupId" | "role" | "activ"
     * @param value [number] - value of item will be updated
     */
    updateUser(id, item, value) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const User = yield new user_info_class_1.UserInfoClass(id).createInfo();
            switch (item) {
                case "activ":
                    User.Activ = value;
                    break;
                case "groupId":
                    User.GroupId = value;
                    break;
                case "role":
                    User.Role = value;
                    break;
            }
            User.saveInfoInDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        }));
    }
    deleteUser(id, item, value) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const UserInfo = yield new user_info_class_1.UserInfoClass(id).createInfo();
            UserInfo.deleteInfoInDatabase().then((done) => {
                if (done) {
                    resolve(UserInfo);
                }
            });
            const User = yield new user_class_1.UserClass(id).create();
            User.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        }));
    }
}
exports.default = new AdminController();
//# sourceMappingURL=admin.controller.js.map