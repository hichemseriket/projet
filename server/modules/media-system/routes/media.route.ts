import express from "express";
import Mid from "../controllers/media.controller";

class MediaRoute {

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
            let errorSended = false;
            function tryCatch(err: any) {
                if (!errorSended) {
                    errorSended = true;
                    res.json({logger: err});
                }
            }

            const action = req.body.action;
            let ref = req.body.ref;
            const fileReader = req.body.fileReader;
            let filename = req.body.filename;
            let category = req.body.category;
            let mediaDate = req.body.mediaDate;

            switch (action) {
                /**
                 * add media in bdd
                 */
                case"addMedia":
                    ref = ref.trim();
                    category = category.trim();
                    mediaDate = mediaDate.trim();
                    Mid.addMedia(ref, fileReader, category, mediaDate)
                        .catch((errorAddMedia) => { tryCatch(errorAddMedia); })
                        .then((resultAddMedia) => {
                            if (resultAddMedia) {
                                res.json({success: true});
                            }
                        });
                    break;
                /**
                 * remove media in bdd and file
                 */
                case"removeMedia":
                    filename = filename.trim();
                    Mid.removeMedia(filename)
                        .catch((errorRemoveMedia) => { tryCatch(errorRemoveMedia); })
                        .then((resultRemoveMedia) => {
                            if (resultRemoveMedia) {
                                res.json({success: true});
                            }
                        });
                    break;

            }
        });
    }
}

export default new MediaRoute().getRouter();
