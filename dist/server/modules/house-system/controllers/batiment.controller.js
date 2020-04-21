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
const batiments_entity_1 = require("../../../orm/entity/houses/batiments.entity");
const parcelles_entity_1 = require("../../../orm/entity/houses/parcelles.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const batiment_class_1 = require("../class/batiment.class");
class BatimentController {
    getBuildingList() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield batiments_entity_1.BatimentEntity.find({ relations: ["idParcelle", "idHistoire"] }).then((done) => {
                resolve(done);
            });
        }));
    }
    deleteBuilding(id) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const batiment = yield new batiment_class_1.BatimentClass(id).create();
            batiment.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(batiment);
                }
            });
        }));
    }
    /**
     * Insert a new parcelle into the database
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    addBuilding(city, street, gps) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const checked = this.checkData(city, street, gps);
            city = checked.city;
            street = checked.street;
            gps = checked.gps;
            console.log("ADDBATIMENT ======================= ", city, street, gps);
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const newParcelle = yield parcelles_entity_1.ParcelleEntity.create();
                if (newParcelle) {
                    newParcelle.city = city;
                    newParcelle.latitude = gps.lat;
                    newParcelle.longitude = gps.lng;
                    let i = 1;
                    newParcelle.parcelleRef = "parcelle_" + city + "_" + i;
                    const listParcelleRef = yield parcelles_entity_1.ParcelleEntity.find({ where: { city: newParcelle.city } });
                    for (const parcelleRef of listParcelleRef) {
                        if (newParcelle.parcelleRef === parcelleRef.parcelleRef) {
                            i++;
                            newParcelle.parcelleRef = city + "_" + i;
                        }
                    }
                    yield newParcelle.save();
                    resolve(newParcelle);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("Can't add this house", "Impossible d'ajouter la maison");
                }
                // newBuilding.save().then((res) => {
                //     const newHistoire = new HistoireEntity();
                //     newHistoire.description = "C'est une maison hantée et la demeure du célébre Jack L'Eventreur";
                //     newHistoire.idHouse = [newBuilding];
                //     newHistoire.save();
                //     resolve(newBuilding);
                // });
            }));
        }));
    }
    /**
     * Check all data are correct
     * @param city: string - Name of city
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
}
exports.default = new BatimentController();
//# sourceMappingURL=batiment.controller.js.map