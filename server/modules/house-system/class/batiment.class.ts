import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";

export class BatimentClass {

    private id!: number;
    private nom!: string;
    private type!: string;
    private accepte!: boolean;
    private misAJour!: boolean;

    constructor(id: number) {
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
                const batiment = await BatimentEntity.findOne(this.id);
                if (batiment) {
                    batiment.idHouse = this.Id;
                    batiment.nom = this.Nom;
                    batiment.type = this.Type;
                    batiment.accepte = true;
                    batiment.miseAJour = true;
                    if (media) {
                        batiment.idMedia = media?.idMedia;
                    }
                    await batiment.save();
                    resolve(batiment);
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
                const batiment = await BatimentEntity.findOne(this.id);
                if (batiment) {
                    await batiment.remove();
                    resolve(batiment);
                } else {
                    throw new LoggerManager().warnLogger("this building doesn't exist", "Le bâtiment demander n'a pas été trouver");
                }
            });
        });
    }

    public review(validate: boolean) {
        // return new Promise((resolve) => {
        //     MariaDb.connectDb().then(async () => {
        //         const batiment = await BatimentEntity.findOne(this.id);
        //         if (batiment) {
        //             if (validate === true) {
        //                 batiment.accepte = true;
        //                 batiment.miseAJour = false;
        //                 await batiment.save();
        //                 resolve(batiment);
        //             } else {
        //                 // Cherche si il n'existe qu'une parcelle afin de supprimer le bâtiment et la parcelle ou seulement le bâtiment
        //                 const parcelle = await ParcelBatEntity.findOne({where: {idBatiment: this.id}});
        //                 if (parcelle) {
        //                     const parcCount = await ParcelBatEntity.count({where: {idParcelle: parcelle.idParcelle}});
        //                     if (parcCount === 1) {
        //                         const parcDelete = await ParcelleEntity.findOne({where: {id: parcelle.idParcelle}});
        //                         if (parcDelete) {
        //                             await parcDelete.remove();
        //                             resolve(parcDelete);
        //                         }
        //                     }
        //                     await batiment.remove();
        //                     resolve(batiment);
        //                     await parcelle.remove();
        //                     resolve(parcelle);
        //                 }
        //             }
        //         } else {
        //             throw new LoggerManager().warnLogger("this building don't exist", "Le bâtiment demander n'a pas été trouver");
        //         }
        //     });
        // });
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
                BatimentEntity.findOne(this.Id).then((batiment) => {
                    if (batiment) {
                        batiment.idHouse = this.Id;
                        batiment.nom = this.Nom;
                        batiment.type = this.Type;
                        batiment.accepte = this.Accepte;
                        batiment.miseAJour = this.MisAJour;
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
    get Nom(): string { return this.nom; }
    set Nom(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.nom = value;
        } else {
            new LoggerManager().errorLogger("set Name failed", "Batiment.nom(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Type(): string { return this.type; }
    set Type(value: string) {
        if ( value.length >= 2 && value.length <= 80 ) {
            this.type = value;
        } else {
            new LoggerManager().errorLogger("set Type failed", "Batiment.type(" + value + ") must be greater size than or equal to two and less than or equal to 80");
        }
    }
    get Accepte(): boolean { return this.accepte; }
    set Accepte(value: boolean) {
        if ( !value || value ) {
            this.accepte = value;
        } else {
            new LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
    get MisAJour(): boolean { return this.misAJour; }
    set MisAJour(value: boolean) {
        if ( !value || value ) {
            this.accepte = value;
        } else {
            new LoggerManager().errorLogger("set Accepte failed", "Batiment.accepte(" + value + ") must be either false or true");
        }
    }
}
