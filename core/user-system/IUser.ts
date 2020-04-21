
export type TUserInfo = "name" | "firstName" | "groupId" | "mail" | "role" | "activ" | "password" | "validate";
export type ItemType = "Name" | "FirstName";

export interface IUser {
    id: number;
    mail: string;
    registerDate: Date;
    keyTemp: string | null;
    role: number;
    activ: number;
 }

export interface IUserInfo extends IUser {
    name: string;
    firstName: string;
    groupId: number;
    validate: boolean;
}
