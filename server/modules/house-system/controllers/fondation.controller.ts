import Bcrypt from "bcrypt";
import randomstring from "randomstring";
import {ItemType, TUserInfo} from "../../../../core/user-system/IUser";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {IMailModel} from "../../../services/mailer/IMailModel";
import Mailer from "../../../services/mailer/mailer";
import { FondationClass } from "../class/fondation.class";
import { FondationEntity } from "../../../orm/entity/houses/fondation.entity";
import MariaDb from "../../../services/database";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";

class FondationController {

    /**
     * Get all data of user's id
     * @param id
     */
    public getFondation(id: number) {
        return new Promise(async (resolve: (value: FondationClass) => void, reject) => {
            const Fondation = await new FondationClass(id).create() as FondationClass;
            if (Fondation) {
                resolve(Fondation);
            }
        });
    }

    public deleteFondation(id: number) {
        return new Promise(async (resolve) => {
            const Fondation = await new FondationClass(id).create();
            Fondation!.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(Fondation);
                }
            });
        });
    }

    public addFondation(charpente: string, structure:string, niveau:number, cave: boolean, comble: boolean, desc: string) {
        return new Promise(async (resolve) => {
            MariaDb.connectDb().then(() => {
                const newFondation = new FondationEntity();
                //Il faudra bien penser au media
                const newMedia = new MediaEntity();
                newFondation.typeFermesCharpente = charpente;
                newFondation.typeStructure = structure;
                newFondation.nombreNiveau = niveau;
                newFondation.cave = cave;
                newFondation.combleAmenages = comble;
                newFondation.description = desc;
                newFondation.idMedia = newMedia;
                newFondation.save().then((res) => {
                    resolve(newFondation);
                });
            });
        });
    }
}

export default new FondationController();