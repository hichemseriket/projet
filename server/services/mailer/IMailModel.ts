export type modelType = "test" | "changeMail" | "changeMailToOld" | "contactMail" | "changePass" | "forgotPseudo" | "initPass" | "forgotPass";

export interface IMailModel {
    to: string;
    subject: string;
    model: modelType;
    variable: any;
}
