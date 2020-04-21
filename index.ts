import {LoggerManager} from "./server/services/logger-manager/logger-manager";
import Server from "./server/services/server";

const host = process.env.HOST_EXPRESS;
const port = process.env.PORT_EXPRESS;

/**
 * Listening port of the server
 */
Server.app.listen(port, () => {
    new LoggerManager().infoLogger("App started", `This app running on ${host}:${port}`);
});
