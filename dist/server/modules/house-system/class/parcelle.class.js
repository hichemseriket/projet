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
const medias_entity_1 = require("../../../orm/entity/houses/medias.entity");
const parcelles_entity_1 = require("../../../orm/entity/houses/parcelles.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
class ParcelleClass {
    constructor(id) {
        this.setId(id);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const parcelle = yield this.setAttribute();
            if (parcelle) {
                return this;
            }
        });
    }
    saveInDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const media = yield medias_entity_1.MediaEntity.findOne(1);
                const parcelle = yield parcelles_entity_1.ParcelleEntity.findOne(this.id);
                if (parcelle) {
                    parcelle.id = this.Id;
                    parcelle.numeroRue = this.NumeroRue;
                    parcelle.nomRue = this.NomRue;
                    parcelle.latitude = this.Latitidue;
                    parcelle.longitude = this.Longitude;
                    // parcelle.delimitation = this.Delimitation;
                    // parcelle.cour = this.Cour;
                    // parcelle.revetementCour = this.RevetementCour;
                    // parcelle.vegetation = this.Vegetation;
                    // parcelle.vacant = this.Vacant;
                    // parcelle.notes = this.Notes;
                    yield parcelle.save();
                    resolve(parcelle);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this building don't exist", "Le bâtiment demander n'a pas été trouver");
                }
            }));
        });
    }
    deleteFromDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(this.id);
                const parcelle = yield parcelles_entity_1.ParcelleEntity.findOne(this.id);
                if (parcelle) {
                    yield parcelle.remove();
                    resolve(parcelle);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this building doesn't exist", "Le bâtiment demander n'a pas été trouver");
                }
            }));
        });
    }
    // ===============================================
    // PRIVATE ======================================
    setId(value) {
        if (value > 0) {
            this.id = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Id failed", "User.id(" + value + ") must be greater than zero");
        }
    }
    setAttribute() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => {
                parcelles_entity_1.ParcelleEntity.findOne(this.Id).then((parcelle) => {
                    if (parcelle) {
                        parcelle.id = this.Id;
                        parcelle.numeroRue = this.NumeroRue;
                        parcelle.nomRue = this.NomRue;
                        parcelle.latitude = this.Latitidue;
                        parcelle.longitude = this.Longitude;
                        // parcelle.delimitation = this.Delimitation;
                        // parcelle.cour = this.Cour;
                        // parcelle.revetementCour = this.RevetementCour;
                        // parcelle.vegetation = this.Vegetation;
                        // parcelle.vacant = this.Vacant;
                        // parcelle.notes = this.Notes;
                    }
                    else {
                        throw new logger_manager_1.LoggerManager().warnLogger("this 'other' doesn't exist", "L'autre demandé n'a pas été trouver");
                    }
                });
            });
        });
    }
    // ===============================================
    // GETTER & SETTER ==============================
    get Id() { return this.id; }
    get NumeroRue() { return this.numeroRue; }
    set NumeroRue(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.numeroRue = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get NomRue() { return this.nomRue; }
    set NomRue(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.nomRue = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Latitidue() { return this.latitude; }
    set Latitude(value) {
        if (!value) {
            this.latitude = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Longitude() { return this.longitude; }
    set Longitude(value) {
        if (!value) {
            this.longitude = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Delimitation() { return this.delimitation; }
    set Delimitation(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.delimitation = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Cour() { return this.cour; }
    set Cour(value) {
        if (value === false || value === true) {
            this.cour = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
    get RevetementCour() { return this.revetementCour; }
    set RevetementCour(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.revetementCour = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Vegetation() { return this.vegetation; }
    set Vegetation(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.vegetation = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Vacant() { return this.vacant; }
    set Vacant(value) {
        if (value === false || value === true) {
            this.vacant = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Notes() { return this.notes; }
    set Notes(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.notes = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
}
exports.ParcelleClass = ParcelleClass;
//# sourceMappingURL=parcelle.class.js.map