"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guest_controller_1 = __importDefault(require("../controllers/guest.controller"));
// const errMan = ErrorManager;
class GuestRoute {
    constructor() {
        this.router = express_1.default();
        this.route();
    }
    getRouter() {
        return this.router;
    }
    route() {
        this.router.post("/", (req, res) => {
            function tryCatch(e) {
                res.json({ logger: e });
            }
            const action = req.body.action;
            // UNSECURIZED ZONE =============================================================
            const idUser = req.body.idUser;
            let keytemp = req.body.keytemp;
            let pass1 = req.body.password;
            let pass2 = req.body.passwordConfirm;
            const gcu = req.body.gcu;
            let mail = req.body.mail;
            let newMail = req.body.newMail;
            let password = req.body.password;
            switch (action) {
                case "login":
                    mail = mail.trim();
                    password = password.trim();
                    guest_controller_1.default.login(mail, password)
                        .catch((error) => { tryCatch(error); })
                        .then((result) => {
                        if (result) {
                            res.json({ success: true, token: result });
                        }
                    });
                    break;
                case "register":
                    mail = mail.trim();
                    pass1 = pass1.trim();
                    pass2 = pass2.trim();
                    guest_controller_1.default.register(mail, pass1, pass2, gcu)
                        .catch((error) => { tryCatch(error); })
                        .then((result) => {
                        if (result) {
                            res.json({ success: true });
                        }
                    });
                    break;
                case "initPassword":
                    pass1 = pass1.trim();
                    pass2 = pass2.trim();
                    keytemp = keytemp.trim();
                    guest_controller_1.default.initPassword(idUser, keytemp, pass1, pass2)
                        .catch((error) => { tryCatch(error); })
                        .then((result) => {
                        if (result) {
                            res.json({ success: true });
                        }
                    });
                    break;
                case "confirmMail":
                    keytemp = keytemp.trim();
                    password = password.trim();
                    newMail = newMail.trim();
                    guest_controller_1.default.confirmMail(idUser, keytemp, password, newMail)
                        .catch((error) => { tryCatch(error); })
                        .then((result) => {
                        if (result) {
                            res.json({ success: true });
                        }
                    });
                    break;
            }
        });
    }
}
exports.default = new GuestRoute().getRouter();
//# sourceMappingURL=guest.route.js.map