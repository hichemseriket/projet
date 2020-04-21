"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_route_1 = __importDefault(require("./routes/media.route"));
class HouseSystemesRoutes {
    constructor(app) {
        this.app = app;
        this.routing();
    }
    /**
     * Routing to target requested
     */
    routing() {
        this.app.use("/media", media_route_1.default);
    }
}
exports.default = HouseSystemesRoutes;
//# sourceMappingURL=mediaSystemes.routes.js.map