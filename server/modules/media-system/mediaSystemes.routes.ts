import Media from "./routes/media.route";

class HouseSystemesRoutes {

    constructor(private app: any) {
        this.routing();
    }

    /**
     * Routing to target requested
     */
    public routing() {
        this.app.use("/media", Media);
    }

}

export default HouseSystemesRoutes;
