import Test from "../common-modules/routes/test";
import GroupSystemesRoutes from "../modules/group-system/groupSystems.routes";
import HouseSystemesRoutes from "../modules/house-system/houseSystemes.routes";
import MediaSystemesRoutes from "../modules/media-system/mediaSystemes.routes";
import UserSystemesRoutes from "../modules/user-system/userSystemes.routes";

class Routes {

    constructor(private app: any) {
        this.routing();
        this.appRouting();
    }

    /**
     * Routing common
     */
    public routing() {
        this.app.use("/test", Test);
    }

    /**
     * Routing module
     */
    private appRouting() {
        const userSystemRoutes = new UserSystemesRoutes(this.app);
        const houseSystemRoutes = new HouseSystemesRoutes(this.app);
        const mediaSystemRoutes = new MediaSystemesRoutes(this.app);
        const groupSystemRoutes = new GroupSystemesRoutes(this.app);
    }

}

export default Routes;
