import {
    BaseEntity,
    Column,
    Entity,
    JoinTable, ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { BatimentEntity } from "./batiments.entity";
import { MediaEntity } from "./medias.entity";

@Entity("histoire")
export class HistoireEntity extends BaseEntity {

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
