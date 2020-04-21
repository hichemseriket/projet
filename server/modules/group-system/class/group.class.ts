import { UserGroupEntity } from "../../../orm/entity/user-system/userGroup.entity";
import {UserInfoEntity} from "../../../orm/entity/user-system/userInfo.entity";
import MariaDb from "../../../services/database";
import { LoggerManager } from "../../../services/logger-manager/logger-manager";

export class GroupClass {

    private name!: string;
    private id!: number;
    private validate!: boolean;
    private suggest!: boolean;
    private administrate!: boolean;

    constructor(id: number, name: string, validate: boolean, suggest: boolean, administrate: boolean) {
        this.setName(name);
        this.setValidate(validate);
        this.setSuggest(suggest);
        this.setAdministrate(administrate);
        this.setId(id);
    }

    public saveNewGroup() {
        return new Promise((resolve) => {
           MariaDb.connectDb().then(async () => {
               const newGroup = await UserGroupEntity.create();
               if (newGroup) {
                   newGroup.name = this.name;
                   newGroup.validate = this.validate;
                   newGroup.suggest = this.suggest;
                   newGroup.administrate = this.administrate;
                   await newGroup.save();
                   resolve(newGroup);
               } else {
                   throw new LoggerManager().warnLogger("Can't create this group", "Impossible de créer le groupe");
               }
           });
        });
    }

    public saveInDatabase() {
        return new Promise((resolve) => {
                   MariaDb.connectDb().then(async () => {
                       const groupRights = await UserGroupEntity.findOne({where: {name: this.name}});
                       if (groupRights) {
                           groupRights.validate = this.validate;
                           groupRights.suggest = this.suggest;
                           groupRights.administrate = this.administrate;
                           await groupRights.save();
                           resolve(groupRights);
                       } else {
                           throw new LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                       }
                   });
            });
    }

    public deleteInfoGroup(groupId: number) {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const users: UserInfoEntity[] = await UserInfoEntity.find({relations: ["group"]});
                if (users) {
                    for await (const user of users) {
                        if (user.group.id === groupId) {
                            user.group.id = 1;
                            await user.save();
                        }
                    }
                } else {
                    throw new LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                }
            });
            resolve(true);
        });
    }

    public deleteGroup(groupName: string) {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const selectedGroup = await UserGroupEntity.findOne({where: {name: groupName}});
                if (selectedGroup) {
                    if (selectedGroup.id > 3) {
                        await selectedGroup.remove();
                        resolve(true);
                    } else {
                        throw new LoggerManager().warnLogger("You can't delete this group", "Vous ne pouvez pas supprimer ce groupe");
                    }
                } else {
                    throw new LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
                }
            });
        });
    }

    public async create() {
        const newGroup = await this.setAttribute();
        if (newGroup) {
            return this;
        }
    }

    public async deleteGroupFunction(groupId: number, groupName: string) {
        const done = await this.deleteInfoGroup(groupId);
        if (done) {
            await this.deleteGroup(groupName);
        }
    }

    // public deleteGroup(groupName: string) {
    //     return new Promise((resolve) => {
    //         MariaDb.connectDb().then(async () => {
    //             const selectedGroup = await UserGroupEntity.findOne({where: {name: groupName}});
    //             if (selectedGroup) {
    //                 await selectedGroup.remove();
    //                 resolve(true);
    //             } else {
    //                 throw new LoggerManager().warnLogger("this group doesn't exist", "Le groupe demandé n'a pas été trouvé");
    //             }
    //         });
    //     });
    // }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                UserGroupEntity.findOne({where: {name: this.name}}).then((newGroup) => {
                    if (newGroup) {
                        newGroup.validate = this.validate;
                        newGroup.suggest = this.suggest;
                        newGroup.administrate = this.administrate;
                        resolve(newGroup);
                    } else {
                        throw new LoggerManager().warnLogger("this group doesn't exists", "Le groupe demandé n'a pas été trouvé");
                    }

                });
            });
        });
    }

    private setName(value: string) {
        this.name = value;
    }

    private setId(value: number) {
        this.id = value;
    }

    private setAdministrate(value: boolean) {
        this.administrate = value;
    }

    get Name(): string { return this.name; }

    get Id(): number { return this.id; }

    get Validate(): boolean { return this.validate; }
    private setValidate(value: boolean) {
        this.validate = value;
    }

    get Suggest(): boolean { return this.suggest; }
    private setSuggest(value: boolean) {
        this.suggest = value;
    }

}
