import { Injectable } from '@angular/core';
import {IApi} from "../../../../../core/IApi";
import {ErrorManagerService} from '../error-manager/error-manager.service';
import {UtilityService} from "../utility/utility-service.service";
import {ApiService} from './api.service';

type TypeTargetUploader = 'updateBackgroundHome' | 'updateOther';
type TypeExtentionAuthaurized = 'jpg' | 'JPG' | 'png' | 'PNG' | 'gif' | 'GIF' | 'pdf' | 'PDF';

@Injectable({
  providedIn: 'root'
})
/**
 * v 1.2.1
 */
export class UploadService {

  constructor(private errMan: ErrorManagerService,
              private utility: UtilityService) {
  }

  /**
   * Resole the file name and the file blob
   * @param file [File]
   */
  public toBlobFile(file: File) {
    return new Promise((resolve: (p: { fileName: string; fileBlob: string }) => void) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve({fileName: file.name, fileBlob: reader.result.toString()});
      };
    });
  }

  /**
   * Show a upload modal for post a picture to server with progress bar.
   * Resolve: return the file.
   */
  public uploadPicturePreview() {
    return new Promise((resolve: (file) => void, reject) => {
      this.utility.swalFileupload()
        .then((file: File) => {
          let progress = 0;
          setTimeout(() => {
            // start progress
            this.utility.swalProgressBar(progress, true).then();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // upgrade progress
            reader.onprogress = (e) => {
              progress = parseInt( String(((e.loaded / e.total) * 100)), 10 );
              this.utility.swalProgressBar(progress, true).then();
            };
            // ended progress
            reader.onloadend = () => {
              progress = 100;
              this.utility.swalProgressBar(progress, true).then();
              resolve(file);
              this.utility.swalClose();
            };
          }, 500);
        });
    });
  }

  /**
   * Control if the extention's file choosed match
   * @param extention [TypeExtentionAuthaurized] 'jpg' | 'JPG' | 'png' | 'PNG' | 'gif' | 'GIF' | 'pdf' | 'PDF'
   */
  public controlExtention(extention: TypeExtentionAuthaurized[]) {
    const lol = extention;
  }

  // PRIVATE ===================================================================================



}
