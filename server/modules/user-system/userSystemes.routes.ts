import Admin from "./routes/admin.route";
import Guest from "./routes/guest.route";
import Root from "./routes/root.route";
import User from "./routes/user.route";

class UserSystemesRoutes {

    constructor(private app: any) {
        this.routing();
    }

    /**
     * Routing to target requested
     */
    public routing() {
        this.app.use("/guest", Guest);
        this.app.use("/user", User);
        this.app.use("/user/admin", Admin);
        this.app.use("/user/root", Root);
    }

}

export default UserSystemesRoutes;
