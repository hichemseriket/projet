import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {IApi} from '../../../../../core/IApi';
import {ApiService} from '../../services/api/api.service';
import {UploadService} from "../../services/api/upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
})
export class UploadPage implements OnInit {

    prodMode = false;
    form: FormGroup;
    inc = 0;
    category = 'photo';
    mediaDate = new Date().getFullYear().toString();
    ref = '';
    fileReader: { fileName: string; fileBlob: string };

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private router: Router,
              private activRoute: ActivatedRoute,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private apiService: ApiService) {
      this.prodMode = environment.production;
  }

  ngOnInit() {
      this.ref = this.activRoute.snapshot.paramMap.get('ref');
      this.createForm();
  }

    /**
     * Event when we enter in this page
     */
    ionViewWillEnter() {
        this.inc++;
    }

    /**
     * on event from uploader, send to database
     * @param event: any
     */
  onFileExt(event: { fileName: string; fileBlob: string }) {
      this.fileReader = event;
      // this.fileExt = event;
      this.sendDatabase();
  }

    /**
     * Create and initialize the reactive formular
     */
    createForm() {
        this.form = this.formBuilder.group({
            mediaDate: new FormControl(this.mediaDate, [Validators.required]),
            category: new FormControl(this.category)
        });
    }

    /**
     * send to database
     */
    async sendDatabase() {
        const toast = await this.toastController.create({
            message: 'Le média à été ajouté',
            position: 'middle',
            duration: 2000,
            color: 'success'
        });
        const loading = await this.loadingController.create({
            message: 'En cours de modification , merci de patienter .'
        });
        await loading.present();
        const content = {
            fileReader: this.fileReader,
            category: this.form.get('category').value,
            mediaDate: this.form.get('mediaDate').value,
            ref: this.ref
        };
        this.apiService.postApi('media', 'addMedia', content)
            .then(async (res: IApi) => {
            if (res.success) {
                await this.router.navigate(['/house-card/' + this.ref]);
                setTimeout(async () => {
                    await toast.present();
                    await loading.dismiss();
                }, 1000);
            } else {
                await loading.dismiss();
            }
        });
    }

}
