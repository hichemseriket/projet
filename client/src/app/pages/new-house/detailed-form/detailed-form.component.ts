import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {MapService} from "../../../services/map/map.service";
import {Router} from "@angular/router";
import {UtilityService} from "../../../services/utility/utility-service.service";
import {IApi} from "../../../../../../core/IApi";

@Component({
  selector: 'app-detailed-form',
  templateUrl: './detailed-form.component.html',
  styleUrls: ['./detailed-form.component.scss'],
})
export class DetailedFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController,
    private mapService: MapService,
    private router: Router,
    private loadingController: LoadingController,
    private utilityService: UtilityService )
  {
    this.creatDetailedForm();
  }
  @ViewChild('slides') slides;
  lat = 0;
  lng = 0;
  form: FormGroup;
  auvent = false;
  page = 1;

  ngOnInit() {}

  auventYes() {
    if (this.auvent === true ) {
      this.auvent = false;
    } else {
      this.auvent = true;
    }
  }
  nextpage() {
    this.page ++;
  }
  previousPage() {
    this.page --;
  }

  private creatDetailedForm() {

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
      other: new FormControl('', Validators.compose([
      ]))
    });
  }

  public onSubmitDetailedForm() {
    this.postHouse(this.form.value.city, this.form.value.street, {lat: this.lat, lng: this.lng}, this.form.value.other, );
  }

  private async postHouse(city: string, street: string, gps: any, other: string) {
    const loading = await this.loadingController.create({
      message: 'En cours de modification , merci de patienter .'
    });
    await loading.present();

    const content = {
      city,
      street,
      gps,
      other,
    };
    this.apiService.postApi('house', 'addHouse', content)
      .then((async (res: IApi) => {
        if (res.success) {
          const toast = await this.toastController.create({
            message: 'La maison à été ajoutée',
            position: 'middle',
            duration: 2000
          });
          await this.router.navigate(['/house-card/' + res.message]);
          setTimeout(async () => {
            await toast.present();
            await loading.dismiss();
          }, 1000);
        } else {
          await loading.dismiss();
        }
      }));
  }
}
