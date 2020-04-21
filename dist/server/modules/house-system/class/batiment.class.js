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
const medias_entity_1 = require("../../../orm/entity/houses/medias.entity");
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
class BatimentClass {
    constructor(id) {
        this.setId(id);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const autre = yield this.setAttribute();
            if (autre) {
                return this;
            }
        });
    }
    saveInDatabase() {
        return new Promise((resolve) => {
            database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
                const media = yield medias_entity_1.MediaEntity.findOne(1);
                const batiment = yield batiments_entity_1.BatimentEntity.findOne(this.id);
                if (batiment) {
                    batiment.idHouse = this.Id;
                    batiment.nom = this.Nom;
                    batiment.type = this.Type;
                    batiment.accepte = true;
                    batiment.miseAJour = true;
                    if (media) {
                        batiment.idMedia = media === null || media === void 0 ? void 0 : media.idMedia;
                    }
                    yield batiment.save();
                    resolve(batiment);
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
                const batiment = yield batiments_entity_1.BatimentEntity.findOne(this.id);
                if (batiment) {
                    yield batiment.remove();
                    resolve(batiment);
                }
                else {
                    throw new logger_manager_1.LoggerManager().warnLogger("this building doesn't exist", "Le bâtiment demander n'a pas été trouver");
                }
            }));
        });
    }
    review(validate) {
        // return new Promise((resolve) => {
        //     MariaDb.connectDb().then(async () => {
        //         const batiment = await BatimentEntity.findOne(this.id);
        //         if (batiment) {
        //             if (validate === true) {
        //                 batiment.accepte = true;
        //                 batiment.miseAJour = false;
        //                 await batiment.save();
        //                 resolve(batiment);
        //             } else {
        //                 // Cherche si il n'existe qu'une parcelle afin de supprimer le bâtiment et la parcelle ou seulement le bâtiment
        //                 const parcelle = await ParcelBatEntity.findOne({where: {idBatiment: this.id}});
        //                 if (parcelle) {
        //                     const parcCount = await ParcelBatEntity.count({where: {idParcelle: parcelle.idParcelle}});
        //                     if (parcCount === 1) {
        //                         const parcDelete = await ParcelleEntity.findOne({where: {id: parcelle.idParcelle}});
        //                         if (parcDelete) {
        //                             await parcDelete.remove();
        //                             resolve(parcDelete);
        //                         }
        //                     }
        //                     await batiment.remove();
        //                     resolve(batiment);
        //                     await parcelle.remove();
        //                     resolve(parcelle);
        //                 }
        //             }
        //         } else {
        //             throw new LoggerManager().warnLogger("this building don't exist", "Le bâtiment demander n'a pas été trouver");
        //         }
        //     });
        // });
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
                batiments_entity_1.BatimentEntity.findOne(this.Id).then((batiment) => {
                    if (batiment) {
                        batiment.idHouse = this.Id;
                        batiment.nom = this.Nom;
                        batiment.type = this.Type;
                        batiment.accepte = this.Accepte;
                        batiment.miseAJour = this.MisAJour;
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
    get Nom() { return this.nom; }
    set Nom(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.nom = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Type() { return this.type; }
    set Type(value) {
        if (value.length >= 2 && value.length <= 80) {
            this.type = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Type failed", "Batiment.type(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Accepte() { return this.accepte; }
    set Accepte(value) {
        if (!value || value) {
            this.accepte = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
    get MisAJour() { return this.misAJour; }
    set MisAJour(value) {
        if (!value || value) {
            this.accepte = value;
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
}
exports.BatimentClass = BatimentClass;
//# sourceMappingURL=batiment.class.js.map