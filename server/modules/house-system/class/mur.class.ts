import { MurEntity } from "../../../orm/entity/houses/mur.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";

export class MurClass {

    private id!: number;
    private maconnerieNiveau!: string;
    private maconnerieType!: string;
    private maconnerieLiant!: string;
    private pierreDeTaille!: boolean;
    private pDTSoubassement!: string;
    private pDTChainage!: string;
    private pDB!: string;
    private niveauPDB!: string;
    private essence!: string;
    private typeRemplissage!: string;
    private encorbellement!: boolean;
    private galerie!: boolean;
    private dispoOuverture!: string;
    private encadrement!: string;
    private enduit!: string;
    private decor!: string;
    private symbole!: string;
    private description!: string;

    constructor(id: number){
        this.setId(id);
    }

    public async create() {

    }

    public update(){

    }
    public delete(){

    }

    // ===============================================
    // PRIVATE ======================================

    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            new LoggerManager().errorLogger("set Id failed", "Mur.id(" + value + ") must be greater than zero");
        }
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                MurEntity.findOne(this.Id).then((mur) => {
                    if (mur) {
                    } else {
                        throw new LoggerManager().warnLogger("this wall doesn't exist", "Le mur demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    // ===============================================
    // GETTER & SETTER ==============================

    get Id(): number { return this.id; }
    get MaconnerieNiveau(): string { return this.maconnerieNiveau;}
    get MaconnerieType(): string { return this.maconnerieType;}
    get Description(): string { return this.description;}

    set Description(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.description = value;
        } else {
            new LoggerManager().errorLogger("set Description failed", "Mur.description(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
}
