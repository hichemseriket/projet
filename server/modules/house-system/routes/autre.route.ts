import express from "express";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import Token from "../../../services/secure/token.class";
import AutreController from "../controllers/autre.controller";

class AutreRoute {

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
                            AutreController.getAutre(id)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((autre) => {
                                    //Inserer les elements envoyé depuis le front ici
                                    const idAutre: number = req.body.idAutre;
                                    const Portes = req.body.porte;
                                    const Fenetres = req.body.fenetre;
                                    const Volets = req.body.volet;
                                    const Ferronneries = req.body.fer;
                                    const Vitreries = req.body.vitre;
                                    const Assemblages = req.body.assemblage;
                                    const Poele = req.body.poele;
                                    const Kunst = req.body.kunst;
                                    const Vegetations = req.body.vege;

                                    switch (action) {

                                        case"getAutre":
                                            res.json({success: true, autre});
                                            break;
                                            
                                        case"deleteAutre":
                                            AutreController.deleteAutre(idAutre)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((deletedAutre) => {
                                                    res.json({success: true, user: deletedAutre});
                                                });
                                            break;

                                        case"addAutre":
                                            AutreController.addAutre(Portes, Fenetres,Volets,Ferronneries,Vitreries,Assemblages,Poele,Kunst,Vegetations)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((addAutre) => {
                                                    res.json({success: true, user: addAutre});
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

export default new AutreRoute().getRouter();
