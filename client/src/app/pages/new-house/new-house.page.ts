import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IApi} from "../../../../../core/IApi";
import {ApiService} from '../../services/api/api.service';
import {MapService} from '../../services/map/map.service';
import { UtilityService } from "../../services/utility/utility-service.service";

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.page.html',
  styleUrls: ['./new-house.page.scss'],
})
export class NewHousePage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private toastController: ToastController,
        private mapService: MapService,
        private router: Router,
        private loadingController: LoadingController,
        private utilityService: UtilityService
    ) {
    }

    @ViewChild('slides') slides;
    lat = 0;
    lng = 0;
    form: FormGroup;
    validationMessages = {
        city: [
          { type: 'required', message: 'Vous devez renseigner une Ville'},
          { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
          { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'},
          { type: 'pattern', message: 'Les nombres ne sont pas autorisées pour une ville'}
        ],
        street: [
          { type: 'required', message: 'Vous devez renseigner une Rue'},
          { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
          { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'}
        ],
        lat: [
            { type: 'required', message: 'Vous devez renseigner une position sur la carte'},
            { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
            { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'}
        ]
    };
    private detaille: string;
  private simple: string;
  formInfos = true;
  formSimple = false;
  formDetaille = false;

    ngOnInit() {
        // this.creatForm();
        // this.slides.lockSwipes(true);
    }

    ionViewWillEnter() {
        // this.creatForm();
    }
   public typeform() {
      this.simple = 'Simple',
     this.detaille = 'Détaillée',
      this.utilityService.swalRadio([(this.simple), (this.detaille)], "De quelle façon voulez-vous ajouter une maison ?")
        .then((name) => {
          if (name === 0) {
            this.formSimple = true;
            this.formInfos = false;
            this.formDetaille = false;
          } else if (name === 1) {
            this.formDetaille = true;
            this.formInfos = false;
            this.formSimple = false;
          }
        });
   }
  comeback() {
    this.formSimple = false;
    this.formInfos = true;
    this.formDetaille = false;
  }
}
