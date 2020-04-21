"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const batiments_entity_1 = require("./batiments.entity");
const medias_entity_1 = require("./medias.entity");
let HistoireEntity = class HistoireEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], HistoireEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], HistoireEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => batiments_entity_1.BatimentEntity, (building) => building.idHouse),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], HistoireEntity.prototype, "idHouse", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => medias_entity_1.MediaEntity, (media) => media.idMedia),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], HistoireEntity.prototype, "idMedia", void 0);
HistoireEntity = __decorate([
    typeorm_1.Entity("histoire")
], HistoireEntity);
exports.HistoireEntity = HistoireEntity;
//# sourceMappingURL=histoires.entity.js.map