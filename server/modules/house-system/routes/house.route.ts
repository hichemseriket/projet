import express from "express";
import Mid from "../controllers/house.controller";

class HouseRoute {

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

            function tryCatch(err: any) {
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

            if (typeof gps === "string") {gps = JSON.parse(gps); }

            switch (action) {
                /**
                 * add house in bdd
                 */
                case"addHouse":
                    console.log("addhouse je suis dans la route");
                    Mid.addHouse(city, ref, street, gps, roof, walls, history)
                        .catch(
                            (errorAddHouse) => { tryCatch(errorAddHouse); })
                        .then ((resultAddHouse) => {
                            console.log(" dans le then du case addhouse");
                            res.json({success: true, message: resultAddHouse});
                            console.log("res sucess : ", resultAddHouse);
                        });
                    break;
                /**
                 * to modify the information in the database and the meters a day
                 */
                case "updateHouse":
                    Mid.updateHouse(inputName, inputValue, ref)
                        .catch(( errorUpdateHouse) => { tryCatch(errorUpdateHouse); })
                        .then((resultUpdateHouse) => {
                            if (resultUpdateHouse) {
                                res.json({success: true});
                            }
                        });
                    break;
                /**
                 * recover the houses with the information
                 */
                case "getHouse":
                    Mid.getHouse(ref)
                        .catch((errorGetHouse) => { tryCatch(errorGetHouse); })
                        .then((resultGetHouse) => {
                            res.json({house: resultGetHouse});
                        });
                    break;
                /**
                 * retrieve the list of houses with their contents
                 */
                case "getHouseList":
                    Mid.getHouseList()
                        .catch((errorGetHouseList) => { tryCatch(errorGetHouseList); })
                        .then((resultGetHouseList) => {
                            res.json({list: resultGetHouseList});
                        });
                    break;
                /**
                 * recover media associate at home
                 */
                case "getHouseMedia":
                    Mid.getHouseMedia(ref)
                        .catch((errorGetHouseMedia) => { tryCatch(errorGetHouseMedia); })
                        .then((resultGetHouseMedia) => {
                            res.json({list: resultGetHouseMedia});
                        });
                    break;

                /**
                 * update house coordinate
                 */
                case "updateHouseGps":
                    Mid.updateHouseGps(ref, gps)
                        .catch((errorUpdateHouseGps) => { tryCatch(errorUpdateHouseGps); })
                        .then((resultUpdateHouseGps) => {
                            if (resultUpdateHouseGps) {
                                res.json({success: true});
                            }
                        });
                    break;

                /**
                 * Delete house and his media
                 */
                case "deleteHouse":
                    Mid.deleteHouse(ref)
                        .catch((errorDeleteHouse) => { tryCatch(errorDeleteHouse); })
                        .then((resultDeleteHouse) => {
                            if (resultDeleteHouse) {
                                res.json({success: true});
                            }
                        });
                    break;

                /**
                 * Get house for search house
                 */
                case "searchHouseList":

                    Mid.getSearchHouse(searchValue)
                        .catch((errorGetSearchHouse) => { tryCatch(errorGetSearchHouse); })
                        .then((resultGetSearchHouse) => {
                            res.json({list: resultGetSearchHouse});
                        });
                    break;

            }
        });
    }
}

export default new HouseRoute().getRouter();
