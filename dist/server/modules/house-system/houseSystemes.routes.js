"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const batiment_route_1 = __importDefault(require("./routes/batiment.route"));
const histoire_route_1 = __importDefault(require("./routes/histoire.route"));
const house_route_1 = __importDefault(require("./routes/house.route"));
const parcelle_route_1 = __importDefault(require("./routes/parcelle.route"));
class HouseSystemesRoutes {
    constructor(app) {
        this.app = app;
        this.routing();
    }
    /**
     * Routing to target requested
     */
    routing() {
        this.app.use("/house", house_route_1.default);
        this.app.use("/building", batiment_route_1.default);
        this.app.use("/terrain", parcelle_route_1.default);
        this.app.use("/histoire", histoire_route_1.default);
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
}
exports.default = HouseSystemesRoutes;
//# sourceMappingURL=houseSystemes.routes.js.map