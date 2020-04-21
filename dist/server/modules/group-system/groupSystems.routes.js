"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = __importDefault(require("./routes/admin.route"));
class GroupSystemesRoutes {
    constructor(app) {
        this.app = app;
        this.groupRouting();
    }
    /**
     * Routing to target
     */
    groupRouting() {
        this.app.use("/group/admin", admin_route_1.default);
    }
}
exports.default = GroupSystemesRoutes;
//# sourceMappingURL=groupSystems.routes.js.map