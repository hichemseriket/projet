import {User} from "../../../../client/src/app/user";
import {UserGroupEntity} from "../../../orm/entity/user-system/userGroup.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {GroupClass} from "../class/group.class";

class GroupController {

    public getGroupsList() {
        return new Promise (async (resolve, reject) => {
            const groupList: GroupClass[] = [];
            const groups: UserGroupEntity[] = await UserGroupEntity.find();
            for await(const group of groups) {
                const newGroup = new GroupClass(group.id, group.name, group.validate, group.suggest, group.administrate);
                groupList.push(newGroup);
            }
            resolve(groupList);

        });
    }

    public updateGroup(id: number, validate: boolean, suggest: boolean, administrate: boolean, choseName: string) {
        return new Promise(async (resolve) => {
            const Group = await new GroupClass(id, choseName, validate, suggest, administrate).create();
            Group!.saveInDatabase();
            resolve(Group);
            });
    }

    public createGroup(id: number, validate: boolean, suggest: boolean, administrate: boolean, name: string) {
        return new Promise(async (resolve) => {
            const NewGroup = await new GroupClass(id, name, validate, suggest, administrate).saveNewGroup();
            resolve(NewGroup);
        });
    }

    public deleteGroup(id: number, validate: boolean, suggest: boolean, administrate: boolean, name: string) {
        return new Promise(async (resolve) => {
            await new GroupClass(id, name, validate, suggest, administrate).deleteGroupFunction(id, name);
            resolve(true);
        });
    }
}

export default new GroupController();
