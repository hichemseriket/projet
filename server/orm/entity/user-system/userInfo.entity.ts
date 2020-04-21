import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {UserGroupEntity} from "./userGroup.entity";

@Entity("users_info")
export class UserInfoEntity extends BaseEntity {

    @ManyToOne((type) => UserGroupEntity, (group) => group.user)
    @JoinColumn()
    public group!: UserGroupEntity;

    @OneToOne((type) => UserEntity, (user) => user.info)
    @JoinColumn()
    public user!: UserEntity;

    @Column({type: "varchar", length: 80, nullable: true})
    public lastName!: string;

    @Column({type: "varchar", length: 80,  nullable: true})
    public firstName!: string;

    @PrimaryGeneratedColumn()
    private id!: number;
}
