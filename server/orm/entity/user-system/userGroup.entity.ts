import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserInfoEntity} from "./userInfo.entity";

@Entity("user_group")
export class UserGroupEntity extends BaseEntity {

    @Column({type: "varchar", length: 80, unique: true})
    public name: string = "anonymous group";

    @Column({type: "text", nullable: true})
    public description: string | undefined;

    @Column("boolean")
    public suggest: boolean = false;

    @Column("boolean")
    public validate: boolean = false;

    @Column("boolean")
    public administrate: boolean = false;

    @OneToMany((type) => UserInfoEntity, (user) => user.group)
    public user!: UserInfoEntity[];

    @PrimaryGeneratedColumn()
    public id!: number;
}
