import express from "express";
import GuestController from "../controllers/guest.controller";

// const errMan = ErrorManager;

class GuestRoute {

  private readonly router;

  constructor() {
    this.router = express();
    this.route();
  }

  public getRouter() {
    return this.router;
  }

  private route() {

    this.router.post("/", (req, res) => {

      function tryCatch(e: any) {
        res.json({logger: e});
      }

      const action: string = req.body.action;

      // UNSECURIZED ZONE =============================================================

      const idUser = req.body.idUser;
      let keytemp = req.body.keytemp;
      let pass1: string = req.body.password;
      let pass2: string = req.body.passwordConfirm;
      const gcu = req.body.gcu;
      let mail = req.body.mail;
      let newMail = req.body.newMail;
      let password = req.body.password;

      switch (action) {

          case"login":
              mail = mail.trim();
              password = password.trim();
              GuestController.login(mail, password)
                  .catch((error) => { tryCatch(error); })
                  .then((result) => {
                      if (result) {
                          res.json({success: true, token: result});
                      }
                  });
              break;

            case"register":
                mail = mail.trim();
                pass1 = pass1.trim();
                pass2 = pass2.trim();
                GuestController.register(mail, pass1, pass2, gcu)
                    .catch((error) => { tryCatch(error); })
                    .then((result) => {
                        if (result) {
                            res.json({success: true});
                        }
                    });
                break;

          case"initPassword":
              pass1 = pass1.trim();
              pass2 = pass2.trim();
              keytemp = keytemp.trim();
              GuestController.initPassword(idUser, keytemp, pass1, pass2)
                  .catch((error) => { tryCatch(error); })
                  .then((result) => {
                      if (result) {
                          res.json({success: true});
                      }
                  });
              break;

          case"confirmMail":
              keytemp = keytemp.trim();
              password = password.trim();
              newMail = newMail.trim();
              GuestController.confirmMail(idUser, keytemp, password, newMail)
                  .catch((error) => { tryCatch(error); })
                  .then((result) => {
                      if (result) {
                          res.json({success: true});
                      }
                  });
              break;

            }
        });
    }
}

export default new GuestRoute().getRouter();
