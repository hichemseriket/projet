"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../../../../config.json"));
const database_1 = __importDefault(require("../../../services/database"));
const logger_manager_1 = require("../../../services/logger-manager/logger-manager");
const upload_file_1 = require("../../../services/upload-file/upload-file");
class MediaMidware {
    constructor() {
        this.sizeLimit = config_json_1.default.uploadFile.maxSize * 1024 * 1024;
        this.mediaPath = config_json_1.default.uploadFile.mediaPath;
    }
    /**
     * Add media in database
     * @param ref: string
     * @param fileReader
     * @param category: string
     * @param mediaDate: string
     */
    addMedia(ref, fileReader, category, mediaDate) {
        return new Promise((resolve, reject) => {
            const uploadFileService = new upload_file_1.UploadFileService();
            database_1.default.dbOld.query("SELECT idHouse FROM houses WHERE ref = ?", [ref], (error, result) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    // TODO : ajouter la date d'ajout du média automatiquement
                    const houseId = result[0].idHouse;
                    const extentionFilename = uploadFileService.getExtentionFilename(fileReader.fileName);
                    this.setFileName(ref, mediaDate, category, houseId, extentionFilename).then((newFileName) => {
                        const uploadConfig = {
                            path: this.mediaPath + ref + "/",
                            controlFormat: ["image/jpeg", "image/png"],
                            controlMaxSize: this.sizeLimit
                        };
                        console.log("uploadconfig:" + uploadConfig);
                        uploadFileService.saveBlobFile(fileReader.fileBlob, newFileName, uploadConfig)
                            .catch((errorSave) => { reject(errorSave); })
                            .then((saved) => {
                            if (saved) {
                                const content = [[newFileName], [category], [mediaDate], [houseId]];
                                database_1.default.dbOld.query("INSERT INTO medias (fileName, category, mediaDate, houseId) VALUES (?, ?, ?, ?)", content, (err) => {
                                    console.log("content:" + content);
                                    if (err) {
                                        new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                                    }
                                    else {
                                        resolve(true);
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    }
    /**
     * Remove file media and into database
     * @param fileName: string
     * @param cb: return error, result
     */
    removeMedia(fileName) {
        console.log(fileName);
        return new Promise((resolve) => {
            const uploadFileService = new upload_file_1.UploadFileService();
            const ref = fileName.split("-")[0];
            const path = this.mediaPath + ref + "/" + fileName;
            database_1.default.dbOld.query("DELETE FROM medias WHERE fileName = ?", [fileName], (error) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    uploadFileService.removeFile(path);
                    resolve(true);
                }
            });
        });
    }
    // PRIVATE ===============================================================================
    setFileName(ref, mediaDate, category, houseId, extention) {
        return new Promise((resolve, reject) => {
            let randomInt = this.getRandomInt(100000);
            console.log(randomInt);
            mediaDate = mediaDate.replace(/\s+/g, "_");
            let newFilename = ref + "-" + mediaDate + "-" + category + "-" + randomInt + "." + extention;
            console.log("newfilename: " + newFilename);
            function isFilenameExist(filenameList) {
                let fileNameFounded = true;
                filenameList.forEach((filename, index) => {
                    if (filename === newFilename) {
                        randomInt++;
                        newFilename = ref + "-" + mediaDate + "-" + category + "-" + randomInt + "." + extention;
                        fileNameFounded = false;
                        isFilenameExist(filenameList);
                    }
                    if (fileNameFounded && filenameList.length === (index + 1)) {
                        resolve(newFilename);
                    }
                });
            }
            database_1.default.dbOld.query("SELECT COUNT(fileName) FROM medias WHERE houseId = ?", [houseId], (error, res) => {
                if (error) {
                    new logger_manager_1.LoggerManager().errorLogger("Sql error", error);
                }
                else {
                    if (res[0]["COUNT(fileName)"] === 0) {
                        newFilename = ref + "-" + mediaDate + "-" + category + "-" + "1" + "." + extention;
                        resolve(newFilename);
                    }
                    else {
                        database_1.default.dbOld.query("SELECT fileName FROM medias WHERE houseId = ?", [houseId], (err, response) => {
                            if (err) {
                                new logger_manager_1.LoggerManager().errorLogger("Sql error", err);
                            }
                            else {
                                console.log("filenameexist: " + isFilenameExist(response));
                                isFilenameExist(response);
                            }
                        });
                    }
                }
            });
        });
    }
    getRandomInt(max) {
        if (max > 0) {
            return Math.round(Math.random() * max);
        }
        else {
            new logger_manager_1.LoggerManager().errorLogger("getRandomInt value", "max value must be positiv");
            return 0;
        }
    }
}
exports.default = new MediaMidware();
//# sourceMappingURL=media.controller.js.map