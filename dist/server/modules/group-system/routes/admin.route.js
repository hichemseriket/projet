"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const user_controller_1 = __importDefault(require("../../user-system/controllers/user.controller"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
class GroupAdminRoute {
    constructor() {
        this.router = express_1.default();
        this.route();
    }
    getRouter() {
        return this.router;
    }
    route() {
        this.router.post("/", (req, res) => {
            function tryCatch(err) {
                res.json({ logger: err });
            }
            const action = req.body.action;
            const token = req.headers.authorization;
            const name = req.body.name;
            const validate = req.body.validate;
            const suggest = req.body.suggest;
            const groupId = req.body.id;
            const administrate = req.body.administrate;
            if (token) {
                token_class_1.default.checkToken(token, action)
                    .catch((error) => { tryCatch(error); })
                    .then((idUser) => {
                    if (idUser) {
                        const id = idUser;
                        user_controller_1.default.getUser(id)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((group) => {
                            const item = req.body.item;
                            switch (action) {
                                case "getGroupsList":
                                    admin_controller_1.default.getGroupsList()
                                        .then((result) => {
                                        res.json({ success: true, groupList: result });
                                    });
                                    break;
                                case "updateGroup":
                                    admin_controller_1.default.updateGroup(groupId, validate, suggest, administrate, name)
                                        .then((result) => {
                                        res.json({ success: true, group: result });
                                    });
                                    break;
                                case "createGroup":
                                    admin_controller_1.default.createGroup(groupId, validate, suggest, administrate, name)
                                        .then((result) => {
                                        res.json({ success: true, newGroup: result });
                                    });
                                    break;
                                case "deleteGroup":
                                    admin_controller_1.default.deleteGroup(groupId, validate, suggest, administrate, name)
                                        .then((result) => {
                                        res.json({ success: true, deletedGroup: result });
                                    });
                                    break;
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.default = new GroupAdminRoute().getRouter();
//# sourceMappingURL=admin.route.js.map