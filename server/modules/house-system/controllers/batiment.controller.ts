import { BatimentEntity } from "../../../orm/entity/houses/batiments.entity";
import { HistoireEntity } from "../../../orm/entity/houses/histoires.entity";
import { ParcelleEntity } from "../../../orm/entity/houses/parcelles.entity";
import MariaDb from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import { BatimentClass } from "../class/batiment.class";

interface ILatlng {
    lat: number | null;
    lng: number | null;
}

class BatimentController {

    public getBuildingList() {
        return new Promise(async (resolve) => {
            await BatimentEntity.find({relations: ["idParcelle", "idHistoire"]}).then((done) => {
                resolve(done);
            });
        });
    }

    public deleteBuilding(id: number) {
        return new Promise(async (resolve) => {
            const batiment = await new BatimentClass(id).create();
            batiment!.deleteFromDatabase().then((done) => {
                if (done) {
                    resolve(batiment);
                }
            });
        });
    }

    /**
     * Insert a new parcelle into the database
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    public addBuilding(city: string, street: string | null, gps: ILatlng) {
        return new Promise(async (resolve) => {
            const checked = this.checkData(city, street, gps);
            city = checked.city;
            street = checked.street;
            gps = checked.gps;

            console.log("ADDBATIMENT ======================= ", city, street, gps);

            MariaDb.connectDb().then(async () => {
                const newParcelle = await ParcelleEntity.create();
                if (newParcelle) {
                    newParcelle.city = city;
                    newParcelle.latitude = gps.lat;
                    newParcelle.longitude = gps.lng;
                    let i = 1;
                    newParcelle.parcelleRef = "parcelle_" + city + "_" + i;
                    const listParcelleRef = await ParcelleEntity.find({where: {city: newParcelle.city}});
                    for (const parcelleRef of listParcelleRef) {
                        if (newParcelle.parcelleRef === parcelleRef.parcelleRef) {
                            i++;
                            newParcelle.parcelleRef = city + "_" + i;
                        }
                    }
                    await newParcelle.save();
                    resolve(newParcelle);
                } else {
                    throw new LoggerManager().warnLogger("Can't add this house", "Impossible d'ajouter la maison");
                }
                    // newBuilding.save().then((res) => {
                    //     const newHistoire = new HistoireEntity();
                    //     newHistoire.description = "C'est une maison hantée et la demeure du célébre Jack L'Eventreur";
                    //     newHistoire.idHouse = [newBuilding];
                    //     newHistoire.save();
                    //     resolve(newBuilding);
                    // });

            });
        });
    }

    /**
     * Check all data are correct
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    private checkData(city: string, street: string | null, gps: ILatlng) {
        if (gps.lat === 0) {gps.lat = null; }
        if (gps.lng === 0) {gps.lng = null; }
        if (street === "" || street === undefined) {street = null; } else if (street !== null) {street = street.toLowerCase().trim(); }
        city = city.toLowerCase().trim();
        return ({city, street, gps});
    }
}

export default new BatimentController();
