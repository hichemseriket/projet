"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_manager_1 = require("../../services/logger-manager/logger-manager");
class TestMidware {
    testCase(setError) {
        if (setError === undefined) {
            setError = false;
        }
        return new Promise((resolve) => {
            const result = {
                success: true,
                message: "Ce message vient de l'API !"
            };
            if (!setError) {
                resolve(result);
            }
            else {
                const err = new logger_manager_1.LoggerManager();
                err.warnLogger("user not found", "L'utilisateur n'éxiste pas chez nous");
            }
        });
    }
}
exports.default = new TestMidware();
//# sourceMappingURL=test.js.map