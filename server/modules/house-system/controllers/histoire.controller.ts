import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { HistoireEntity } from "../../../orm/entity/houses/histoires.entity";
import { MediaEntity } from "../../../orm/entity/houses/medias.entity";
import MariaDb from "../../../services/database";

class HistoireController {

    public getAllHistory() {
        return new Promise(async (resolve) => {
            await HistoireEntity.find().then((yo) => {
                resolve(yo);
            });
        });
    }

    public addHistory(nom: string, type: string, description: string) {
        return new Promise(async (resolve) => {
            MariaDb.connectDb().then(() => {
                const newHistory = new HistoireEntity();
                // Il faudra bien penser au media
                const newMedia = new MediaEntity();
                const newHouse = new BatimentEntity();
                newHistory.description = description;
                newHistory.idHouse = [newHouse];
                newHistory.idMedia = [newMedia];
                newHistory.save().then((res) => {
                    resolve(newHistory);
                });
            });
        });
    }
}

export default new HistoireController();
