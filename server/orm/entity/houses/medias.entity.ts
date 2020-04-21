import {BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { BatimentEntity } from "./batiments.entity";

@Entity("medias")
export class MediaEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public idMedia!: number;

    @Column({type: "varchar", length: 80, nullable: false})
    public fileName!: Date;

    @Column({type: "varchar", length: 80 , nullable: false})
    public mediaDate!: string;

    @Column({type: "varchar", length: 80, nullable: false})
    public category!: string;

    @Column({type: "int", nullable: false})
    public houseId!: number;
}
