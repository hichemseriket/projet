"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const house_controller_1 = __importDefault(require("../controllers/house.controller"));
class HouseRoute {
    constructor() {
        this.router = express_1.default();
        this.route();
    }
    getRouter() {
        return this.router;
    }
    route() {
        this.router.post("/", (req, res) => {
            function tryCatch(err) {
                res.json(err);
            }
            const action = req.body.action;
            const city = req.body.city;
            const street = req.body.street;
            const ref = req.body.ref;
            const roof = req.body.roof;
            const walls = req.body.walls;
            const history = req.body.history;
            let gps = req.body.gps;
            const inputName = req.body.inputName;
            const inputValue = req.body.inputValue;
            const searchValue = req.body.searchValue;
            if (typeof gps === "string") {
                gps = JSON.parse(gps);
            }
            switch (action) {
                /**
                 * add house in bdd
                 */
                case "addHouse":
                    console.log("addhouse je suis dans la route");
                    house_controller_1.default.addHouse(city, ref, street, gps, roof, walls, history)
                        .catch((errorAddHouse) => { tryCatch(errorAddHouse); })
                        .then((resultAddHouse) => {
                        console.log(" dans le then du case addhouse");
                        res.json({ success: true, message: resultAddHouse });
                        console.log("res sucess : ", resultAddHouse);
                    });
                    break;
                /**
                 * to modify the information in the database and the meters a day
                 */
                case "updateHouse":
                    house_controller_1.default.updateHouse(inputName, inputValue, ref)
                        .catch((errorUpdateHouse) => { tryCatch(errorUpdateHouse); })
                        .then((resultUpdateHouse) => {
                        if (resultUpdateHouse) {
                            res.json({ success: true });
                        }
                    });
                    break;
                /**
                 * recover the houses with the information
                 */
                case "getHouse":
                    house_controller_1.default.getHouse(ref)
                        .catch((errorGetHouse) => { tryCatch(errorGetHouse); })
                        .then((resultGetHouse) => {
                        res.json({ house: resultGetHouse });
                    });
                    break;
                /**
                 * retrieve the list of houses with their contents
                 */
                case "getHouseList":
                    house_controller_1.default.getHouseList()
                        .catch((errorGetHouseList) => { tryCatch(errorGetHouseList); })
                        .then((resultGetHouseList) => {
                        res.json({ list: resultGetHouseList });
                    });
                    break;
                /**
                 * recover media associate at home
                 */
                case "getHouseMedia":
                    house_controller_1.default.getHouseMedia(ref)
                        .catch((errorGetHouseMedia) => { tryCatch(errorGetHouseMedia); })
                        .then((resultGetHouseMedia) => {
                        res.json({ list: resultGetHouseMedia });
                    });
                    break;
                /**
                 * update house coordinate
                 */
                case "updateHouseGps":
                    house_controller_1.default.updateHouseGps(ref, gps)
                        .catch((errorUpdateHouseGps) => { tryCatch(errorUpdateHouseGps); })
                        .then((resultUpdateHouseGps) => {
                        if (resultUpdateHouseGps) {
                            res.json({ success: true });
                        }
                    });
                    break;
                /**
                 * Delete house and his media
                 */
                case "deleteHouse":
                    house_controller_1.default.deleteHouse(ref)
                        .catch((errorDeleteHouse) => { tryCatch(errorDeleteHouse); })
                        .then((resultDeleteHouse) => {
                        if (resultDeleteHouse) {
                            res.json({ success: true });
                        }
                    });
                    break;
                /**
                 * Get house for search house
                 */
                case "searchHouseList":
                    house_controller_1.default.getSearchHouse(searchValue)
                        .catch((errorGetSearchHouse) => { tryCatch(errorGetSearchHouse); })
                        .then((resultGetSearchHouse) => {
                        res.json({ list: resultGetSearchHouse });
                    });
                    break;
            }
        });
    }
}
exports.default = new HouseRoute().getRouter();
//# sourceMappingURL=house.route.js.map