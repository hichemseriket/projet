// import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
// import { MediaEntity } from "./medias.entity";
//
// @Entity("autre")
// export class AutreEntity extends BaseEntity {
//
//     @PrimaryGeneratedColumn()
//     public id!: number;
//
//     @Column({type: "boolean"})
//     public portes!: boolean;
//
//     @Column({type: "boolean"})
//     public fenetres!: boolean;
//
//     @Column({type: "boolean"})
//     public volets!: boolean;
//
//     @Column({type: "boolean"})
//     public ferronneries!: boolean;
//
//     @Column({type: "boolean"})
//     public vitreries!: boolean;
//
//     @Column({type: "boolean"})
//     public assemblages!: boolean;
//
//     @Column({type: "boolean"})
//     public poele!: boolean;
//
//     @Column({type: "boolean"})
//     public kunst!: boolean;
//
//     @Column({type: "boolean"})
//     public vegetations!: boolean;
//
//     @OneToOne((type) => MediaEntity, (media) => media.idMedia)
//     @JoinColumn()
//     public idMedia!: number;
//
// }
