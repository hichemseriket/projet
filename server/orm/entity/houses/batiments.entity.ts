import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { HistoireEntity } from "./histoires.entity";
import { MediaEntity } from "./medias.entity";
import {MurEntity} from "./mur.entity";
import { ParcelleEntity } from "./parcelles.entity";
import {ToitEntity} from "./toit.entity";

@Entity("houses")
export class BatimentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public idHouse!: number;

    @Column({type: "varchar", length: 40, nullable: false, unique: true})
    public ref!: string;

    @Column({type: "varchar", length: 80, nullable: true})
    public nom!: string;

    @Column({type: "varchar", length: 255, nullable: true})
    public street!: string;

    @Column({type: "varchar", length: 80, nullable: true})
    public city!: string;

    @Column({type: "varchar", length: 80, nullable: true})
    public type!: string;

    @Column({type: "boolean", nullable: false, default: false })
    public accepte!: boolean;

    @Column({type: "boolean", nullable: false, default: false})
    public miseAJour!: boolean;

    @Column({type: "double", nullable: true})
    public lat!: number;

    @Column({type: "double", nullable: true})
    public lng!: number;

    @OneToOne((type) => MediaEntity, (media) => media.idMedia)
    @JoinColumn()
    public idMedia!: number;

    @ManyToMany((type) => ParcelleEntity, (terrain) => terrain.id)
    @JoinTable()
    public idParcelle!: ParcelleEntity[];

    @OneToOne((type) => HistoireEntity, (histoire) => histoire.idHouse) // specify inverse side as a second parameter
    @JoinTable()
    public idHistoire!: HistoireEntity[];

    @OneToOne((type) => MurEntity, (mur) => mur.idHouse) // specify inverse side as a second parameter
    @JoinTable()
    public idMur!: MurEntity[];

    @OneToOne((type) => ToitEntity, (toit) => toit.idHouse) // specify inverse side as a second parameter
    @JoinTable()
    public idToit!: ToitEntity[];
}
