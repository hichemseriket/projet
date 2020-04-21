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
const userInfo_entity_1 = require("./userInfo.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.mail = "anonymous";
        this.password = null;
        this.tempKey = null;
        this.registerDate = new Date();
        this.gcu = new Date();
        this.role = 2;
        this.activ = 2;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "mail", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "tempKey", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "registerDate", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "gcu", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "activ", void 0);
__decorate([
    typeorm_1.OneToOne((type) => userInfo_entity_1.UserInfoEntity, (info) => info.user),
    __metadata("design:type", userInfo_entity_1.UserInfoEntity)
], UserEntity.prototype, "info", void 0);
UserEntity = __decorate([
    typeorm_1.Entity("users")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map