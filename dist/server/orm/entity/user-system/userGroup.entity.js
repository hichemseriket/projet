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
let UserGroupEntity = class UserGroupEntity extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.name = "anonymous group";
        this.suggest = false;
        this.validate = false;
        this.administrate = false;
    }
};
__decorate([
    typeorm_1.Column({ type: "varchar", length: 80, unique: true }),
    __metadata("design:type", String)
], UserGroupEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], UserGroupEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], UserGroupEntity.prototype, "suggest", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], UserGroupEntity.prototype, "validate", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], UserGroupEntity.prototype, "administrate", void 0);
__decorate([
    typeorm_1.OneToMany((type) => userInfo_entity_1.UserInfoEntity, (user) => user.group),
    __metadata("design:type", Array)
], UserGroupEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserGroupEntity.prototype, "id", void 0);
UserGroupEntity = __decorate([
    typeorm_1.Entity("user_group")
], UserGroupEntity);
exports.UserGroupEntity = UserGroupEntity;
//# sourceMappingURL=userGroup.entity.js.map