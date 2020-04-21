"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const histoire_controller_1 = __importDefault(require("../controllers/histoire.controller"));
class HistoireRoute {
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
                res.json({ err });
            }
            const action = req.body.action;
            const token = req.headers.authorization;
            if (token) {
                token_class_1.default.checkToken(token, action)
                    .catch((error) => { tryCatch(error); });
                switch (action) {
                    case "getAllHistory":
                        histoire_controller_1.default.getAllHistory()
                            .then((result) => {
                            res.json({ success: true, resultQuery: result });
                        });
                        break;
                }
            }
            else {
                tryCatch(new logger_manager_1.LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
            }
        });
    }
}
exports.default = new HistoireRoute().getRouter();
//# sourceMappingURL=histoire.route.js.map