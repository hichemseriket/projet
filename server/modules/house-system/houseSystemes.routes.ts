import Batiment from "./routes/batiment.route";
import Histoire from "./routes/histoire.route";
import House from "./routes/house.route";
import Parcelle from "./routes/parcelle.route";

class HouseSystemesRoutes {

    constructor(private app: any) {
        this.routing();
    }

    /**
     * Routing to target requested
     */
    public routing() {
        this.app.use("/house", House);
        this.app.use("/building", Batiment);
        this.app.use("/terrain", Parcelle);
        this.app.use("/histoire", Histoire);
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

}

export default HouseSystemesRoutes;
