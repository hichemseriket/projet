"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_manager_1 = require("./server/services/logger-manager/logger-manager");
const server_1 = __importDefault(require("./server/services/server"));
const host = process.env.HOST_EXPRESS;
const port = process.env.PORT_EXPRESS;
/**
 * Listening port of the server
 */
server_1.default.app.listen(port, () => {
    new logger_manager_1.LoggerManager().infoLogger("App started", `This app running on ${host}:${port}`);
});
//# sourceMappingURL=index.js.map