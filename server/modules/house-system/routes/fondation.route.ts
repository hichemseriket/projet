import express from "express";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import Token from "../../../services/secure/token.class";
import FondationController from "../controllers/fondation.controller";

class FondationRoute {

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
                res.json({logger: err});
            }

            const action: string = req.body.action;
            const token = req.headers.authorization;

            if (token) {
                Token.checkToken(token, action)
                    .catch((error) => { tryCatch(error); })
                    .then((idAutre) => {
                        if (idAutre) {
                            const id = idAutre as number;
                            FondationController.getFondation(id)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((autre) => {
                                    //Inserer les elements envoyé depuis le front ici
                                    const idFondation: number = req.body.idFondation;
                                    const charpente: string = req.body.charpente;
                                    const structure: string = req.body.structure;
                                    const niveau: number = req.body.niveau;
                                    const cave: boolean = req.body.cave;
                                    const comble: boolean = req.body.comble;
                                    const description: string = req.body.description;

                                    switch (action) {

                                        case"getFondation":
                                            res.json({success: true, autre});
                                            break;
                                            
                                        case"deleteFondation":
                                            FondationController.deleteFondation(idFondation)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((deletedFondation) => {
                                                    res.json({success: true, user: deletedFondation});
                                                });
                                            break;

                                        case"addFondation":
                                            FondationController.addFondation(charpente,structure,niveau,cave,comble,description)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((addFondation) => {
                                                    res.json({success: true, user: addFondation});
                                                });
                                            break;

                                    }
                                });
                        }
                    });
            }
        });
    }

}

export default new FondationRoute().getRouter();
