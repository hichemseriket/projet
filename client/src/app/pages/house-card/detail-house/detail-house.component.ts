import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IApi} from "../../../../../../core/IApi";
import {ApiService} from '../../../services/api/api.service';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.scss'],
})
export class DetailHouseComponent implements OnInit, OnChanges, OnDestroy {

  @Input() ref: string;
  @Input() inc = 0;

  form: FormGroup;

   adminState = false;
   adminSubscription: Subscription;

   sections = ['street', 'constructionDate', 'description', 'type', 'materials', 'projectManager', 'owner', 'other'];
   house = {
       street: {name: 'rue', value: '', length: 0, show: false},
       description: {name: 'Histoire', value: '', length: 0, show: true},
       type: {name: 'Type de maison', value: '', length: 0, show: true},
       materials: {name: 'Matériaux', value: '', length: 0, show: true},
       projectManager: {name: 'Maître d\'Oeuvre', value: '', length: 0, show: true},
       owner: {name: 'Maître d\'ouvrage', value: '', length: 0, show: true},
       other: {name: 'Autre', value: '', length: 0, show: true},
       constructionDate: {name: 'Date de construction', value: '', length: 0, show: true}
   };
   maxLength = 100;


  constructor(private formBuilde: FormBuilder,
              private apiService: ApiService,
              private toastController: ToastController,
              // private userService: UserService,
              public alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router,
              private navCtrl: NavController) {
  }

  ngOnInit() {
      this.createForm();
      // this.refreshAdminState();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.readHouseInfoDb(this.ref);
    // this.getAdminState();
  }

    /**
     * Create and initialize the reactive formular
     */
  createForm() {
      this.form = this.formBuilde.group({
          street: new FormControl(''),
          constructionDate: new FormControl(''),
          description: new FormControl(''),
          type: new FormControl(''),
          projectManager: new FormControl(''),
          owner: new FormControl(''),
          materials: new FormControl(''),
          other: new FormControl('')
      });
  }

  async onDeleteHouse() {
      const alert = await this.alertController.create({
          header: 'Attention!',
          inputs: [
              {
                  name: 'pwd',
                  type: 'password',
                  placeholder: 'Entrez un mot de passe'
              }
          ],
          message: 'Êtes-vous sûr de vouloir supprimer cette maison? <br>' +
              ' <strong>Cette action est irréversible.</strong> <br> ' +
              'Saisissez le mot de passe pour confirmer:',
          buttons: [
              {
                  text: 'Annuler',
                  role: 'cancel',
                  cssClass: 'secondary',
              }, {
                  text: 'Confirmer',
                  handler: async (inputs) => {
                      if (inputs.pwd === 'daliweb') {
                          this.deleteHouse();
                      } else {
                          const toast = await this.toastController.create({
                              message: 'Le mot de passe est incorrect !',
                              position: 'middle',
                              duration: 2000,
                              color: 'danger',
                              showCloseButton: true
                          });
                          toast.present();
                      }
                  }
              }
          ]
      });
      await alert.present();
  }

  async deleteHouse() {
      const loading = await this.loadingController.create({
          message: 'En cours de modification , merci de patienter .'
      });
      await loading.present();
      const content = {
          ref: this.ref
      };
      this.apiService.postApi('house', 'deleteHouse', content)
          .then(async (res: IApi) => {
          if (res.success) {
              const toast = await this.toastController.create({
                  message: 'La maison à bien été supprimée',
                  position: 'middle',
                  duration: 2000,
                  color: 'success'
              });
              // this.navCtrl.back();
              await this.router.navigate(['/home']);
              setTimeout(async () => {
                  await toast.present();
                  await loading.dismiss();
              }, 1000);
          }
      });
  }

    /**
     * Update all input of formular
     */
  updateForm() {
      this.sections.forEach((section) => {
          this.form.get(section).setValue(this.house[section].value);
      });
  }
    /**
     * On click submit button
     * @param submitName: string
     */
    onSubmitInfo(submitName: string) {
      const inputValue = this.form.get(submitName).value;
      this.showHideUpdate(submitName);
      this.sendDataHouse(submitName, inputValue, this.ref);
  }

    /**
     * displayed and hides presentation and modification divs
     */
    showHideUpdate(idDom: string) {
        const domInput = $('#input-' + idDom);
        const domInfo = $('#data-' + idDom);

        if (domInput.hasClass('active')) {
            domInput.removeClass('active');
            domInfo.addClass('active');
        } else {
            $('.input-info').removeClass('active');
            $('.data-info').addClass('active');
            domInput.addClass('active');
            domInfo.removeClass('active');

        }
    }

    /**
     * Send a request to back-end and wait a response
     * @param inputName: string
     * @param inputValue: string
     */
    async sendDataHouse(inputName: string, inputValue: string, ref: string) {
        const loading = await this.loadingController.create({
            message: 'En cours de modification , merci de patienter .'
        });
        await loading.present();
        const content = {
          inputName,
          inputValue,
          ref
      };
        this.apiService.postApi('house', 'updateHouse', content)
            .then((async (res: IApi) => {
          if (res.success) {
              const toast = await this.toastController.create({
                  message: 'les modifications ont bien été prises en compte',
                  position: 'middle',
                  duration: 2000,
                  color: 'primary'
              });
              await toast.present();
              this.readHouseInfoDb(this.ref);

              await loading.dismiss();

          }
      }));

    }

    /**
     * retrieve the information of BDD or Json and use them (recovery of the house info to use 1 to 1 parameter )
     */
    readHouseInfoDb(ref: string) {
    if (ref) {
        const content = {
            ref
        };
        this.apiService.postApi('house', 'getHouse', content)
            .then((res: IApi) => {
            const house = res.house;

            this.sections.forEach((section) => {
                this.house[section].value = house[section];
                if (this.house[section].value !== null) {
                    this.house[section].length = this.house[section].value.length;
                }
            });

            this.updateForm();
        });
    }
  }

  ngOnDestroy(): void {
    // this.adminSubscription.unsubscribe();
  }

}
