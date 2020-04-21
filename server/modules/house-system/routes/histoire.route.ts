import express from "express";
import { LoggerManager } from "../../../services/logger-manager/logger-manager";
import Token from "../../../services/secure/token.class";
import HistoireController from "../controllers/histoire.controller";

class HistoireRoute {

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

                switch (action) {

                        case"getAllHistory":
                            HistoireController.getAllHistory()
                                .then((result) => {
                                    res.json({success: true, resultQuery: result});
                            });
                            break;

                }
            } else {
                tryCatch(new LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
            }
        });
    }
}

export default new HistoireRoute().getRouter();
