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
const histoires_entity_1 = require("./histoires.entity");
const medias_entity_1 = require("./medias.entity");
const mur_entity_1 = require("./mur.entity");
const parcelles_entity_1 = require("./parcelles.entity");
const toit_entity_1 = require("./toit.entity");
let BatimentEntity = class BatimentEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BatimentEntity.prototype, "idHouse", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 40, nullable: false, unique: true }),
    __metadata("design:type", String)
], BatimentEntity.prototype, "ref", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], BatimentEntity.prototype, "nom", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], BatimentEntity.prototype, "street", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], BatimentEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], BatimentEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", nullable: false, default: false }),
    __metadata("design:type", Boolean)
], BatimentEntity.prototype, "accepte", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", nullable: false, default: false }),
    __metadata("design:type", Boolean)
], BatimentEntity.prototype, "miseAJour", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], BatimentEntity.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], BatimentEntity.prototype, "lng", void 0);
__decorate([
    typeorm_1.OneToOne((type) => medias_entity_1.MediaEntity, (media) => media.idMedia),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], BatimentEntity.prototype, "idMedia", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => parcelles_entity_1.ParcelleEntity, (terrain) => terrain.id),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BatimentEntity.prototype, "idParcelle", void 0);
__decorate([
    typeorm_1.OneToOne((type) => histoires_entity_1.HistoireEntity, (histoire) => histoire.idHouse) // specify inverse side as a second parameter
    ,
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BatimentEntity.prototype, "idHistoire", void 0);
__decorate([
    typeorm_1.OneToOne((type) => mur_entity_1.MurEntity, (mur) => mur.idHouse) // specify inverse side as a second parameter
    ,
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BatimentEntity.prototype, "idMur", void 0);
__decorate([
    typeorm_1.OneToOne((type) => toit_entity_1.ToitEntity, (toit) => toit.idHouse) // specify inverse side as a second parameter
    ,
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BatimentEntity.prototype, "idToit", void 0);
BatimentEntity = __decorate([
    typeorm_1.Entity("houses")
], BatimentEntity);
exports.BatimentEntity = BatimentEntity;
//# sourceMappingURL=batiments.entity.js.map