import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import { HistoireEntity } from "../../../orm/entity/houses/histoires.entity";

export class HistoireClass {

    private id!: number;
    private description!: string;

    constructor(id: number){
        this.setId(id);
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
                HistoireEntity.findOne(this.Id).then((toit) => {
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
    get Description(): string { return this.description;}
    set Description(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.description = value;
        } else {
            new LoggerManager().errorLogger("set Description failed", "Toit.description(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
}
