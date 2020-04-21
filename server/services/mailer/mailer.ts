import dotenv from "dotenv";
import * as fs from "fs";
import * as nodeMailer from "nodemailer";
import {resolve} from "path";
import config from "../../../config.json";
import {LoggerManager} from "../logger-manager/logger-manager";
import {IMailModel} from "./IMailModel";

/**
 * v 1.1.0
 * npm i -s nodemailer
 */
class Mailer {

    public mailer;
    public html;

    private readonly siteName;
    private readonly siteUrl;
    private readonly slogan;
    private readonly logoUrl;

    constructor() {
        dotenv.config();
        this.mailer = nodeMailer.createTransport({
            service: config.mailer.service,
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.password
            }
        });
        this.siteName = config.general.name;
        this.siteUrl = config.general.urlDomain;
        this.slogan = config.general.slogan;
        this.logoUrl = config.general.urlLogo;
    }

    /**
     * Build mail html content
     * @param model: string
     * @param variable: any
     */
    public buildMail(model: string, variable: any) {
        return new Promise((resolv: (value?: string) => void, reject) => {
            this.readModuleFile("./server/services/mailer/template/mailTemplate.html")
                .catch((err) => {
                    reject(err);
                })
                .then((html) => {
                    this.readModuleFile("./server/services/mailer/template/" + model + ".html")
                        .catch((err) => {
                            reject(err);
                        })
                        .then((content) => {
                            this.html = html;
                            this.html = this.html.replace(/{siteName}/g, this.siteName);
                            this.html = this.html.replace(/{siteUrl}/g, this.siteUrl);
                            this.html = this.html.replace(/{slogan}/g, this.slogan);
                            this.html = this.html.replace(/{logoUrl}/g, this.logoUrl);
                            content = this.buildContent(content, model, variable);
                            this.html = this.html.replace("{content}", content);
                            resolv(this.html);
                        });

                });
        });

    }

    /**
     * Send a e-mail
     * @param mail: IMailModel (to: strong, subject: string, model: string, variable: any)
     */
    public send(mail: IMailModel) {
        return new Promise((resolv, reject) => {
            this.buildMail(mail.model, mail.variable)
                .then((mailContent) => {
                    this.mailer.sendMail(this.setHeader(mail.to, mail.subject, mailContent))
                        .then( (res) => {
                            resolv(true);
                        })
                        .catch((err) => {
                            reject(new LoggerManager().warnLogger("send mail failed", err.response));
                        });
                })
                .catch((err) => {reject(err); });
        });
    }

    // PRIVATE ==========================================================================

    /**
     * Build content mail in term of model and variable
     * @param content: string
     * @param model: string
     * @param variable: string
     */
    private buildContent(content, model: string, variable: any) {
        // send a mail for test
        if (model === "test") {
            content = content.replace("{test}", variable.test);
        }
        // send a mail for confirm a changed mail
        if (model === "changeMail") {
            const urlPage = this.siteUrl + "/#/confirm-mail";
            content = content.replace("{idUser}", variable.idUser);
            content = content.replace("{keyTemp}", variable.keyTemp);
            content = content.replace("{newMail}", variable.newMail);
            content = content.replace("{urlPage}", urlPage);
        }
        if (model === "changeMailToOld") {
            content = content.replace("{newMail}", variable.newMail);
        }
        if (model === "contactMail" || model === "contactMailCopie") {
            content = content.replace("{name}", variable.name);
            content = content.replace("{mail}", variable.mail);
            content = content.replace("{subject}", variable.subject);
            content = content.replace("{message}", variable.message);
        }
        // send a mail for initialize a password
        if (model === "changePass" || model === "initPass" || model === "forgotPass") {
            const urlPage = this.siteUrl + "/#/init-password";
            content = content.replace("{idUser}", variable.idUser);
            content = content.replace("{keyTemp}", variable.keyTemp);
            content = content.replace("{urlPage}", urlPage);
        }
        if (model === "forgotPseudo") {
            content = content.replace("{username}", variable.username);
        }
        return content;
    }

    /**
     * Read and return the mail template selected
     * @param path: string
     */
    private readModuleFile(path: string) {
        return new Promise((resolv: (value: string) => void) => {
            const filename = resolve(path);
            fs.readFile(filename, "utf8", (err, res: string) => {
                if (err) {
                    new LoggerManager().errorLogger("mailer_readModuleFile", err);
                } else {
                    resolv(res);
                }
            });
        });

    }

    /**
     * Set the mail's header
     * @param mailTo: string
     * @param mailSubject: string
     * @param mailContent: string
     */
    private setHeader(mailTo: string, mailSubject: string, mailContent: string) {
        return {
            FROM: config.general.name + " - <" + config.general.urlContact + ">",
            to: mailTo,
            subject: mailSubject,
            text: mailContent,
            html: "<p>" + mailContent + "</p>"
        };
    }
}

export default new Mailer();
