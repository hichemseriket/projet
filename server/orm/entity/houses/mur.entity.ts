import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {BatimentEntity} from "./batiments.entity";
import {MediaEntity} from "./medias.entity";

@Entity("mur")
export class MurEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: "text"})
    public description!: string;

    @ManyToMany((type) => BatimentEntity, (building) => building.idHouse)
    @JoinTable()
    public idHouse!: BatimentEntity[];

    @ManyToMany((type) => MediaEntity, (media) => media.idMedia)
    @JoinTable()
    public idMedia!: MediaEntity[];

}

    // @Column({type: "varchar" , length: 80})
    // public maconnerieNiveau!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public maconnerieType!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public maconnerieLiant!: string;
    //
    // @Column({type: "boolean"})
    // public pierreDeTaille!: boolean;
    //
    // @Column({type: "varchar" , length: 80})
    // public pDTSoubassement!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public pDTChainage!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public panDeBois!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public niveauPDB!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public essenceBois!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public typeRemplissage!: string;

    // @Column({type: "boolean"})
    // public encorbellement!: boolean;
    //
    // @Column({type: "boolean"})
    // public galerie!: boolean;
    //
    // @Column({type: "varchar" , length: 80})
    // public dispoOuverture!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public encadrement!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public enduits!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public decors!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public symboles!: string;
