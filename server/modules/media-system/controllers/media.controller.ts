import config from "../../../../config.json";
import Mysql from "../../../services/database";
import {LoggerManager} from "../../../services/logger-manager/logger-manager";
import {IUploadFileOption, UploadFileService} from "../../../services/upload-file/upload-file";

class MediaMidware {

    private sizeLimit = config.uploadFile.maxSize * 1024 * 1024;
    private mediaPath = config.uploadFile.mediaPath;

    /**
     * Add media in database
     * @param ref: string
     * @param fileReader
     * @param category: string
     * @param mediaDate: string
     */
    public addMedia(ref: string, fileReader: { fileName: string; fileBlob: string }, category: string, mediaDate: string) {
        return new Promise((resolve, reject) => {
            const uploadFileService = new UploadFileService();
            Mysql.dbOld.query("SELECT idHouse FROM houses WHERE ref = ?", [ref], (error, result) => {
                if (error) {
                    new LoggerManager().errorLogger("Sql error", error);
                } else {
                    // TODO : ajouter la date d'ajout du média automatiquement
                    const houseId = result[0].idHouse;
                    const extentionFilename = uploadFileService.getExtentionFilename(fileReader.fileName);
                    this.setFileName(ref, mediaDate, category, houseId, extentionFilename).then((newFileName) => {

                        const uploadConfig: IUploadFileOption =   {
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
                                    Mysql.dbOld.query("INSERT INTO medias (fileName, category, mediaDate, houseId) VALUES (?, ?, ?, ?)", content, (err) => {
                                        console.log("content:" + content);
                                        if (err) {
                                            new LoggerManager().errorLogger("Sql error", err);
                                        } else {
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
    public removeMedia(fileName: string) {
        console.log(fileName);
        return new Promise((resolve) => {
            const uploadFileService = new UploadFileService();
            const ref = fileName.split("-")[0];
            const path = this.mediaPath + ref + "/" + fileName;
            Mysql.dbOld.query("DELETE FROM medias WHERE fileName = ?", [fileName], (error) => {
                if (error) {
                    new LoggerManager().errorLogger("Sql error", error);
                } else {
                    uploadFileService.removeFile(path);
                    resolve(true);
                }
            });
        });
    }

    // PRIVATE ===============================================================================

    private setFileName(ref: string, mediaDate: string, category: string, houseId: number, extention: string) {
        return new Promise<string>((resolve, reject) => {

            let randomInt = this.getRandomInt(100000);
            console.log(randomInt);
            mediaDate = mediaDate.replace(/\s+/g, "_");
            let newFilename = ref + "-" + mediaDate + "-" + category + "-" + randomInt + "." + extention;
            console.log("newfilename: " + newFilename);

            function isFilenameExist(filenameList: string[]) {
                let fileNameFounded = true;
                filenameList.forEach((filename, index) => {
                    if (filename === newFilename) {
                        randomInt ++;
                        newFilename = ref + "-" + mediaDate + "-" + category + "-" + randomInt + "." + extention;
                        fileNameFounded = false;
                        isFilenameExist(filenameList);
                    }
                    if (fileNameFounded && filenameList.length === (index + 1)) {
                        resolve(newFilename);
                    }
                });
            }
            Mysql.dbOld.query("SELECT COUNT(fileName) FROM medias WHERE houseId = ?", [houseId], (error, res) => {
                if (error) { new LoggerManager().errorLogger("Sql error", error); } else {
                    if (res[0]["COUNT(fileName)"] === 0) {
                        newFilename = ref + "-" + mediaDate + "-" + category + "-" + "1" + "." + extention;
                        resolve(newFilename);
                    } else {
                        Mysql.dbOld.query("SELECT fileName FROM medias WHERE houseId = ?", [houseId], (err, response) => {
                            if (err) { new LoggerManager().errorLogger("Sql error", err); } else {
                                console.log("filenameexist: " + isFilenameExist(response));
                                isFilenameExist(response);
                            }
                        });
                    }
                }
            });
        });
    }

    private getRandomInt(max: number) {
        if (max > 0) {
            return Math.round(Math.random() * max);
        } else {
            new LoggerManager().errorLogger("getRandomInt value", "max value must be positiv");
            return 0;
        }
    }

}

export default new MediaMidware();
