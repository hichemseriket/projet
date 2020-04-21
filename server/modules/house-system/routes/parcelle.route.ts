import express from "express";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import { LoggerManager } from "../../../services/logger-manager/logger-manager";
import Token from "../../../services/secure/token.class";
import ParcelleController from "../controllers/parcelle.controller";
import parcelleController from "../controllers/parcelle.controller";

class ParcelleRoute {

    private readonly router;

    constructor() {
        this.router = express();
        this.route();
    }

    public getRouter() {
        return this.router;
    }

    private route() {
        this.router.post("/" , (req, res) => {

            function tryCatch(err: any) {
                res.json({err});
            }

            const action: string = req.body.action;
            const token = req.headers.authorization;

            if (token) {
                Token.checkToken(token, action)
                    .catch((error) => { tryCatch(error); });
                const idPar: number = req.body.idParcelle;
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

                        case"deleteParcelle":
                            ParcelleController.deleteTerrain(idPar)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((deleteTerrain) => {
                                    res.json({success: true, parcelleList: deleteTerrain});
                                });
                            break;

                        case"addParcelle":
                            parcelleController.addTerrain(NumeroRoute, NomRue, CodePostal, Latitude, Longitude, Delimitation, Cour, RevetementCour, Vegetation, Vacant, Notes)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((addTerrain) => {
                                    res.json({success: true, parcelleList: addTerrain});
                                });
                            break;

                        case"getParcelle":
                            ParcelleController.getTerrainList()
                                .then((result) => {
                                    res.json({success: true, parcelleList: result});
                                });
                            break;

                }
            } else {
                tryCatch(new LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
            }
        });
    }
}

export default new ParcelleRoute().getRouter();
