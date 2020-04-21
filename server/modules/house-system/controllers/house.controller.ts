import fs from "fs";
import rimraf from "rimraf";
import {BatimentEntity} from "../../../orm/entity/houses/batiments.entity";
import {ParcelleEntity} from "../../../orm/entity/houses/parcelles.entity";
import Mysql from "../../../services/database";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";

interface ILatlng {
    lat: number | null;
    lng: number | null;
}

class HouseMidware {
    private lat!: number;
    private lng!: number;

    /**
     * Get a list of all media of house selected
     * @param ref: string
     */
    public getHouseMedia(ref) {
        return new Promise((resolve) => {
            Mysql.dbOld.query("SELECT * FROM medias m LEFT JOIN (SELECT ref, idHouse FROM houses) h ON m.houseId = h.idHouse WHERE h.ref = ?", [ref], (err, res) => {
                if (err) {
                    new LoggerManager().errorLogger("Sql error", err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * Get the complete list of house in database
     */
    public getHouseList() {
        return new Promise((resolve) => {
            Mysql.dbOld.query("SELECT h.ref, h.city, m.fileName FROM houses h LEFT JOIN (SELECT MIN(idMedia), fileName, houseId FROM medias GROUP BY houseId) AS m ON m.houseId = h.idHouse", (err, res) => {
                if (err) {
                    new LoggerManager().errorLogger("Sql error", err);
                } else {
                   resolve(res);
                }
            });
        });
    }

    /**
     * Gett all data from House in database
     * @param ref: string
     */
    public getHouse(ref) {
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

            Mysql.dbOld.query("SELECT * FROM houses WHERE ref = ?", [ref], (err, result) => {
                if (err) {
                    new LoggerManager().errorLogger("Sql error", err);
                } else {
                    resolve(result[0]);
                    console.log(result[0]);
                    // new LoggerManager().debugLogger(result[0]);
                    console.error(result[0]);
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

    public addHouse(city: string, ref: string, street: string | null, gps: ILatlng, roof: string, walls: string, history: string) {
        return new Promise((resolve) => {
            this.attributeReference(city, ref, street, gps)
                .then(() => {
                        this.insertHouseToDb(city, street, gps).then((result) => {
                            resolve(result);
                            console.log(result);
                            console.error(result);
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
    public updateHouse(inputName: string, inputValue: string, ref: string) {
        return new Promise((resolve) => {
            const content = [[inputName], [inputValue], [ref]];
            Mysql.dbOld.query("UPDATE houses SET ?? = ? WHERE ref = ?", content, (error, result) => {
                if (error) {
                    new LoggerManager().errorLogger("Sql error", error);
                } else {
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
    public updateHouseGps(ref: string, gps: ILatlng) {
        return new Promise((resolve) => {
            const content = [[gps.lat], [gps.lng], [ref]];
            Mysql.dbOld.query("UPDATE houses SET lat = ?, lng = ? WHERE ref = ?", content, (error, result) => {
                if (error) {
                    new LoggerManager().errorLogger("Sql error", error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Resolve a list of house in terms of search value
     * @param searchValue: string
     */
    public getSearchHouse(searchValue: string) {
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
                Mysql.dbOld.query("SELECT h.ref, h.city, m.fileName FROM houses h LEFT JOIN (SELECT MIN(idMedia), fileName, houseId FROM medias GROUP BY houseId) AS m ON m.houseId = h.idHouse WHERE city LIKE ? ORDER BY h.city", content, (err, res) => {
                    if (err) {
                        new LoggerManager().errorLogger("Sql error", err);
                    } else {
                        resolve(res);
                    }
                });
            } else {
                resolve([]);
            }
        });
    }

    /**
     * Delete house and his media
     * @param ref: string
     */
    public deleteHouse(ref: string) {
        return new Promise((resolve) => {
            const path = "./server/medias/" + ref + "/";
            if (fs.existsSync(path)) {
                rimraf(path, (er) => {
                    if (er) {
                        new LoggerManager().warnLogger("Folder not removed", er);
                    }
                });
            }
            Mysql.dbOld.query("SELECT idHouse FROM houses WHERE ref = ?", [ref], (error, result) => {
                if (error) {
                    new LoggerManager().errorLogger("Sql error", error);
                } else {
                    Mysql.dbOld.query("DELETE FROM medias WHERE houseId = ?", [result[0].idHouse], (erro, resu) => {
                        if (erro) {
                            new LoggerManager().errorLogger("Sql error", erro);
                        } else {
                            Mysql.dbOld.query("DELETE FROM houses WHERE ref = ?", [ref], (err, res) => {
                                if (err) {
                                    new LoggerManager().errorLogger("Sql error", err);
                                } else {
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
    private checkData(city: string, street: string | null, gps: ILatlng) {
        if (gps.lat === 0) {gps.lat = null; }
        if (gps.lng === 0) {gps.lng = null; }
        if (street === "" || street === undefined) {street = null; } else if (street !== null) {street = street.toLowerCase().trim(); }
        city = city.toLowerCase().trim();
        return ({city, street, gps});
    }

    /**
     * Insert to database a new house entry
     * @param city: string - Name of city
     * @param ref: string - Name city for ref house
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    private insertHouseToDb(city: string, street: string | null, gps: ILatlng) {
        return new Promise((resolve) => {
            const checked = this.checkData(city,  street, gps);
            city = checked.city;
            street = checked.street;
            this.lat = checked.gps.lat!;
            this.lng = checked.gps.lng!;

            console.log("cheked cheak : ", checked);

            MariaDb.connectDb().then(async () => {
                const newHouse = await BatimentEntity.create();
                console.log("construction de new hose : " , newHouse);
                if (newHouse) {
                    newHouse.city = city;
                    newHouse.street = street!;
                    newHouse.lat = this.lat;
                    newHouse.lng = this.lng;
                    let i = 1;
                    newHouse.ref = city + "_" + i;
                    const listHouseRef = await BatimentEntity.find({where: {city: newHouse.city}});
                    for (const houseRef of listHouseRef) {
                        if (newHouse.ref === houseRef.ref) {
                            i++;
                            newHouse.ref = city + "_" + i;
                        }
                    }
                    await newHouse.save();
                    resolve(newHouse);
                    console.log("house envoyer a la bdd: " , newHouse);
                } else {
                    throw new LoggerManager().warnLogger("Can't add this house", "Impossible d'ajouter la maison");
                }
            });
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
    private attributeReference(city: string, ref: string, street: string | null, gps: ILatlng) { // TODO : vérifier que la référence n'existe pas déjà
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const newHouse = await BatimentEntity.create();
                if (newHouse) {
                    newHouse.city = city;
                    newHouse.ref = ref;
                    newHouse.street = street!;
                    newHouse.lat = gps.lat!;
                    newHouse.lng = gps.lng!;
                    resolve(newHouse);
                    console.log("NeWHouse attribue reference", newHouse);
                }  else {
                    throw new LoggerManager().warnLogger("Can't create this house", "Impossible de créer la maison");
                }
            });

        });
    }

}

export default new HouseMidware();
