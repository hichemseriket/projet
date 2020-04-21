import express from "express";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import Token from "../../../services/secure/token.class";
import UserController from "../controllers/user.controller";

class UserRoute {

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
                    .then((idUser) => {
                        if (idUser) {
                            const id = idUser as number;
                            UserController.getUser(id)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((user) => {

                                    const itemName: ItemType = req.body.itemName;
                                    const userById: number = req.body.userById;
                                    let itemValue: string = req.body.itemValue;
                                    let currentPassword: string = req.body.currentPassword;
                                    let newMail: string = req.body.newMail;

                                    switch (action) {

                                        case"getUser":
                                            res.json({success: true, user});
                                            break;

                                        case"getUserById":
                                            UserController.getUser(userById)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((userResult) => {
                                                    res.json({success: true, user: userResult});
                                                });
                                            break;

                                        case"clearUser":
                                            Token.delToken(token);
                                            res.json({success: true});
                                            break;

                                        case"updatePassword":
                                            currentPassword = currentPassword.trim();
                                            UserController.onWillUpdatePassword(id, currentPassword)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((updatedUser) => {
                                                    res.json({success: true});
                                                });
                                            break;

                                        case"updateMail":
                                            newMail = newMail.trim();
                                            UserController.onWillUpdateMail(id, newMail)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((updatedUser) => {
                                                    res.json({success: true});
                                                });
                                            break;

                                        case"updateUser":
                                            itemValue = itemValue.trim();
                                            UserController.updateUser(id, itemName, itemValue)
                                                .catch((error) => {
                                                    tryCatch(error);
                                                })
                                                .then((updatedUser) => {
                                                    res.json({success: true, user: updatedUser});
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

export default new UserRoute().getRouter();
