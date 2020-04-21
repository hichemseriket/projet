import * as EmailValidator from "email-validator";
import {IUser} from "../../../../../core/user-system/IUser";

export class UserClass {

    private id!: number;
    private mail!: string;
    private registerDate: Date = new Date();
    private role!: number;
    private activ!: number;

    constructor(user: IUser ) {
            this.setId(user.id);
            this.setMail(user.mail);
            this.setRegisterDate(user.registerDate);
            this.setRole(user.role);
            this.setActif(user.activ);
    }

    // -------Public--------

    /**
     * Return the label's role of user
     */
    public getRoleLabel(): string {
        if (this.role === 0) {
            return 'root';
        } else if (this.role === 1) {
            return 'administrateur';
        } else {
            return 'utilisateur';
        }
    }

    /**
     * Check is role's user is administrator. Return boolean
     */
    public isRoleAdmin(): boolean {
        return this.role <= 1;
    }

    /**
     * Check is role's user is root. Return boolean
     */
    public isRoleRoot(): boolean {
        return this.role === 0;
    }

    // ===================================================================================================
    // PRIVATE============================================================================================

    private setRole(value: number) {
        if ( value >= 0 && value <= 2) {
            this.role = value;
        } else {
            throw new Error("User.role must be greater than or equal to zero and less than or equal to 2");
        }
    }
    private setMail(value: string) {
        if (EmailValidator.validate(value) && value.length >= 2 && value.length <= 80) {
            this.mail = value;
        } else {
            throw new Error("User.email(" + value + ") must be a valid e-mail and have between 2 and 80 character");
        }
    }
    private setActif(value: number) {
        if (value >= 0 && value <= 2) {
            this.activ = value;
        } else {
            throw new Error("User.activ value must be 0, 1 or 2");
        }
    }
    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            throw new Error("User.id must be greater than zero");
        }
    }
    private setRegisterDate(value: Date) {
        this.registerDate = value;
    }

    // ===================================================================================================
    // GETTER & SETTER ===================================================================================

    get Mail(): string { return this.mail; }
    get Activ(): number { return this.activ; }
    get Id(): number { return this.id; }
    get RegisterDate(): Date { return this.registerDate; }
}
