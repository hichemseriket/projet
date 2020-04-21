"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const guest_route_1 = __importDefault(require("./routes/guest.route"));
const root_route_1 = __importDefault(require("./routes/root.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
class UserSystemesRoutes {
    constructor(app) {
        this.app = app;
        this.routing();
    }
    /**
     * Routing to target requested
     */
    routing() {
        this.app.use("/guest", guest_route_1.default);
        this.app.use("/user", user_route_1.default);
        this.app.use("/user/admin", admin_route_1.default);
        this.app.use("/user/root", root_route_1.default);
    }
}
exports.default = UserSystemesRoutes;
//# sourceMappingURL=userSystemes.routes.js.map