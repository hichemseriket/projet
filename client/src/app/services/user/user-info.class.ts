import {IUserInfo} from "../../../../../core/user-system/IUser";
import {UserClass} from "./user.class";

export class UserInfoClass extends UserClass {

    private name!: string;
    private firstName!: string;
    private groupId!: number;
    private validate!: boolean;

    constructor(user: IUserInfo) {
        super(user);
        this.setName(user.name);
        this.setFirstName(user.firstName);
        this.setGroupId(user.groupId);
        this.setValidate(user.validate);
    }

    // ===================================================================================================
    // PRIVATE ===========================================================================================

    private setGroupId(value: number) {
        if (value > 0) {
            this.groupId = value;
        } else {
            throw new Error("UserInfo.groupId(" + value + ") must be greater than zero");
        }
    }
    private setName(value: string) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.name = value;
        } else {
            throw new Error("UserInfo.name must have between 2 and 80 character");
        }
    }
    private setFirstName(value: string) {
        if (value === null || (value.length >= 2 && value.length <= 80)) {
            this.firstName = value;
        } else {
            throw new Error("UserInfo.firstName must have between 2 and 80 character");
        }
    }
    private setValidate(value: boolean) {
        this.validate = value;
    }

    public isAdministrator(): boolean {
        return this.groupId === 4;
    }

    // ===================================================================================================
    // GETTER & SETTER ===================================================================================

    get Name(): string { return this.name; }
    get FirstName(): string { return this.firstName; }
    get GroupId(): number { return this.groupId; }
    get Validate(): boolean { return this.validate; }
}
