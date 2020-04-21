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
const histoires_entity_1 = require("../../../orm/entity/houses/histoires.entity");
const medias_entity_1 = require("../../../orm/entity/houses/medias.entity");
const database_1 = __importDefault(require("../../../services/database"));
class HistoireController {
    getAllHistory() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield histoires_entity_1.HistoireEntity.find().then((yo) => {
                resolve(yo);
            });
        }));
    }
    addHistory(nom, type, description) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            database_1.default.connectDb().then(() => {
                const newHistory = new histoires_entity_1.HistoireEntity();
                // Il faudra bien penser au media
                const newMedia = new medias_entity_1.MediaEntity();
                const newHouse = new batiments_entity_1.BatimentEntity();
                newHistory.description = description;
                newHistory.idHouse = [newHouse];
                newHistory.idMedia = [newMedia];
                newHistory.save().then((res) => {
                    resolve(newHistory);
                });
            });
        }));
    }
}
exports.default = new HistoireController();
//# sourceMappingURL=histoire.controller.js.map