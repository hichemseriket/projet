"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = __importDefault(require("../controllers/test"));
class TestController {
    constructor() {
        this.router = express_1.default();
        this.route();
    }
    getRouter() {
        return this.router;
    }
    route() {
        this.router.post("/", (req, res) => {
            function tryCatch(e) {
                res.json(e);
            }
            const token = req.body.token;
            const action = req.body.action;
            const setError = req.body.setError;
            if (action === "test") {
                test_1.default.testCase(setError)
                    .catch((error) => { tryCatch(error); })
                    .then((result) => {
                    res.json(result);
                });
            }
        });
    }
}
exports.default = new TestController().getRouter();
//# sourceMappingURL=test.js.map