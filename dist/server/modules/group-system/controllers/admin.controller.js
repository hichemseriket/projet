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
const userGroup_entity_1 = require("../../../orm/entity/user-system/userGroup.entity");
const group_class_1 = require("../class/group.class");
class GroupController {
    getGroupsList() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const groupList = [];
            const groups = yield userGroup_entity_1.UserGroupEntity.find();
            try {
                for (var groups_1 = __asyncValues(groups), groups_1_1; groups_1_1 = yield groups_1.next(), !groups_1_1.done;) {
                    const group = groups_1_1.value;
                    const newGroup = new group_class_1.GroupClass(group.id, group.name, group.validate, group.suggest, group.administrate);
                    groupList.push(newGroup);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (groups_1_1 && !groups_1_1.done && (_a = groups_1.return)) yield _a.call(groups_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            resolve(groupList);
        }));
    }
    updateGroup(id, validate, suggest, administrate, choseName) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const Group = yield new group_class_1.GroupClass(id, choseName, validate, suggest, administrate).create();
            Group.saveInDatabase();
            resolve(Group);
        }));
    }
    createGroup(id, validate, suggest, administrate, name) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const NewGroup = yield new group_class_1.GroupClass(id, name, validate, suggest, administrate).saveNewGroup();
            resolve(NewGroup);
        }));
    }
    deleteGroup(id, validate, suggest, administrate, name) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield new group_class_1.GroupClass(id, name, validate, suggest, administrate).deleteGroupFunction(id, name);
            resolve(true);
        }));
    }
}
exports.default = new GroupController();
//# sourceMappingURL=admin.controller.js.map