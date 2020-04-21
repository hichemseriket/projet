"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("../common-modules/routes/test"));
const groupSystems_routes_1 = __importDefault(require("../modules/group-system/groupSystems.routes"));
const houseSystemes_routes_1 = __importDefault(require("../modules/house-system/houseSystemes.routes"));
const mediaSystemes_routes_1 = __importDefault(require("../modules/media-system/mediaSystemes.routes"));
const userSystemes_routes_1 = __importDefault(require("../modules/user-system/userSystemes.routes"));
class Routes {
    constructor(app) {
        this.app = app;
        this.routing();
        this.appRouting();
    }
    /**
     * Routing common
     */
    routing() {
        this.app.use("/test", test_1.default);
    }
    /**
     * Routing module
     */
    appRouting() {
        const userSystemRoutes = new userSystemes_routes_1.default(this.app);
        const houseSystemRoutes = new houseSystemes_routes_1.default(this.app);
        const mediaSystemRoutes = new mediaSystemes_routes_1.default(this.app);
        const groupSystemRoutes = new groupSystems_routes_1.default(this.app);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map