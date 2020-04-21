import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { AutreEntity } from "../../../orm/entity/houses/autre.entity";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";

export class AutreClass {

    private id!: number;
    private portes!: boolean;
    private fenetres!: boolean;
    private volets!: boolean;
    private ferronneries!: boolean;
    private vitreries!: boolean;
    private assemblages!: boolean;
    private poele!: boolean;
    private kunst!: boolean;
    private vegetations!: boolean;

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
                const autre = await AutreEntity.findOne(this.id);
                if (autre) {
                    autre.id = this.Id;
                    autre.portes = this.Portes;
                    autre.fenetres = this.Fenetres;
                    autre.volets = this.Volets;
                    autre.ferronneries = this.Ferronneries;
                    autre.vitreries = this.Vitreries;
                    autre.assemblages = this.Assemblages;
                    autre.poele = this.Poele;
                    autre.kunst = this.Kunst;
                    autre.vegetations = this.Vegetations;
                    if(media){
                        autre.idMedia = media.idMedia;
                    }
                    await autre.save();
                    resolve(autre);
                } else {
                    throw new LoggerManager().warnLogger("this autre don't exist", "L'autre demander n'a pas été trouver");
                }
            });
        });
    }

    public deleteFromDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                console.log(this.id);
                const autre = await AutreEntity.findOne(this.id);
                if (autre) {
                    await autre.remove();
                    resolve(autre);
                } else {
                    throw new LoggerManager().warnLogger("this autre don't exist", "L'autre demander n'a pas été trouver");
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
            new LoggerManager().errorLogger("set Id failed", "Autre.id(" + value + ") must be greater than zero");
        }
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                AutreEntity.findOne(this.Id).then((autre) => {
                    if (autre) {
                        autre.id = this.Id;
                        autre.portes = this.portes;
                        autre.fenetres = this.fenetres;
                        autre.volets = this.volets;
                        autre.ferronneries = this.ferronneries;
                        autre.vitreries = this.vitreries;
                        autre.assemblages = this.assemblages;
                        autre.poele = this.poele;
                        autre.kunst = this.kunst;
                        autre.vegetations = this.vegetations;
                    } else {
                        throw new LoggerManager().warnLogger("this 'other' doesn't exist", "L'autre demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    //===============================================
    // GETTER & SETTER ==============================

    get Id(): number { return this.id; }
    get Portes(): boolean { return this.portes;}
    get Fenetres(): boolean { return this.fenetres;}
    get Volets(): boolean { return this.volets;}
    get Ferronneries(): boolean { return this.ferronneries;}
    get Vitreries(): boolean { return this.vitreries;}
    get Assemblages(): boolean { return this.assemblages;}
    get Poele(): boolean { return this.poele;}
    get Kunst(): boolean { return this.kunst;}
    get Vegetations(): boolean { return this.vegetations;}

    set Portes(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Portes failed", "Autre.portes(" + value + ") must be true or false");
        }
    }
    set Fenetres(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Fenetres failed", "Autre.fenetres(" + value + ") must be true or false");
        }
    }
    set Volets(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Volets failed", "Autre.volets(" + value + ") must be true or false");
        }
    }
    set Ferronneries(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Ferroneries failed", "Autre.ferronneries(" + value + ") must be true or false");
        }
    }
    set Vitreries(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Vitreries failed", "Autre.vitreries(" + value + ") must be true or false");
        }
    }
    set Assemblages(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Assemblages failed", "Autre.assemblages(" + value + ") must be true or false");
        }
    }
    set Poele(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Pöele failed", "Autre.poele(" + value + ") must be true or false");
        }
    }
    set Kunst(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Kunst failed", "Autre.kunst(" + value + ") must be true or false");
        }
    }
    set Vegetations(value: boolean) {
        if ( value == false  || value == true) {
            this.portes = value;
        } else {
            new LoggerManager().errorLogger("set Vegetations failed", "Autre.vegetations(" + value + ") must be true or false");
        }
    }
}