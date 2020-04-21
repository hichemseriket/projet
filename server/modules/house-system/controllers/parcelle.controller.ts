import { MediaEntity } from "../../../orm/entity/houses/medias.entity";
import { ParcelleEntity } from "../../../orm/entity/houses/parcelles.entity";
import MariaDb from "../../../services/database";
import { ParcelleClass } from "./../class/parcelle.class";

class ParcelleController {

    public getTerrainList() {
        return new Promise(async (resolve) => {
            const parcelles: ParcelleEntity[] = await ParcelleEntity.find();
            resolve(parcelles);
        });
    }

    public deleteTerrain(id: number) {
        return new Promise(async (resolve) => {
            const parcelle = await new ParcelleClass(id).create();
            parcelle!.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(parcelle);
                }
            });
        });
    }

    public addTerrain(numeroRue, nomRue, codePostal, latitude, longitude, delimitation, cour, revetementCour, vegetation, vacant, notes) {
        return new Promise(async (resolve) => {
            MariaDb.connectDb().then(() => {
                const newTerrain = new ParcelleEntity();
                // Il faudra bien penser au media
                const newMedia = new MediaEntity();
                newTerrain.numeroRue = numeroRue;
                newTerrain.nomRue = nomRue;
                newTerrain.latitude = latitude;
                newTerrain.longitude = longitude;
                // newTerrain.delimitation = delimitation;
                // newTerrain.cour = cour;
                // newTerrain.revetementCour = revetementCour;
                // newTerrain.vegetation = vegetation;
                // newTerrain.vacant = vacant;
                // newTerrain.notes = notes;
                newTerrain.idMedia = newMedia.idMedia;
                newTerrain.save().then((res) => {
                    resolve(newTerrain);
                });
            });
        });
    }
}

export default new ParcelleController();
