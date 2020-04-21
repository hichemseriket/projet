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
let ParcelleEntity = class ParcelleEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ParcelleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], ParcelleEntity.prototype, "parcelleRef", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80 }),
    __metadata("design:type", String)
], ParcelleEntity.prototype, "numeroRue", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80 }),
    __metadata("design:type", String)
], ParcelleEntity.prototype, "nomRue", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80 }),
    __metadata("design:type", String)
], ParcelleEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ type: "double" }),
    __metadata("design:type", Object)
], ParcelleEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({ type: "double" }),
    __metadata("design:type", Object)
], ParcelleEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.OneToMany((type) => medias_entity_1.MediaEntity, (media) => media.idMedia),
    __metadata("design:type", Number)
], ParcelleEntity.prototype, "idMedia", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => batiments_entity_1.BatimentEntity, (building) => building.idHouse),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ParcelleEntity.prototype, "idBatiment", void 0);
ParcelleEntity = __decorate([
    typeorm_1.Entity("parcelle")
], ParcelleEntity);
exports.ParcelleEntity = ParcelleEntity;
//# sourceMappingURL=parcelles.entity.js.map