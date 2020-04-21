"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const token_class_1 = __importDefault(require("../../../services/secure/token.class"));
const parcelle_controller_1 = __importDefault(require("../controllers/parcelle.controller"));
const parcelle_controller_2 = __importDefault(require("../controllers/parcelle.controller"));
class ParcelleRoute {
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
                const idPar = req.body.idParcelle;
                // const Nom = req.body.nom;
                // const Type = req.body.type;
                // const Description = req.body.description;
                // const Media = req.body.media;
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
                switch (action) {
                    case "deleteParcelle":
                        parcelle_controller_1.default.deleteTerrain(idPar)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((deleteTerrain) => {
                            res.json({ success: true, parcelleList: deleteTerrain });
                        });
                        break;
                    case "addParcelle":
                        parcelle_controller_2.default.addTerrain(NumeroRoute, NomRue, CodePostal, Latitude, Longitude, Delimitation, Cour, RevetementCour, Vegetation, Vacant, Notes)
                            .catch((error) => {
                            tryCatch(error);
                        })
                            .then((addTerrain) => {
                            res.json({ success: true, parcelleList: addTerrain });
                        });
                        break;
                    case "getParcelle":
                        parcelle_controller_1.default.getTerrainList()
                            .then((result) => {
                            res.json({ success: true, parcelleList: result });
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
exports.default = new ParcelleRoute().getRouter();
//# sourceMappingURL=parcelle.route.js.map