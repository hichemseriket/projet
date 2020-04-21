"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const batiment_controller_1 = __importDefault(require("../controllers/batiment.controller"));
class BatimentRoute {
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
                const idBat = req.body.idBatiment;
                const Nom = req.body.nom;
                const Type = req.body.type;
                const Description = req.body.description;
                const Media = req.body.media;
                const NumeroRoute = req.body.NumeroRoute;
                const NomRue = req.body.NomRue;
                const CodePostal = req.body.CodePostal;
                const Latitude = req.body.Latitude;
                const Longitude = req.body.Longitude;
                const Delimitation = req.body.Delimitation;
                const Cour = req.body.Cour;
                const RevetementCour = req.body.RevetementCour;
                const Vegetation = req.body.Vegetation;
                const Vacant = req.body.Vacant;
                const Notes = req.body.Notes;
                const MediaParcelle = req.body.MediaParcelle;
                const gps = req.body.gps;
                const street = req.body.street;
                const city = req.body.city;
                switch (action) {
                    case "deleteBatiment":
                        batiment_controller_1.default.deleteBuilding(idBat)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((deletedBuilding) => {
                            res.json({ success: true, batiment: deletedBuilding });
                        });
                        break;
                    case "addBuilding":
                        batiment_controller_1.default.addBuilding(city, street, gps)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((addBuilding) => {
                            res.json({ success: true, batiment: addBuilding });
                        });
                        break;
                    case "getBuildingList":
                        batiment_controller_1.default.getBuildingList()
                            .then((result) => {
                            res.json({ success: true, houseList: result });
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
exports.default = new BatimentRoute().getRouter();
//# sourceMappingURL=batiment.route.js.map