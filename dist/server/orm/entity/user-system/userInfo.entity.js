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
const user_entity_1 = require("./user.entity");
const userGroup_entity_1 = require("./userGroup.entity");
let UserInfoEntity = class UserInfoEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne((type) => userGroup_entity_1.UserGroupEntity, (group) => group.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", userGroup_entity_1.UserGroupEntity)
], UserInfoEntity.prototype, "group", void 0);
__decorate([
    typeorm_1.OneToOne((type) => user_entity_1.UserEntity, (user) => user.info),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.UserEntity)
], UserInfoEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserInfoEntity.prototype, "id", void 0);
UserInfoEntity = __decorate([
    typeorm_1.Entity("users_info")
], UserInfoEntity);
exports.UserInfoEntity = UserInfoEntity;
//# sourceMappingURL=userInfo.entity.js.map