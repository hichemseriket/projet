"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const rimraf_1 = __importDefault(require("rimraf"));
const batiments_entity_1 = require("../../../orm/entity/houses/batiments.entity");
const database_1 = __importDefault(require("../../../services/database"));
const database_2 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
class HouseMidware {
    /**
     * Get a list of all media of house selected
     * @param ref: string
     */
    getHouseMedia(ref) {
        return new Promise((resolve) => {
            database_1.default.dbOld.query("SELECT * FROM medias m LEFT JOIN (SELECT ref, idHouse FROM houses) h ON m.houseId = h.idHouse WHERE h.ref = ?", [ref], (err, res) => {
                if (err) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    /**
     * Get the complete list of house in database
     */
    getHouseList() {
        return new Promise((resolve) => {
            database_1.default.dbOld.query("SELECT h.ref, h.city, m.fileName FROM houses h LEFT JOIN (SELECT MIN(idMedia), fileName, houseId FROM medias GROUP BY houseId) AS m ON m.houseId = h.idHouse", (err, res) => {
                if (err) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    /**
     * Gett all data from House in database
     * @param ref: string
     */
    getHouse(ref) {
        return new Promise((resolve) => {
            // MariaDb.connectDb().then(async () => {
            //     BatimentEntity.findOne({where: {city: ref.city}}).then((selectedHouse) => {
            //         if (selectedHouse) {
            //             console.log(selectedHouse);
            //             resolve(selectedHouse);
            //         } else {
            //             throw new LoggerManager().warnLogger("Can't select this house", "Impossible d'accéder à cette maison");
            //         }
            //     });
            // });
            database_1.default.dbOld.query("SELECT * FROM houses WHERE ref = ?", [ref], (err, result) => {
                if (err) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    /**
     * Add function for adding a house on database
     * @param city: string - Name of city
     * @param ref: string - Name of city for ref house
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     * @param lat: number
     * @param lng: number
     * @param roof: string - House's roof
     * @param walls: string - House's walls
     * @param history: string - House's history
     */
    addHouse(city, ref, street, gps, roof, walls, history) {
        return new Promise((resolve) => {
            this.attributeReference(city, ref, street, gps)
                .then(() => {
                this.insertHouseToDb(city, street, gps).then((result) => {
                    resolve(result);
                });
            });
        });
    }
    /**
     * Update a input value in database of house selected
     * @param inputName: string
     * @param inputValue: string
     * @param ref: string
     */
    updateHouse(inputName, inputValue, ref) {
        return new Promise((resolve) => {
            const content = [[inputName], [inputValue], [ref]];
            database_1.default.dbOld.query("UPDATE houses SET ?? = ? WHERE ref = ?", content, (error, result) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    /**
     * Update coordoninate in database of house selected
     * @param ref: string
     * @param gps: Ilatlng - {lat, lng}
     */
    updateHouseGps(ref, gps) {
        return new Promise((resolve) => {
            const content = [[gps.lat], [gps.lng], [ref]];
            database_1.default.dbOld.query("UPDATE houses SET lat = ?, lng = ? WHERE ref = ?", content, (error, result) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    /**
     * Resolve a list of house in terms of search value
     * @param searchValue: string
     */
    getSearchHouse(searchValue) {
        return new Promise((resolve) => {
            if (searchValue !== "") {
                // MariaDb.connectDb().then(async () => {
                //     BatimentEntity.findOne({where: {name: searchValue}}).then((selectedHouse) => {
                //         if (selectedHouse) {
                //             console.log("selected" + selectedHouse.city);
                //             resolve(selectedHouse);
                //         } else {
                //             throw new LoggerManager().warnLogger("Can't access to this house", "Impossible d'accèder à la maison");
                //         }
                //     });
                // });
                const content = [searchValue + "%"];
                database_1.default.dbOld.query("SELECT h.ref, h.city, m.fileName FROM houses h LEFT JOIN (SELECT MIN(idMedia), fileName, houseId FROM medias GROUP BY houseId) AS m ON m.houseId = h.idHouse WHERE city LIKE ? ORDER BY h.city", content, (err, res) => {
                    if (err) {
                        new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }
            else {
                resolve([]);
            }
        });
    }
    /**
     * Delete house and his media
     * @param ref: string
     */
    deleteHouse(ref) {
        return new Promise((resolve) => {
            const path = "./server/medias/" + ref + "/";
            if (fs_1.default.existsSync(path)) {
                rimraf_1.default(path, (er) => {
                    if (er) {
                        new logger_manager_1.LoggerManager().warnLogger("Folder not removed", er);
                    }
                });
            }
            database_1.default.dbOld.query("SELECT idHouse FROM houses WHERE ref = ?", [ref], (error, result) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    database_1.default.dbOld.query("DELETE FROM medias WHERE houseId = ?", [result[0].idHouse], (erro, resu) => {
                        if (erro) {
                            new logger_manager_1.LoggerManager().errorLogger("Sql error", erro);
                        }
                        else {
                            database_1.default.dbOld.query("DELETE FROM houses WHERE ref = ?", [ref], (err, res) => {
                                if (err) {
                                    new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    /**
     * Check all data are correct
     * @param city: string - Name of city
     * @param ref: string
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    checkData(city, street, gps) {
        if (gps.lat === 0) {
            gps.lat = null;
        }
        if (gps.lng === 0) {
            gps.lng = null;
        }
        if (street === "" || street === undefined) {
            street = null;
        }
        else if (street !== null) {
            street = street.toLowerCase().trim();
        }
        city = city.toLowerCase().trim();
        return ({ city, street, gps });
    }
    /**
     * Insert to database a new house entry
     * @param city: string - Name of city
     * @param ref: string - Name city for ref house
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    insertHouseToDb(city, street, gps) {
        return new Promise((resolve) => {
            const checked = this.checkData(city, street, gps);
            city = checked.city;
            street = checked.street;
            this.lat = checked.gps.lat;
            this.lng = checked.gps.lng;
            console.log("cheked cheak : ", checked);
            database_2.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const newHouse = yield batiments_entity_1.BatimentEntity.create();
                console.log("construction de new hose : ", newHouse);
                if (newHouse) {
                    newHouse.city = city;
                    newHouse.street = street;
                    newHouse.lat = this.lat;
                    newHouse.lng = this.lng;
                    let i = 1;
                    newHouse.ref = city + "_" + i;
                    const listHouseRef = yield batiments_entity_1.BatimentEntity.find({ where: { city: newHouse.city } });
                    for (const houseRef of listHouseRef) {
                        if (newHouse.ref === houseRef.ref) {
                            i++;
                            newHouse.ref = city + "_" + i;
                        }
                    }
                    yield newHouse.save();
                    resolve(newHouse);
                    console.log("house envoyer a la bdd: ", newHouse);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("Can't add this house", "Impossible d'ajouter la maison");
                }
            }));
        });
    }
    /**
     * Generate a unique reference
     * @param city: string - Name of city
     * @param ref: string - Name of ref to city for house
     * @param street: string - Name of the street
     * @param gps: ILatlng- latitude coordonées
     * @param lng: number - longitude coordonées
     */
    attributeReference(city, ref, street, gps) {
        return new Promise((resolve) => {
            database_2.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const newHouse = yield batiments_entity_1.BatimentEntity.create();
                if (newHouse) {
                    newHouse.city = city;
                    newHouse.ref = ref;
                    newHouse.street = street;
                    newHouse.lat = gps.lat;
                    newHouse.lng = gps.lng;
                    resolve(newHouse);
                    console.log("NeWHouse attribue reference", newHouse);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("Can't create this house", "Impossible de créer la maison");
                }
            }));
        });
    }
}
exports.default = new HouseMidware();
//# sourceMappingURL=house.controller.js.map