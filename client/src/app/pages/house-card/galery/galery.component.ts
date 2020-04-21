import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {ViewMediaComponent} from "../../../components/view-media/view-media.component";
import {IApi} from "../../../../../../core/IApi";
import {ApiService} from "../../../services/api/api.service";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import * as $ from "jquery";


@Component({
    selector: 'app-galery',
    templateUrl: './galery.component.html',
    styleUrls: ['./galery.component.scss'],
})
//
export class GaleryComponent implements OnInit, OnChanges {

    @ViewChild('slides') slides;
    @Input() ref: string;
    @Input() inc = 0;
    medias = [];
    domain = '';
    adminState = false;
    adminSubscription: Subscription;

  constructor(private apiService: ApiService,
              public alertController: AlertController,
              private toastController: ToastController,
              private loadingController: LoadingController,
              // private userService: UserService,
              private modalController: ModalController) { }

  ngOnInit() {
      this.defineDomain();
      // this.refreshAdminState();
  }

    /**
     * this function is used to retrieve information with each change of function associated with it
     * @param changes = if is have a change info
     */
  ngOnChanges(changes: SimpleChanges) {
      this.medias = [];
      this.readMediaHouseDb();
      // this.getAdminState();
  }

    defineDomain() {
        this.domain = this.apiService.domain;
    }

    onSlidePrev() {
        this.slides.slidePrev();
    }

    onSlideNext() {
        this.slides.slideNext();
    }

    async onModalViewer(fileName) {
        const modal = await this.modalController.create({
            component: ViewMediaComponent,
            componentProps: {
                ref: this.ref,
                fileName
            }
        });
        return await modal.present();
    }

    /**
     * recovers all the media of the house by its reference
     */
  readMediaHouseDb() {
        const content = {
            ref: this.ref
        };
        this.apiService.postApi('house', 'getHouseMedia', content)
            .then((res: IApi) => {
            this.medias = res.list;
        });
    }

    // TODO : envoyer le mot de passe aussi à l'API
    async onRemovePic(fileName: string, index) {
        const alert = await this.alertController.create({
            header: 'Attention!',
            inputs: [
                {
                    name: 'pwd',
                    type: 'password'
                }
            ],
            message: "Êtes-vous sûr de vouloir supprimer ce média? <br> " +
                "<strong>Cette action est irrévertible.</strong> <br> " +
                "Saisissez votre mot de passe pour confirmer: (=> daliweb)",
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Confirmer',
                    handler: async (inputs) => {
                        if (inputs.pwd === 'daliweb') {
                            this.removePic(fileName, index);
                        } else {
                            const toast = await this.toastController.create({
                                message: 'Le mot de passe est incorrect !',
                                position: 'middle',
                                duration: 2000,
                                color: "danger",
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

    async removePic(filename, index) {
        const toast = await this.toastController.create({
            message: 'Le média à bien été supprimé',
            position: 'middle',
            duration: 2000,
            color: "danger"
        });
        const loading = await this.loadingController.create({
            message: 'En cours de suppression , merci de patienter .'
        });
        await loading.present();

        const content = {
            filename
        };
        console.log(content)
        this.apiService.postApi('media', 'removeMedia', content)
            .then(async (res: IApi) => {
            if (res.success) {
                setTimeout(async () => {
                    await toast.present();
                    await loading.dismiss();
                    this.medias.splice(index, 1);
                }, 1000);
            } else {
                await loading.dismiss();
            }
        });
    }
}
