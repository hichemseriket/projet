"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
class MediaRoute {
    constructor() {
        this.router = express_1.default();
        this.route();
    }
    getRouter() {
        return this.router;
    }
    route() {
        this.router.post("/", (req, res) => {
            let errorSended = false;
            function tryCatch(err) {
                if (!errorSended) {
                    errorSended = true;
                    res.json({ logger: err });
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
                case "addMedia":
                    ref = ref.trim();
                    category = category.trim();
                    mediaDate = mediaDate.trim();
                    media_controller_1.default.addMedia(ref, fileReader, category, mediaDate)
                        .catch((errorAddMedia) => { tryCatch(errorAddMedia); })
                        .then((resultAddMedia) => {
                        if (resultAddMedia) {
                            res.json({ success: true });
                        }
                    });
                    break;
                /**
                 * remove media in bdd and file
                 */
                case "removeMedia":
                    filename = filename.trim();
                    media_controller_1.default.removeMedia(filename)
                        .catch((errorRemoveMedia) => { tryCatch(errorRemoveMedia); })
                        .then((resultRemoveMedia) => {
                        if (resultRemoveMedia) {
                            res.json({ success: true });
                        }
                    });
                    break;
            }
        });
    }
}
exports.default = new MediaRoute().getRouter();
//# sourceMappingURL=media.route.js.map