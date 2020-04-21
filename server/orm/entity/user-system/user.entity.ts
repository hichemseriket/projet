import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserInfoEntity} from "./userInfo.entity";

@Entity("users")
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: "varchar", length: 80, unique: true})
    public mail: string = "anonymous";

    @Column({type: "text", nullable: true})
    public password: string | null = null;

    @Column({type: "text", nullable: true})
    public tempKey: string | null = null;

    @Column({type: "datetime"})
    public registerDate: Date = new Date();

    @Column({type: "datetime"})
    public gcu: Date = new Date();

    @Column({type: "tinyint"})
    public role: number = 2;

    @Column({type: "tinyint"})
    public activ: number = 2;

    @OneToOne((type) => UserInfoEntity, (info) => info.user)
    public info!: UserInfoEntity;
}
