"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_image_size_1 = __importDefault(require("buffer-image-size"));
require("foreach-end");
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const logger_manager_1 = require("../logger-manager/logger-manager");
/**
 * v 1.3.2
 */
class UploadFileService {
    constructor() {
    }
    /**
     * Save a blob to file in destination folder.
     * @param blobFile [string]
     * @param filename [string]
     * @param option [IUploadFileOption] :
     * {
     *      path: "./path/directory/",
     *      controlFormat: ["image/jpeg", "image/png"],
     *      controlMaxSize: 5 * 1024 * 1024 // 5 Mb
     * }
     */
    saveBlobFile(blobFile, filename, option) {
        return new Promise((resolve, reject) => {
            let path = "./";
            if (option) {
                path = option.path;
            }
            this.decodeBlob(blobFile, option)
                .catch((error) => { reject(error); })
                .then((fileBuffer) => {
                this.saveFile(fileBuffer, filename, path)
                    .then(() => {
                    resolve(true);
                });
            });
        });
    }
    /**
     * Get size of image
     * @param pathFile: string
     */
    getSizeImage(pathFile) {
        return new Promise((resolve, reject) => {
            const { promisify } = require("util");
            const imgSizeOf = promisify(require("image-size"));
            imgSizeOf(pathFile)
                .catch((err) => {
                reject(new logger_manager_1.LoggerManager().warnLogger("upload-file > getSizeImage()", err));
            })
                .then((dimensions) => {
                resolve({ width: dimensions.width, height: dimensions.height });
            });
        });
    }
    /**
     * Remove a file
     * @param path [string] - "./path/directory/file.ext"
     */
    removeFile(path) {
        try {
            fs_1.default.unlinkSync(path);
        }
        catch (err) {
            new logger_manager_1.LoggerManager().warnLogger("upload-file > getSizeImage()", err);
        }
    }
    /**
     * If file exists
     * @param path [string] - "./path/directory/file.ext"
     */
    isFileExists(path) {
        return fs_1.default.existsSync(path);
    }
    getExtentionFilename(filename) {
        const extention = filename.split(".");
        return extention[extention.length - 1];
    }
    // PRIVATE =============================================================
    /**
     * Make a check serie in terms of option will be entered. Resolve if all are ok or reject error.
     * @param {string}              blobFile
     * @param {IUploadFileOption}   option
     */
    controlBlob(blobFile, option) {
        return new Promise((resolve, reject) => {
            let nbOption = 0;
            let nbOptionValidate = 0;
            // check file path
            if (option.path) {
                nbOption++;
                this.isFilePathExists(option.path)
                    .then((res) => {
                    if (res) {
                        nextStep();
                    }
                });
            }
            // check file format
            if (option.controlFormat) {
                nbOption++;
                this.isFileTypeValidate(blobFile, option.controlFormat)
                    .catch((error) => { reject(error); })
                    .then((res) => {
                    if (res) {
                        nextStep();
                    }
                });
            }
            // check max size file
            if (option.controlMaxSize) {
                nbOption++;
                this.isFileSizeValidate(blobFile, option.controlMaxSize)
                    .catch((error) => { reject(error); })
                    .then((res) => {
                    if (res) {
                        nextStep();
                    }
                });
            }
            function nextStep() {
                nbOptionValidate++;
                if (nbOption === nbOptionValidate) {
                    resolve();
                }
            }
        });
    }
    /**
     * Check the path, create folder if not exists. Resolve when task ended
     * @param {string} pathFile - path where file will be save. Without filename.
     */
    isFilePathExists(pathFile) {
        return new Promise((resolve) => {
            const folders = pathFile.split("/");
            folders.splice(-1, 1);
            let path = "";
            folders.forEachEnd((folder, done) => {
                path += folder + "/";
                if (!fs_1.default.existsSync(path)) {
                    fs_1.default.mkdirSync(path);
                }
                done();
            }, () => {
                resolve(true);
            });
        });
    }
    /**
     * Check file format. Resolve if true or reject error if false
     * @param {string}                          blobFile
     * @param {TFileFormat | TFileFormat[]}     wantedType
     */
    isFileTypeValidate(blobFile, wantedType) {
        return new Promise((resolve, reject) => {
            let validated = false;
            let fileType = blobFile.split(",")[0];
            fileType = fileType.split(":")[1].split(";")[0];
            function checkType(wType, index) {
                if (fileType === wType) {
                    validated = true;
                    resolve(true);
                }
                else {
                    if (!validated && (index + 1 === wantedType.length)) {
                        reject(new logger_manager_1.LoggerManager().warnLogger("upload-file > isFileTypeValidate() > Type_not_valide", "Le format [" + fileType + "] du fichier n'est pas valide. Les formats autorisés sont: " + wantedType));
                    }
                }
            }
            wantedType.forEach((type, index) => {
                checkType(type, index);
            });
        });
    }
    /**
     * Check max file's size. Resolve if less or reject error if more
     * @param {string} blobFile
     * @param {number} maxSize - in byte
     */
    isFileSizeValidate(blobFile, maxSize) {
        return new Promise((resolve, reject) => {
            const fileBuffer = Buffer.from(blobFile, "base64");
            const bufferSize = fileBuffer.byteLength;
            const convertMaxSize = maxSize >= (1024 * 1024 * 1024) ? Math.round(maxSize / 1024 / 1024 / 1024) + "Go" : maxSize >= (1024 * 1024) ? Math.round(maxSize / 1024 / 1024) + "Mo" : maxSize >= (1024) ? Math.round(maxSize / 1024) + "Ko" : (maxSize) + "o";
            if (bufferSize > maxSize) {
                reject(new logger_manager_1.LoggerManager().warnLogger("upload-file > isFileSizeValidate() > Size_to_big", "Le fichier est trop lourd. La taille maximum d'un fichier peut avoir: " + convertMaxSize));
            }
            else {
                resolve(true);
            }
        });
    }
    /**
     * Control and decode blob to buffer file. Resolve bufferFile if all are ok or reject error
     * @param {string}              blobFile
     * @param {IUploadFileOption}   option
     */
    decodeBlob(blobFile, option) {
        return new Promise((resolve, reject) => {
            if (option) {
                this.controlBlob(blobFile, option)
                    .catch((error) => { reject(error); })
                    .then(() => {
                    blobFile = blobFile.split(",")[1];
                    resolve(Buffer.from(blobFile, "base64"));
                });
            }
            else {
                blobFile = blobFile.split(",")[1];
                resolve(Buffer.from(blobFile, "base64"));
            }
        });
    }
    /**
     * Save file to target folder with a buffer of file. [optional], Possibility to resize.
     * @param                   fileBuffer - buffer of file
     * @param {string}          filename - name of file
     * @param {string}          path - path of destination
     * @param {string | number} size - [Optional]: Define a new size on string or a percent on number (ex: "800*600" or 0.8)
     */
    saveFile(fileBuffer, filename, path, size) {
        return new Promise((resolve) => {
            const dimensions = buffer_image_size_1.default(fileBuffer);
            let imgWidth = dimensions.width;
            let imgHeight = dimensions.height;
            if (size) {
                if (typeof size === "number") {
                    const quotient = size;
                    imgWidth = imgWidth * quotient;
                    imgHeight = imgHeight * quotient;
                }
                else {
                    imgWidth = Number(size.split("*")[0]);
                    imgHeight = Number(size.split("*")[1]);
                }
            }
            sharp_1.default(fileBuffer)
                .resize(imgWidth, imgHeight)
                .toFile(path + filename, (er, info) => {
                if (er) {
                    new logger_manager_1.LoggerManager().errorLogger("upload-file > saveFile() > on_save", er);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.UploadFileService = UploadFileService;
// export default new UploadFileService();
//# sourceMappingURL=upload-file.js.map