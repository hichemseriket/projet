import {BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BatimentEntity} from "./batiments.entity";
import {MediaEntity} from "./medias.entity";

@Entity( "toit")
export class ToitEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public idToit!: number;

    @Column({type: "text"})
    public description!: string;

    @ManyToMany((type) => BatimentEntity, (batiment) => batiment.idHouse)
    @JoinTable()
    public idHouse!: BatimentEntity[];

    @ManyToMany((type) => MediaEntity, (media) => media.idMedia)
    @JoinTable()
    public idMedia!: MediaEntity[];

    // @Column({type: "varchar" , length: 80})
    // public typeVersant!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public pignonAvant!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public pignonArriere!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public anglePente!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public couverture!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public etatCouverture!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public typeTuiles!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public typePoseTuiles!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public couleurTuiles!: string;
    //
    // @Column({type: "boolean"})
    // public VernieTuile!: boolean;
    //
    // @Column({type: "varchar" , length: 80})
    // public lucarne!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public soucheCheminee!: string;
    //
    // @Column({type: "boolean"})
    // public Auvent!: boolean;
    //
    // @Column({type: "varchar" , length: 80})
    // public typeTuileAuvent!: string;
    //
    // @Column({type: "varchar" , length: 80})
    // public typePoseTuileAuvent!: string;
    //
    // @Column({type: "varchar", length: 255})
    // public description!: string;
    //
    // @OneToOne((media) => MediaEntity, (media) => media.idMedia)
    // @JoinTable()
    // public idMedia!: number;
}
