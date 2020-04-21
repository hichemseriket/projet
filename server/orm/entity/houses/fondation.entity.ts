// import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
// import { MediaEntity } from "./medias.entity";
//
// @Entity( "fondation")
// export class FondationEntity extends BaseEntity {
//
//     @PrimaryGeneratedColumn()
//     public id!: number;
//
//     @Column({type: "varchar" , length: 255})
//     public typeFermesCharpente!: string;
//
//     @Column({type: "varchar" , length: 80})
//     public typeStructure!: string;
//
//     @Column({type: "tinyint"})
//     public nombreNiveau!: number;
//
//     @Column({type: "bool"})
//     public cave!: boolean;
//
//     @Column({type: "bool"})
//     public combleAmenages!: boolean;
//
//     @Column({type: "varchar", length: 255 })
//     public description!: string;
//
//     @OneToOne((type) => MediaEntity, (media) => media.idMedia)
//     @JoinColumn()
//     public idMedia!: number;
//
// }
