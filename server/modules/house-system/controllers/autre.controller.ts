import Bcrypt from "bcrypt";
import randomstring from "randomstring";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {IMailModel} from "../../../services/mailer/IMailModel";
import Mailer from "../../../services/mailer/mailer";
import { AutreClass } from "../class/autre.class";
import { AutreEntity } from "../../../orm/entity/houses/autre.entity";
import MariaDb from "../../../services/database";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";

class AutreController {

    /**
     * Get all data of user's id
     * @param id
     */
    public getAutre(id: number) {
        return new Promise(async (resolve: (value: AutreClass) => void, reject) => {
            const Autre = await new AutreClass(id).create() as AutreClass;
            if (Autre) {
                resolve(Autre);
            }
        });
    }

    public deleteAutre(id: number) {
        return new Promise(async (resolve) => {
            const Autre = await new AutreClass(id).create();
            Autre!.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(Autre);
                }
            });
        });
    }

    public addAutre(porte: boolean, fenetre: boolean, volet: boolean, fer: boolean, vitre: boolean, assemblage: boolean, poele: boolean, kunst: boolean, vege: boolean) {
        return new Promise(async (resolve) => {
            MariaDb.connectDb().then(() => {
                const newAutre = new AutreEntity();
                //Il faudra bien penser au media
                const newMedia = new MediaEntity();
                newAutre.portes = porte;
                newAutre.fenetres = fenetre;
                newAutre.volets = volet;
                newAutre.ferronneries = fer;
                newAutre.vitreries = vitre;
                newAutre.assemblages = assemblage;
                newAutre.poele = poele;
                newAutre.kunst = kunst;
                newAutre.vegetations = vege;
                newAutre.idMedia = newMedia.idMedia;
                newAutre.save().then((res) => {
                    resolve(newAutre);
                });
            });
        });
    }
}

export default new AutreController();