import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { BatimentEntity } from "./batiments.entity";
import { MediaEntity } from "./medias.entity";

@Entity("parcelle")
export class ParcelleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: "varchar", length: 80, nullable: true})
    public parcelleRef!: string;

    @Column({type: "varchar", length: 80})
    public numeroRue!: string;

    @Column({type: "varchar", length: 80})
    public nomRue!: string;

    @Column({type: "varchar", length: 80})
    public city!: string;

    @Column({type: "double"})
    public latitude!: number | null;

    @Column({type: "double"})
    public longitude!: number | null;

    // @Column({type: "varchar", length: 80, nullable: true})
    // public delimitation!: string;
    //
    // @Column({type: "boolean", nullable: true})
    // public cour!: boolean;
    //
    // @Column({type: "varchar", length: 80, nullable: true})
    // public revetementCour!: string;
    //
    // @Column({type: "varchar", length: 80, nullable: true})
    // public vegetation!: string;
    //
    // @Column({type: "boolean", nullable: true})
    // public vacant!: boolean;
    //
    // @Column({type: "varchar", length: 255, nullable: true})
    // public notes!: string;

    @OneToMany((type) => MediaEntity, (media) => media.idMedia)
    public idMedia!: number;

    @ManyToMany((type) => BatimentEntity, (building) => building.idHouse)
    @JoinColumn()
    public idBatiment!: BatimentEntity[];
}
