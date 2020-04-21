"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRoute {
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
                token_class_1.default.checkToken(token, action)
                    .catch((error) => { tryCatch(error); })
                    .then((idUser) => {
                    if (idUser) {
                        const id = idUser;
                        user_controller_1.default.getUser(id)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((user) => {
                            const itemName = req.body.itemName;
                            const userById = req.body.userById;
                            let itemValue = req.body.itemValue;
                            let currentPassword = req.body.currentPassword;
                            let newMail = req.body.newMail;
                            switch (action) {
                                case "getUser":
                                    res.json({ success: true, user });
                                    break;
                                case "getUserById":
                                    user_controller_1.default.getUser(userById)
                                        .catch((error) => {
                                        tryCatch(error);
                                    })
                                        .then((userResult) => {
                                        res.json({ success: true, user: userResult });
                                    });
                                    break;
                                case "clearUser":
                                    token_class_1.default.delToken(token);
                                    res.json({ success: true });
                                    break;
                                case "updatePassword":
                                    currentPassword = currentPassword.trim();
                                    user_controller_1.default.onWillUpdatePassword(id, currentPassword)
                                        .catch((error) => {
                                        tryCatch(error);
                                    })
                                        .then((updatedUser) => {
                                        res.json({ success: true });
                                    });
                                    break;
                                case "updateMail":
                                    newMail = newMail.trim();
                                    user_controller_1.default.onWillUpdateMail(id, newMail)
                                        .catch((error) => {
                                        tryCatch(error);
                                    })
                                        .then((updatedUser) => {
                                        res.json({ success: true });
                                    });
                                    break;
                                case "updateUser":
                                    itemValue = itemValue.trim();
                                    user_controller_1.default.updateUser(id, itemName, itemValue)
                                        .catch((error) => {
                                        tryCatch(error);
                                    })
                                        .then((updatedUser) => {
                                        res.json({ success: true, user: updatedUser });
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
exports.default = new UserRoute().getRouter();
//# sourceMappingURL=user.route.js.map