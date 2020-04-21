import express from "express";
import {TUserInfo} from "../../../../core/user-system/IUser";
import Token from "../../../services/secure/token.class";
import UserController from "../../user-system/controllers/user.controller";
import GroupController from "../controllers/admin.controller";

class GroupAdminRoute {

    private readonly router;

    constructor() {
        this.router = express();
        this.route();
    }

    public getRouter() {
        return this.router;
    }

    private route() {
        this.router.post("/", (req, res) => {
            function tryCatch(err: any) {
                res.json({logger: err});
            }

            const action: string = req.body.action;
            const token = req.headers.authorization;
            const name: string = req.body.name;
            const validate: boolean = req.body.validate;
            const suggest: boolean = req.body.suggest;
            const groupId: number = req.body.id;
            const administrate: boolean = req.body.administrate;

            if (token) {
                Token.checkToken(token, action)
                    .catch((error) => {tryCatch(error); })
                    .then((idUser) => {
                        if (idUser) {
                            const id = idUser as number;
                            UserController.getUser(id)
                                .catch((error) => {
                                    tryCatch(error);
                                })
                                .then((group) => {
                                    const item: TUserInfo = req.body.item;

                                    switch (action) {

                                        case"getGroupsList":
                                            GroupController.getGroupsList()
                                                .then((result) => {
                                                    res.json({success: true, groupList: result});
                                                });
                                            break;

                                        case"updateGroup":
                                            GroupController.updateGroup(groupId, validate, suggest, administrate, name)
                                                .then((result) => {
                                                    res.json({success: true, group: result});
                                                });
                                            break;

                                        case"createGroup":
                                            GroupController.createGroup(groupId, validate, suggest, administrate, name)
                                                .then((result) => {
                                                    res.json({success: true, newGroup: result});
                                                });
                                            break;

                                        case"deleteGroup":
                                            GroupController.deleteGroup(groupId, validate, suggest, administrate, name)
                                                .then((result) => {
                                                    res.json({success: true, deletedGroup: result});
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

export default new GroupAdminRoute().getRouter();
