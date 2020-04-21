"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class AdminRoute {
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
            if (token) {
                token_class_1.default.checkToken(token, action) // Check if token session exist and not expired
                    .catch((error) => { tryCatch(error); })
                    .then((idUser) => {
                    if (idUser) {
                        const id = idUser;
                        user_controller_1.default.getUser(id) // Check if user exists
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((user) => {
                            const User = user;
                            // TODO ajouter un système vérifiant le groupe
                            if (User) { // Check if user is an authenticated administrator
                                const item = req.body.item;
                                const value = req.body.value;
                                const idOtherUser = req.body.idOtherUser;
                                switch (action) {
                                    case "getUsersList":
                                        admin_controller_1.default.getUsersList()
                                            .then((result) => {
                                            res.json({ success: true, usersList: result });
                                        });
                                        break;
                                    case "updateUser":
                                        admin_controller_1.default.updateUser(idOtherUser, item, value)
                                            .catch((error) => {
                                            tryCatch(error);
                                        })
                                            .then((updatedUser) => {
                                            res.json({ success: true, user: updatedUser });
                                        });
                                        break;
                                    case "deleteUser":
                                        admin_controller_1.default.deleteUser(idOtherUser, item, value)
                                            .catch((error) => {
                                            tryCatch(error);
                                        })
                                            .then((deletedUser) => {
                                            res.json({ success: true, user: deletedUser });
                                        });
                                        break;
                                }
                            }
                            else {
                                tryCatch(new logger_manager_1.LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.default = new AdminRoute().getRouter();
//# sourceMappingURL=admin.route.js.map