import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {UtilityService} from "../utility/utility-service.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService {

  constructor(private alertController: AlertController,
              private utility: UtilityService) { }

    /**
     * Show a modal alert
     * @param error: any
     * @param text: string
     * @param cb: return true when click 'ok'
     */
  public modalError(error: any, text?: string, cb?) {
      if (text === undefined) {
        text = 'Il semblerait qu\'une erreur soit survenue. Réessayez plus tard.';
        }
      console.log(error, text);
      this.utility.swalClose();
      this.presentAlert(text, (res) => {
          return res;
      });
  }

    /**
     * Show a modal alert
     * @param text: string - message of error
     * @param cb: return true when click 'ok'
     */
  private async presentAlert(text: string, cb) {
      const alert = await this.alertController.create({
            header: 'Oups !',
            subHeader: 'Une erreur est survenue',
            message: text,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        return true;
                    }
                }
            ]
        });

      await alert.present();
    }
}
