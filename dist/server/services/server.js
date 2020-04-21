"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_json_1 = __importDefault(require("../../config.json"));
const database_1 = __importDefault(require("./database"));
const logger_manager_1 = require("./logger-manager/logger-manager");
const routes_1 = __importDefault(require("./routes"));
/**
 * v 1.0.1
 */
class Server {
    constructor() {
        this.sizeLimit = config_json_1.default.uploadFile.maxSize + "mb";
        dotenv_1.default.config();
        let port = "";
        if (process.env.PORT_ANGULAR === "80") {
            port = "";
        }
        else if (process.env.PORT_ANGULAR) {
            port = ":" + process.env.PORT_ANGULAR;
        }
        this.urlOrigin = "http://" + process.env.HOST_ANGULAR + port;
        this.app = express_1.default();
        this.middleware();
        this.routes();
        this.initDatabase();
    }
    /**
     * Import the entitys for ts builder et
     */
    initDatabase() {
        database_1.default.connectDb().then(() => __awaiter(this, void 0, void 0, function* () {
            new logger_manager_1.LoggerManager().infoLogger("Database initialized", "");
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
        }));
    }
    /**
     * Set middleware app
     */
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(cors_1.default({
                // origin : "*",
                origin: this.urlOrigin,
                credentials: true
            }));
            this.app.use(body_parser_1.default.urlencoded({ extended: false }));
            this.app.use(body_parser_1.default.json({ limit: this.sizeLimit }));
            this.app.use("/media", express_1.default.static("public/medias"));
            this.app.use("/apk", express_1.default.static("server/apk"));
        });
    }
    /**
     * Set common-modules app
     */
    routes() {
        return new routes_1.default(this.app);
    }
}
exports.default = new Server();
//# sourceMappingURL=server.js.map