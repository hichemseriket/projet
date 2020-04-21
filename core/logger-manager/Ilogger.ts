export type TLogger = "debug" | "info" | "warn" | "error" | "fatal" | "trace";

export interface ILogger {
    logLevel: TLogger;
    logCode: string;
    logMsg: string;
}
