import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import config from "../../config.json";
import {UserEntity} from "../orm/entity/user-system/user.entity";
import {UserGroupEntity} from "../orm/entity/user-system/userGroup.entity";
import {UserInfoEntity} from "../orm/entity/user-system/userInfo.entity";
import MariaDb from "./database";
import {LoggerManager} from "./logger-manager/logger-manager";
import Routes from "./routes";

/**
 * v 1.0.1
 */
class Server {

    public app: express.Application;
    private urlOrigin;
    private sizeLimit = config.uploadFile.maxSize + "mb";

    constructor() {
        dotenv.config();
        let port = "";
        if (process.env.PORT_ANGULAR === "80") { port = ""; } else if (process.env.PORT_ANGULAR) { port = ":" + process.env.PORT_ANGULAR; }
        this.urlOrigin = "http://" + process.env.HOST_ANGULAR + port;
        this.app = express();
        this.middleware();
        this.routes();
        this.initDatabase();
    }

    /**
     * Import the entitys for ts builder et
     */
    public initDatabase() {
        MariaDb.connectDb().then(async () => {
            new LoggerManager().infoLogger("Database initialized", "");
            // const group = new UserGroupEntity();
            // group.name = "2er group";
            // group.description = "Petite description d'un autre groupe";
            // group.save();

            // const user = new UserEntity();
            // user.mail = "antschw@hotmail4.com";
            // await user.save().catch((error) => {
            //     console.log("code: ", error.code);
            //     console.log("message: ", error.message);
            // });
            // //
            // const userInfo = new UserInfoEntity();
            // userInfo.lastName = "schwartz";
            // userInfo.user = user;
            // await userInfo.save();

            // const user1: UserEntity | undefined = await UserEntity.findOne(1, {relations: ["info"]});
            // console.log(user1);

            // const users: UserEntity[] = await UserEntity
            //     .createQueryBuilder("users")
            //     .leftJoinAndSelect("users.info", "info")
            //     .leftJoinAndSelect("info.group", "group")
            //     .getMany();
            // console.log(users);
        });
    }

    /**
     * Set middleware app
     */
    private async middleware() {
        this.app.use(cors({
            // origin : "*",
            origin: this.urlOrigin, // TODO : rendre l'origine avec et sans le www
            credentials: true
        }));
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: this.sizeLimit}));
        this.app.use("/media", express.static("public/medias"));
        this.app.use("/apk", express.static("server/apk"));
    }

    /**
     * Set common-modules app
     */
    private routes() {
        return new Routes(this.app);
    }

}

export default new Server();
