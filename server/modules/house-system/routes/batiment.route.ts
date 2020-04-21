import express from "express";
import { LoggerManager } from "../../../services/logger-manager/logger-manager";
import Token from "../../../services/secure/token.class";
import BatimentController from "../controllers/batiment.controller";

class BatimentRoute {

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
                const idBat: number = req.body.idBatiment;
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

                        case"deleteBatiment":
                            BatimentController.deleteBuilding(idBat)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((deletedBuilding) => {
                                    res.json({success: true, batiment: deletedBuilding});
                                });
                            break;

                        case"addBuilding":
                            BatimentController.addBuilding(city, street, gps)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((addBuilding) => {
                                    res.json({success: true, batiment: addBuilding});
                            });
                            break;

                        case"getBuildingList":
                            BatimentController.getBuildingList()
                                .then((result) => {
                                    res.json({success: true, houseList: result});
                            });
                            break;

                }
            } else {
                tryCatch(new LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
            }
        });
    }
}

export default new BatimentRoute().getRouter();
