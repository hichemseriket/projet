"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const nodeMailer = __importStar(require("nodemailer"));
const path_1 = require("path");
const config_json_1 = __importDefault(require("../../../config.json"));
const logger_manager_1 = require("../logger-manager/logger-manager");
/**
 * v 1.1.0
 * npm i -s nodemailer
 */
class Mailer {
    constructor() {
        dotenv_1.default.config();
        this.mailer = nodeMailer.createTransport({
            service: config_json_1.default.mailer.service,
            auth: {
                user: config_json_1.default.mailer.auth.user,
                pass: config_json_1.default.mailer.auth.password
            }
        });
        this.siteName = config_json_1.default.general.name;
        this.siteUrl = config_json_1.default.general.urlDomain;
        this.slogan = config_json_1.default.general.slogan;
        this.logoUrl = config_json_1.default.general.urlLogo;
    }
    /**
     * Build mail html content
     * @param model: string
     * @param variable: any
     */
    buildMail(model, variable) {
        return new Promise((resolv, reject) => {
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
    send(mail) {
        return new Promise((resolv, reject) => {
            this.buildMail(mail.model, mail.variable)
                .then((mailContent) => {
                this.mailer.sendMail(this.setHeader(mail.to, mail.subject, mailContent))
                    .then((res) => {
                    resolv(true);
                })
                    .catch((err) => {
                    reject(new logger_manager_1.LoggerManager().warnLogger("send mail failed", err.response));
                });
            })
                .catch((err) => { reject(err); });
        });
    }
    // PRIVATE ==========================================================================
    /**
     * Build content mail in term of model and variable
     * @param content: string
     * @param model: string
     * @param variable: string
     */
    buildContent(content, model, variable) {
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
    readModuleFile(path) {
        return new Promise((resolv) => {
            const filename = path_1.resolve(path);
            fs.readFile(filename, "utf8", (err, res) => {
                if (err) {
                    new logger_manager_1.LoggerManager().errorLogger("mailer_readModuleFile", err);
                }
                else {
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
    setHeader(mailTo, mailSubject, mailContent) {
        return {
            FROM: config_json_1.default.general.name + " - <" + config_json_1.default.general.urlContact + ">",
            to: mailTo,
            subject: mailSubject,
            text: mailContent,
            html: "<p>" + mailContent + "</p>"
        };
    }
}
exports.default = new Mailer();
//# sourceMappingURL=mailer.js.map