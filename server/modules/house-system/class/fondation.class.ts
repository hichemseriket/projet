import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { FondationEntity } from "../../../orm/entity/houses/fondation.entity";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";

export class FondationClass {

    private id!: number;
    private typeCharpente!: string;
    private typeStructure!: string;
    private nombreNiveau!: number;
    private cave!: boolean;
    private comble!: boolean;
    private description!: string;

    constructor(id: number){
        this.setId(id);
    }

    public async create() {
        const autre = await this.setAttribute();
        if (autre) { return this; }
    }

    public saveInDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const media = await MediaEntity.findOne(1);
                const fondation = await FondationEntity.findOne(this.id);
                if (fondation) {
                    fondation.id = this.Id;
                    fondation.typeFermesCharpente = this.TypeCharpente;
                    fondation.typeStructure = this.TypeStructure;
                    fondation.nombreNiveau = this.NombreNiveau;
                    fondation.cave = this.Cave;
                    fondation.combleAmenages = this.Comble;
                    fondation.description = this.Description;
                    if(media){
                        fondation.idMedia = media.idMedia;
                    }
                    await fondation.save();
                    resolve(fondation);
                } else {
                    throw new LoggerManager().warnLogger("this fondation don't exist", "La fondation demander n'a pas été trouver");
                }
            });
        });
    }

    public deleteFromDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                console.log(this.id);
                const fondation = await FondationEntity.findOne(this.id);
                if (fondation) {
                    await fondation.remove();
                    resolve(fondation);
                } else {
                    throw new LoggerManager().warnLogger("this fondation don't exist", "La fondation n'a pas été trouver");
                }
            });
        });
    }


    //===============================================
    // PRIVATE ======================================

    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            new LoggerManager().errorLogger("set Id failed", "Fondation.id(" + value + ") must be greater than zero");
        }
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                FondationEntity.findOne(this.Id).then((fondation) => {
                    if (fondation) {
                    } else {
                        throw new LoggerManager().warnLogger("this fondation doesn't exist", "La fondation demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    //===============================================
    // GETTER & SETTER ==============================

    get Id(): number { return this.id; }
    get TypeCharpente(): string { return this.typeCharpente;}
    get TypeStructure(): string { return this.typeStructure;}
    get NombreNiveau(): number { return this.nombreNiveau;}
    get Cave(): boolean { return this.cave;}
    get Comble(): boolean { return this.comble;}
    get Description(): string { return this.description;}

    set TypeCharpente(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.typeCharpente = value;
        } else {
            new LoggerManager().errorLogger("set TypeCharpente failed", "Fondation.typeCharpente(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    set TypeStructure(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.typeCharpente = value;
        } else {
            new LoggerManager().errorLogger("set TypeStructure failed", "Fondation.typeStructure(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    set NombreNiveau(value: number){
        this.nombreNiveau = value
    }
    set Cave(value: boolean) {
        if ( value == false  || value == true) {
            this.cave = value;
        } else {
            new LoggerManager().errorLogger("set Cave failed", "Fondation.cave(" + value + ") must be true or false");
        }
    }
    set Comble(value: boolean) {
        if ( value == false  || value == true) {
            this.comble = value;
        } else {
            new LoggerManager().errorLogger("set Comble failed", "Fondation.comble(" + value + ") must be true or false");
        }
    }
    set Description(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.description = value;
        } else {
            new LoggerManager().errorLogger("set Description failed", "Fondation.description(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
}