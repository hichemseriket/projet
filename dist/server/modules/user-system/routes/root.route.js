"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const root_controller_1 = __importDefault(require("../controllers/root.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class RootRoute {
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
                            if (User.Validate) { // Check if user is an authenticated root
                                switch (action) {
                                    case "test":
                                        root_controller_1.default.TestController()
                                            .then((result) => {
                                            res.json({ success: true });
                                        });
                                        break;
                                }
                            }
                            else {
                                tryCatch(new logger_manager_1.LoggerManager().warnLogger("Permission denied", "This action requires an authenticated root"));
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.default = new RootRoute().getRouter();
//# sourceMappingURL=root.route.js.map