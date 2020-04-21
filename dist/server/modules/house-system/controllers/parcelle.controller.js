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
const parcelle_class_1 = require("./../class/parcelle.class");
class ParcelleController {
    getTerrainList() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const parcelles = yield parcelles_entity_1.ParcelleEntity.find();
            resolve(parcelles);
        }));
    }
    deleteTerrain(id) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const parcelle = yield new parcelle_class_1.ParcelleClass(id).create();
            parcelle.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(parcelle);
                }
            });
        }));
    }
    addTerrain(numeroRue, nomRue, codePostal, latitude, longitude, delimitation, cour, revetementCour, vegetation, vacant, notes) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            database_1.default.connectDb().then(() => {
                const newTerrain = new parcelles_entity_1.ParcelleEntity();
                // Il faudra bien penser au media
                const newMedia = new medias_entity_1.MediaEntity();
                newTerrain.numeroRue = numeroRue;
                newTerrain.nomRue = nomRue;
                newTerrain.latitude = latitude;
                newTerrain.longitude = longitude;
                // newTerrain.delimitation = delimitation;
                // newTerrain.cour = cour;
                // newTerrain.revetementCour = revetementCour;
                // newTerrain.vegetation = vegetation;
                // newTerrain.vacant = vacant;
                // newTerrain.notes = notes;
                newTerrain.idMedia = newMedia.idMedia;
                newTerrain.save().then((res) => {
                    resolve(newTerrain);
                });
            });
        }));
    }
}
exports.default = new ParcelleController();
//# sourceMappingURL=parcelle.controller.js.map