import express from "express";
import {TUserInfo} from "../../../../core/user-system/IUser";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import Token from "../../../services/secure/token.class";
import {UserInfoClass} from "../class/user-info.class";
import AdminController from "../controllers/admin.controller";
import UserController from "../controllers/user.controller";

class AdminRoute {

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
                                    // TODO ajouter un système vérifiant le groupe
                                    if (User) { // Check if user is an authenticated administrator

                                        const item: TUserInfo = req.body.item;
                                        const value: number = req.body.value;
                                        const idOtherUser = req.body.idOtherUser;

                                        switch (action) {

                                            case"getUsersList":
                                                AdminController.getUsersList()
                                                    .then((result) => {
                                                        res.json({success: true, usersList: result});
                                                    });
                                                break;

                                            case"updateUser":
                                                AdminController.updateUser(idOtherUser, item, value)
                                                    .catch((error) => {
                                                        tryCatch(error);
                                                    })
                                                    .then((updatedUser) => {
                                                        res.json({success: true, user: updatedUser});
                                                    });
                                                break;

                                            case"deleteUser":
                                                AdminController.deleteUser(idOtherUser, item, value)
                                                    .catch((error) => {
                                                        tryCatch(error);
                                                    })
                                                    .then((deletedUser) => {
                                                        res.json({success: true, user: deletedUser});
                                                    });
                                                break;
                                        }
                                    } else {
                                        tryCatch(new LoggerManager().warnLogger("Permission denied", "This action requires an authenticated administrator"));
                                    }
                                });
                        }
                    });
            }
        });
    }
}

export default new AdminRoute().getRouter();
