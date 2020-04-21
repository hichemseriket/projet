import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IApi} from "../../../../../../core/IApi";
import {ApiService} from '../../../services/api/api.service';
import {UploadService} from "../../../services/api/upload.service";
import {MapService} from '../../../services/map/map.service';
import { UtilityService } from "../../../services/utility/utility-service.service";
import {BatimentEntity} from "../../../../../../server/orm/entity/houses/batiments.entity";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent implements OnInit {


  @ViewChild('slides') slides;
  lat = 0;
  lng = 0;
  form: FormGroup;
  ref = '';
  fileReader: { fileName: string; fileBlob: string };
  files: File[] = [];
  previewFiles = [];
  processing = true;
  validFile = true;
  prodMode = false;
  inc = 0;
  category = 'photo';
  mediaDate = new Date().getFullYear().toString();

  validationMessages = {
    city: [
      { type: 'required', message: 'Vous devez renseigner une ville'},
      { type: 'minlength', message: 'Vous devez renseigner au minimum 3 caractères'},
      { type: 'maxlength', message: 'Vous devez renseigner au maximum 255 caractères'},
      { type: 'pattern', message: 'Les nombres ne sont pas autorisés pour une ville'}
    ],
    street: [
      { type: 'required', message: 'Vous devez renseigner une rue'},
      { type: 'minlength', message: 'Vous devez renseigner au minimum 3 caractères'},
      { type: 'maxlength', message: 'Vous devez renseigner au maximum 255 caractères'}
    ],
    lat: [
      { type: 'required', message: 'Vous devez renseigner une position sur la carte'},
      { type: 'minlength', message: 'Vous devez renseigner au minimum 3 caractères'},
      { type: 'maxlength', message: 'Vous devez renseigner au maximum 255 caractères'}
    ]
  };
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  @Output() fileExt = new EventEmitter<{ fileName: string; fileBlob: string }>();

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  public constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController,
    private mapService: MapService,
    private router: Router,
    private loadingController: LoadingController,
    private camera: Camera,
    private utilityService: UtilityService,
    private uploadService: UploadService
  ) {
    this.creatSimpleForm();
    this.captures = [];
  }

  allowedMimeType = "";

 public ngOnInit() {
    // this.creatForm();
    // this.slides.lockSwipes(true);
  }



  // public ngAfterViewInit() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //       this.video.nativeElement.srcObject = stream;
  //       this.video.nativeElement.play();
  //     });
  //   }
  // }

  public capture() {
    const context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log('done');
    console.log(this.captures);
    return this.capture;
  }


  /**
   * creates a form with validation security for city, street and map coordinate
   */
  private creatSimpleForm() {

    this.form = this.formBuilder.group({
      city: new FormControl ('', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern('^[a-zA-Zéèàç_.-]+$'),
        Validators.required
      ])),
      street: new FormControl ('', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255)
      ])),
      lat: new FormControl ('', Validators.compose([
        Validators.minLength(0),
        Validators.maxLength(255),
        Validators.required
      ])),
      lng: new FormControl ('', Validators.compose([
        Validators.minLength(0),
        Validators.maxLength(255),
        Validators.required
      ])),
      roof: new FormControl('', Validators.compose([
      ])),
      walls: new FormControl('', Validators.compose([
      ])),
      history: new FormControl('', Validators.compose([
      ])),
      mediaDate: new FormControl(this.mediaDate, [Validators.required]),
      category: new FormControl(this.category)
    });
  }

  /**
   * Clear all marker in map
   */
  public onClearMapCoordinate() {
    this.onGetMapCoordinate({lat: null, lng: null});
    this.mapService.emitClearMarker();
  }

  /**
   * On click map, get the coordinate click position
   * @param event: any
   */
  public onGetMapCoordinate(event) {
    this.lat = event.lat;
    this.lng = event.lng;
    this.form.get('lat').setValue(this.lat);
    this.form.get('lng').setValue(this.lng);
  }

  /**
   * On submit formular, get data of this.
   */
  public onSubmitSimpleForm() {
    this.postHouse(this.form.value.city, this.form.value.street, {lat: this.lat, lng: this.lng},
                  this.form.value.roof, this.form.value.walls, this.form.value.history);
    // this.onRequestSubmit();
    // this.sendDatabase();
  }

  /**
   * Change input validator in terms of input selected
   * @param value: number - id of input selected
   * 0 = street
   * 1 = map
   */
  private changeValidator(value: number) {
    if (value === 0) { // street selected
      // add required validator
      this.form.controls.street.setValidators([Validators.required]);
      // clear required validator
      this.form.controls.lat.clearValidators();
      this.form.controls.lng.clearValidators();
      // update input validity
      this.form.controls.street.updateValueAndValidity();
      this.form.controls.lat.updateValueAndValidity();
      this.form.controls.lng.updateValueAndValidity();
    } else if (value === 1) { // map selected
      // add required validator
      this.form.controls.lat.setValidators([Validators.required]);
      this.form.controls.lng.setValidators([Validators.required]);
      // clear required validator
      this.form.controls.street.clearValidators();
      // update input validity
      this.form.controls.lat.updateValueAndValidity();
      this.form.controls.lng.updateValueAndValidity();
      this.form.controls.street.updateValueAndValidity();
    }
  }

  /**
   * On click in segment, choice between street and map
   * @param event: click event
   */

  public onSegmentChanged(event) {
    this.changeValidator(Number(event.detail.value));
    this.slides.lockSwipes(false);
    this.slides.slideTo(Number(event.detail.value));
    this.slides.lockSwipes(true);
  }

  /**
   * Post data's formular to server
   * @param city: string - Name of city
   * @param street: string - Name of street
   * @param gps: any - lat lng position
   * @param roof: string - details about the house's roof
   * @param walls: string - details about the house's walls
   * @param history: string - details about the house's history
   */
  private async postHouse(city: string, street: string, gps: any | null, roof: string, walls: string, history: string) {
    const loading = await this.loadingController.create({
      message: 'En cours de modification, merci de patienter.'
    });
    await loading.present();

    const content = {
      city,
      street,
      gps,
      roof,
      walls,
      history
    };
    // this.apiService.postApi('batiment', 'addBuilding', content)
    //     .then(async (result) => {
    //       if (result) {
    //         console.log("le resulta batiment : ", result);
        this.apiService.postApi('house', 'addHouse', content)
          .then((async (res: IApi) => {
            if (res.success) {
              console.log("poste house add house success");
              const toast = await this.toastController.create({
                message: 'La maison à été ajoutée',
                position: 'middle',
                duration: 2000
              });
              console.log(res.message);
              await this.router.navigate(['/house-card/' + res.message]);
              setTimeout(async () => {
                await toast.present();
                await loading.dismiss();
              }, 1000);
            } else {
              console.log("post api ne fonctione pas ");
              await loading.dismiss();
            }
          }));
            // // tslint:disable-next-line:align
            // await this.apiService.postApi('media', 'addMedia', content);
      // }
      //   }
      // );
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
      console.log('cameraPhoto');
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  // async sendDatabase() {
  //   const toast = await this.toastController.create({
  //     message: 'Le média à été ajouté',
  //     position: 'middle',
  //     duration: 2000,
  //     color: 'success'
  //   });
  //   const loading = await this.loadingController.create({
  //     message: 'En cours de modification , merci de patienter .'
  //   });
  //   await loading.present();
  //   const content = {
  //     fileReader: this.fileReader,
  //     category: this.form.get('category').value,
  //     mediaDate: this.form.get('mediaDate').value,
  //     ref: this.ref
  //   };
  //   this.apiService.postApi('media', 'addMedia', content)
  //     .then(async (res: IApi) => {
  //       if (res.success) {
  //         await this.router.navigate(['/house-card/' + this.ref]);
  //         setTimeout(async () => {
  //           await toast.present();
  //           await loading.dismiss();
  //         }, 1000);
  //       } else {
  //         await loading.dismiss();
  //       }
  //     });
  // }
  //   public getFilesPreview($event) {
  //   const files = event.target.files;
  //   this.previewFiles = [];
  //   for (const file of files) {
  //     this.files.push(file);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       // TODO : check the size of file
  //       // TODO : check the extention of file
  //       this.previewFiles.push(reader.result);
  //     };
  //   }
  //   if (this.files[0]) {
  //     this.processing = false;
  //   }
  // }
  //
  // /**
  //  * Remove a file of list
  //  * @param index: number
  //  */
  // public onRemovePreviewFile(index: number) {
  //   this.previewFiles.splice(index, 1);
  //   this.files.splice(index, 1);
  //   if (this.files[0]) {
  //     this.processing = false;
  //   }
  // }
  //
  // /**
  //  * On click submit button, send file and data
  //  */
  // onRequestSubmit() {
  //   if (this.files[0]) {
  //     const file = this.files[0];
  //     this.uploadService.toBlobFile(file).then((result) => {
  //       this.fileExt.next(result);
  //       this.files = null;
  //       this.previewFiles = null;
  //     });
  //   } else {
  //     alert('Vous devez choisir un fichier');
  //   }
  // }
  //
  // uploadFailed() {
  // tslint:disable-next-line:max-line-length
  //   alert('Opération échouée' + 'Le fichier n\'a pas été téléchargé, aucune donnée n\'à donc été enregistrée. Si le problème persiste, contactez l\'administrateur.');
  // }

}
