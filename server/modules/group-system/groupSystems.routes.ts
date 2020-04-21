import Admin from "./routes/admin.route";

class GroupSystemesRoutes {

    constructor(private app: any) {
        this.groupRouting();
    }

    /**
     * Routing to target
     */
    public groupRouting() {
        this.app.use("/group/admin", Admin);
    }
}

export default GroupSystemesRoutes;
