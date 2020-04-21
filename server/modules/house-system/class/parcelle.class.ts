import { MediaEntity } from "../../../orm/entity/houses/medias.entity";
import { ParcelleEntity } from "../../../orm/entity/houses/parcelles.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";

export class ParcelleClass {

    private id!: number;
    private numeroRue!: string;
    private nomRue!: string;
    private latitude!: number;
    private longitude!: number;
    private delimitation!: string;
    private cour!: boolean;
    private revetementCour!: string;
    private vegetation!: string;
    private vacant!: boolean;
    private notes!: string;

    constructor(id: number) {
        this.setId(id);
    }

    public async create() {
        const parcelle = await this.setAttribute();
        if (parcelle) { return this; }
    }

    public saveInDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                const media = await MediaEntity.findOne(1);
                const parcelle = await ParcelleEntity.findOne(this.id);
                if (parcelle) {
                    parcelle.id = this.Id;
                    parcelle.numeroRue = this.NumeroRue;
                    parcelle.nomRue = this.NomRue;
                    parcelle.latitude = this.Latitidue;
                    parcelle.longitude = this.Longitude;
                    // parcelle.delimitation = this.Delimitation;
                    // parcelle.cour = this.Cour;
                    // parcelle.revetementCour = this.RevetementCour;
                    // parcelle.vegetation = this.Vegetation;
                    // parcelle.vacant = this.Vacant;
                    // parcelle.notes = this.Notes;

                    await parcelle.save();
                    resolve(parcelle);
                } else {
                    throw new LoggerManager().warnLogger("this building don't exist", "Le bâtiment demander n'a pas été trouver");
                }
            });
        });
    }

    public deleteFromDatabase() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(async () => {
                console.log(this.id);
                const parcelle = await ParcelleEntity.findOne(this.id);
                if (parcelle) {
                    await parcelle.remove();
                    resolve(parcelle);
                } else {
                    throw new LoggerManager().warnLogger("this building doesn't exist", "Le bâtiment demander n'a pas été trouver");
                }
            });
        });
    }

    // ===============================================
    // PRIVATE ======================================

    private setId(value: number) {
        if (value > 0 ) {
            this.id = value;
        } else {
            new LoggerManager().errorLogger("set Id failed", "User.id(" + value + ") must be greater than zero");
        }
    }

    private setAttribute() {
        return new Promise((resolve) => {
            MariaDb.connectDb().then(() => {
                ParcelleEntity.findOne(this.Id).then((parcelle) => {
                    if (parcelle) {
                        parcelle.id = this.Id;
                        parcelle.numeroRue = this.NumeroRue;
                        parcelle.nomRue = this.NomRue;
                        parcelle.latitude = this.Latitidue;
                        parcelle.longitude = this.Longitude;
                        // parcelle.delimitation = this.Delimitation;
                        // parcelle.cour = this.Cour;
                        // parcelle.revetementCour = this.RevetementCour;
                        // parcelle.vegetation = this.Vegetation;
                        // parcelle.vacant = this.Vacant;
                        // parcelle.notes = this.Notes;
                    } else {
                        throw new LoggerManager().warnLogger("this 'other' doesn't exist", "L'autre demandé n'a pas été trouver");
                    }
                });
            });
        });
    }

    // ===============================================
    // GETTER & SETTER ==============================

    get Id(): number { return this.id; }
    get NumeroRue(): string { return this.numeroRue; }
    set NumeroRue(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.numeroRue = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get NomRue(): string { return this. nomRue; }
    set NomRue(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.nomRue = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Latitidue(): number { return this.latitude; }
    set Latitude(value: number) {
        if ( !value ) {
            this.latitude = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Longitude(): number { return this.longitude; }
    set Longitude(value: number) {
        if ( !value ) {
            this.longitude = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Delimitation(): string { return this.delimitation; }
    set Delimitation(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.delimitation = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Cour(): boolean { return this.cour; }
    set Cour(value: boolean) {
        if ( value === false || value === true ) {
            this.cour = value;
        } else {
            new LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
    get RevetementCour(): string { return this.revetementCour; }
    set RevetementCour(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.revetementCour = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Vegetation(): string { return this.vegetation; }
    set Vegetation(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.vegetation = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Vacant(): boolean { return this.vacant; }
    set Vacant(value: boolean) {
        if ( value === false || value === true ) {
            this.vacant = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Notes(): string { return this.notes; }
    set Notes(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.notes = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
}
