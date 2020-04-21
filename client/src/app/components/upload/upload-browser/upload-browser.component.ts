import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {UploadService} from "../../../services/api/upload.service";

@Component({
  selector: 'app-upload-browser',
  templateUrl: './upload-browser.component.html',
  styleUrls: ['./upload-browser.component.scss'],
})
export class UploadBrowserComponent implements OnInit {

    files: File[] = [];
    previewFiles = [];
    processing = true;
    validFile = true;

    @Output() fileExt = new EventEmitter<{ fileName: string; fileBlob: string }>();

    constructor(private uploadService: UploadService) {
    }

    allowedMimeType = "";

    ngOnInit() {
    }

    /**
     * check the extension file, define and set file name
     */
    public getFilesPreview(event) {
        const files = event.target.files;
        this.previewFiles = [];
        for (const file of files) {
            this.files.push(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // TODO : check the size of file
                // TODO : check the extention of file
                this.previewFiles.push(reader.result);
            };
        }
        if (this.files[0]) {
            this.processing = false;
        }
    }

    /**
     * Remove a file of list
     * @param index: number
     */
    public onRemovePreviewFile(index: number) {
        this.previewFiles.splice(index, 1);
        this.files.splice(index, 1);
        if (this.files[0]) {
            this.processing = false;
        }
    }

    /**
     * On click submit button, send file and data
     */
    onRequestSubmit() {
        if (this.files[0]) {
            const file = this.files[0];
            this.uploadService.toBlobFile(file).then((result) => {
                this.fileExt.next(result);
                this.files = null;
                this.previewFiles = null;
            });
        } else {
            alert('Vous devez choisir une fichier');
        }
    }

    uploadFailed() {
        // tslint:disable-next-line:max-line-length
        alert('Opération échouée' + 'Le fichier n\'a pas été téléchargé, aucune donnée n\'à donc été enregistrée. Si le problème persiste, contactez l\'administrateur.');
    }



}
