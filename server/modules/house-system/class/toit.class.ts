import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { ToitEntity } from "../../../orm/entity/houses/toit.entity";

export class ToitClass {

    private id!: number;
    private type!: string;
    private description!: string;
    private idMedia!: number;

    constructor(id: number){
        this.setId(id);
    }

    public async create() {

    }

    public update(){

    }
    public delete(){

    }

    //===============================================
    // PRIVATE ======================================

    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            new LoggerManager().errorLogger("set Id failed", "Toit.id(" + value + ") must be greater than zero");
        }
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                ToitEntity.findOne(this.Id).then((toit) => {
                    if (toit) {
                    } else {
                        throw new LoggerManager().warnLogger("this roof doesn't exist", "Le toit demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    //===============================================
    // GETTER & SETTER ==============================

    get Id(): number { return this.id; }
    get Type(): string { return this.type;}
    get Description(): string { return this.description;}
    get IdMedia(): number { return this.idMedia;}

    set Type(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.type = value;
        } else {
            new LoggerManager().errorLogger("set Type failed", "Toit.type(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    set Description(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.description = value;
        } else {
            new LoggerManager().errorLogger("set Description failed", "Toit.description(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    set IdMedia(value: number) {
        if (value > 0) {
            this.idMedia = value;
        } else {
            new LoggerManager().errorLogger("set idMedia failed", "Toit.idMedia(" + value + ") must be greater than zero");
        }
    }
}