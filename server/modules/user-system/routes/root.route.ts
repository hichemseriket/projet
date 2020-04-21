import express from "express";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import Token from "../../../services/secure/token.class";
import {UserInfoClass} from "../class/user-info.class";
import AdminController from "../controllers/admin.controller";
import RootController from "../controllers/root.controller";
import UserController from "../controllers/user.controller";

class RootRoute {

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
                Token.checkToken(token, action) // Check if token session exist and not expired
                    .catch((error) => { tryCatch(error); })
                    .then((idUser) => {
                        if (idUser) {
                            const id = idUser as number;
                            UserController.getUser(id) // Check if user exists
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((user) => {
                                    const User = user as UserInfoClass;
                                    if (User.Validate) { // Check if user is an authenticated root

                                        switch (action) {

                                            case"test":
                                                RootController.TestController()
                                                    .then((result) => {
                                                        res.json({success: true});
                                                    });
                                                break;
                                        }
                                    } else {
                                        tryCatch(new LoggerManager().warnLogger("Permission denied", "This action requires an authenticated root"));
                                    }
                                });
                        }
                    });
            }
        });
    }
}

export default new RootRoute().getRouter();
