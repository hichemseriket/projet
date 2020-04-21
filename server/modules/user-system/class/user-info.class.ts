import {UserEntity} from "../../../orm/entity/user-system/user.entity";
import {UserInfoEntity} from "../../../orm/entity/user-system/userInfo.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {UserClass} from "./user.class";

export class UserInfoClass extends UserClass {

    private name!: string;
    private firstName!: string;
    private groupId!: number;
    private validate!: boolean;

    constructor(id: number) {
        super(id);
    }

    /**
     * Create user and userInfo with database.
     * @return this
     */
    public async createInfo() {
        const done = await this.create();
        if (done) {
            const doneInfo = await this.setUserInfoAttribute();
            if (doneInfo) { return this; }
        }
    }

    /**
     * Save user and userInfo in database
     */
    public saveInfoInDatabase() {
        return new Promise((resolve) => {
            this.saveInDatabase().then((user) => {
                if (user) {
                    MariaDb.connectDb().then(async () => {
                        const userInfo = await UserInfoEntity.findOne({ user: user as UserEntity }, {relations : ["group"]});
                        if (userInfo) {
                            // userInfo.user = user as UserEntity;
                            userInfo.lastName = this.Name;
                            userInfo.firstName = this.FirstName;
                            userInfo.group.id = this.GroupId;
                            await userInfo.save();
                            resolve(userInfo);
                        } else {
                            throw new LoggerManager().warnLogger("this user doesn't exist", "L'utilisateur demandé n'a pas été trouver");
                        }
                    });
                }
            });
        });
    }

    /**
     * Delete user and userInfo in database
     */
    public deleteInfoInDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.Id);
                UserInfoEntity.findOne({user}).then((userInfo) => {
                    if (userInfo) {
                        userInfo.remove();
                        resolve(userInfo);
                    } else {
                        throw new LoggerManager().warnLogger("this user doesn't exist", "L'utilisateur demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    // ===================================================================================================
    // PRIVATE============================================================================================

    private setUserInfoAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const user = await UserEntity.findOne(this.Id);
                UserInfoEntity.findOne({user}, {relations : ["group"]}).then((userInfo) => {
                    if (userInfo) {
                            this.Name = userInfo.lastName;
                            this.FirstName = userInfo.firstName;
                            this.GroupId = userInfo.group.id;
                            this.Validate = userInfo.group.validate;
                    }
                    resolve(userInfo);
                });
            });
        });
    }

    // ===================================================================================================
    // GETTER & SETTER ===================================================================================

    get Validate(): boolean { return this.validate; }
    set Validate(value: boolean) {
        this.validate = value;
    }

    get Name(): string { return this.name; }
    set Name(value: string) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.name = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "UserInfo.name(" + value + ") must have between 2 and 80 character");
        }
    }

    get FirstName(): string { return this.firstName; }
    set FirstName(value: string) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.firstName = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "UserInfo.firstName(" + value + ") must have between 2 and 80 character");
        }
    }

    get GroupId(): number { return this.groupId; }
    set GroupId(value: number) {
        if (value > 0) {
            this.groupId = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "UserInfo.groupUser(" + value + ") must be greater than zero");
        }
    }
}
