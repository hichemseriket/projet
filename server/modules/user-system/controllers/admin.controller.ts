import {TUserInfo} from "../../../../core/user-system/IUser";
import {UserEntity} from "../../../orm/entity/user-system/user.entity";
import {UserInfoClass} from "../class/user-info.class";
import { UserClass } from "../class/user.class";

class AdminController {

    public getUsersList() {
        return new Promise(async (resolve, reject) => {
            const userList: UserInfoClass[] = [];
            const users: UserEntity[] = await UserEntity.find();
            for await(const user of users) {
                const newUser = new UserInfoClass(user.id);
                await newUser.createInfo();
                if (newUser) {
                    userList.push(newUser);
                }
            }
            resolve(userList);
        });
    }

    /**
     * Update the user data (admin parameter) in database
     * @param id [number] - id of user
     * @param item [TUserInfo] - "groupId" | "role" | "activ"
     * @param value [number] - value of item will be updated
     */
    public updateUser(id: number, item: TUserInfo, value: number) {
        return new Promise(async (resolve) => {
            const User = await new UserInfoClass(id).createInfo();
            switch (item) {
                case "activ":
                    User!.Activ = value;
                    break;
                case "groupId":
                    User!.GroupId = value;
                    break;
                case "role":
                    User!.Role = value;
                    break;
            }
            User!.saveInfoInDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        });
    }

    public deleteUser(id: number, item: TUserInfo, value: number) {
        return new Promise(async (resolve) => {
            const UserInfo = await new UserInfoClass(id).createInfo();
            UserInfo!.deleteInfoInDatabase().then((done) => {
                if (done) {
                    resolve(UserInfo);
                }
            });
            const User = await new UserClass(id).create();
            User!.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(User);
                }
            });
        });
    }
}

export default new AdminController();
