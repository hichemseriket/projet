import { Injectable } from '@angular/core';
import Swal, {SweetAlertOptions, SweetAlertType} from 'sweetalert2';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
/**
 * v 1.1.1
 */
export class
UtilityService {

  constructor() {}

  /**
   * Pop a loading modal. Must close with "swalClose()" function.
   */
  public swalLoading(timeOutNone?: boolean) {
    if (!Swal.isVisible()) {
      Swal.fire({
        title: 'Chargement en cours',
        html: 'Veuillez patienter ...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
      if (!timeOutNone) {
        setTimeout(() => {
          if (Swal.isVisible() && Swal.isLoading()) {
            this.swalClose();
            this.swalToast(false, 'Temps de chargement trop long, veuillez ré-essayer!');
          }
        }, 30000);
      }
    }
  }

  public swalLoadingLittle() {
    if (!Swal.isVisible()) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false
      });

      Toast.fire({
        title: 'Chargement en cours',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
      setTimeout(() => {
        if (Swal.isVisible() && Swal.isLoading()) {
          this.swalClose();
          this.swalToast(false, 'Temps de chargement trop long, veuillez ré-essayer!');
        }
      }, 30000);
    }
  }

  /**
   * Close actual modal
   */
  public swalClose() {
    Swal.close();
  }

  /**
   * Pop a toast modal. Show success or error in terms of state parameter.
   * @param state: boolean - 'true' show a success, 'false' show an error.
   * @param text: string - [optional] - Set your text message.
   */
  public swalToast(state: boolean, text?: string) {
    let type: SweetAlertType;
    let title: string;
    if (state) {
      type = 'success'; title = 'C\'est un succès !';
    } else {
      type = 'error'; title = 'Echec ! Ré-essayer encore une fois.';
    }
    if (text) {title = text; }
    Swal.fire({
      position: 'center',
      type,
      text: title,
      showConfirmButton: true,
      timer: 5000
    });
  }

  public swalToastLittle(state: boolean, text?: string) {
    let type: SweetAlertType;
    let title: string;
    if (state) {
      type = 'success'; title = 'C\'est un succès !';
    } else {
      type = 'error'; title = 'Echec ! Ré-essayer encore une fois.';
    }
    if (text) {title = text; }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type,
      title: text
    });
  }

  /**
   * Pop a confirm modal. Return 'resolve' event on confirm click or return 'reject' event on cancel click.
   * example:
   *
   * this.utility.swalConfirm()
   *   .then(() => {console.log('confirm'); })
   *   .catch(() => {console.log('cancel'); });
   */
  public swalConfirm(text?: string) {
    return new Promise((resolve, reject) => {
      if (!text) {text = 'Est-ce que vous confirmez cette action?'; }
      Swal.fire({
        title: 'Confirmation',
        text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#818181',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          reject(false);
        }
      });
    });
  }

  /**
   * Pop a toast confirm modal. Return 'resolve' event on confirm click or return 'reject' event on cancel click.
   * example:
   *
   * this.utility.swalConfirm()
   *   .then(() => {console.log('confirm'); })
   *   .catch(() => {console.log('cancel'); });
   */
  public swalConfirmLittle(text?: string) {
    return new Promise((resolve, reject) => {
      if (!text) {text = 'Est-ce que vous confirmez cette action?'; }
      Swal.fire({
        title: 'Confirmation',
        toast: true,
        text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#818181',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          reject(false);
        }
      });
    });
  }

  /**
   * Pop a error modal.
   * @param text: string - message of error
   */
  public swalError(text: string) {
    this.swalClose();
    Swal.fire({
      type: 'error',
      title: 'Oups... Une erreur est survenue !',
      text
    });
  }

  /**
   * Pop a modal with input radio option. Return the index selected
   * @param inputOptions: string[]
   * @param title: string - [optional]
   */
  public async swalRadio(inputOptions, title?: string) {
    return new Promise(async (resolve: (value?: number) => void) => {
      if (!title) {title = 'Faites un choix:'; }
      const {value: iTag} = await Swal.fire({
        title,
        width: 'auto',
        input: 'radio',
        inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Vous devez choisir un tag principal.';
          }
        },
        onBeforeOpen: () => {
          const selected = $('.swal2-radio');
          selected.click(() => {
            setTimeout(() => {
              Swal.clickConfirm();
            }, 300);
          });
        }
      });
      if (iTag) {
        resolve(iTag);
      }
    });
  }

  /**
   * Pop a modal with input checkbox option. Return a index's list selected.
   * @param inputOptions: string[]
   * @param title: string - [Optional]
   */
  public async swalCheckbox(inputOptions, title?: string) {
    return new Promise (async (resolve: (value?: number[]) => void) => {
      if (!title) {title = 'Faites un choix:'; }
      let content = '';
      const response = [];
      inputOptions.forEachThen((tag, index) => {
        if (index === 0) {content += '<div class="d-flex justify-content-around flex-wrap">'; }
        content += `
            <div class="form-check text-left">
                <input class="form-check-input swal-checkbox" type="checkbox" value="${tag.id}" id="checkbox${index}">
                <label class="form-check-label swal-checkbox-label" for="checkbox${index}">
                    ${tag.name}
                </label>
            </div>
    `;
        if (index === inputOptions.length - 1) {content += '</div>'; }
      });

      await Swal.fire({
        title,
        html: content,
        focusConfirm: false,
        preConfirm: () => {
          inputOptions.forEachThen((tag, index) => {
            if ($('#checkbox' + index).prop('checked')) {
              response.push(index);
            }
          });
        }
      });

      if (response.length > 0) {
        resolve(response);
      } else {
        this.swalCheckbox(inputOptions).then((res) => {resolve(res); });
      }
    });
  }

  /**
   * Pop a modal with input text (password optionnal). Return the input value.
   * @param title: string - title of modal
   * @param inputType: 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url'
   * @param defaultValue: string - [Optional]
   * @param placeholder: string - [Optional]
   */
  public swalInput(title: string, inputType: SweetAlertOptions['input'], defaultValue?: string, placeholder?: string) {
    return new Promise((resolve: (value?: string) => void) => {
      if (!placeholder) {placeholder = 'Saisissez quelque chose!'; }

      Swal.fire({
        title,
        input: inputType,
        inputValue: defaultValue,
        inputPlaceholder: placeholder,
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showCancelButton: true
      }).then((result) => {
        if (result) {
          if (!result.dismiss) {
            resolve(result.value);
          }
        }
      });
    });
  }

  /**
   * Pop a modal with input file. return the file.
   */
  public async swalFileupload() {
    return new Promise(async (resolve) => {
      const {value: file} = await Swal.fire({
        title: 'Selectionner un média:',
        input: 'file',
        inputAttributes: {
          accept: 'image/*, application/pdf'
        }
      });
      if (file) {
        resolve(file);
        this.swalClose();
      }
    });
  }

  /**
   * Pop a modal with progress bar
   */
  public async swalProgressBar(progress: number, timeOutNone?: boolean) {
    return new Promise(async (resolve) => {
      if (!Swal.isVisible()) {
        await Swal.fire({
          title: 'Chargement en cours',
          html:
              '<div style="height: 50px; width: 100%; display: flex; position: relative;">' +
              '<div style="background-color: darkgray; height: 100%; width: 100%;"></div>' +
              '<div style="background-color: forestgreen; height: 100%; width: ' + progress + '%; position: absolute"></div>' +
              '<div style="position: absolute; top: 10px; text-align: center; width: 100%; color: white">' + progress + ' %</div>' +
              '</div>',
          allowOutsideClick: false,
          showConfirmButton: false
        });
        if (!timeOutNone) {
          setTimeout(() => {
            if (Swal.isVisible() && Swal.isLoading()) {
              this.swalClose();
              this.swalToast(false, 'Temps de chargement trop long, veuillez ré-essayer!');
            }
          }, 30000);
        }
      } else {
        Swal.update({
          html:
              '<div style="height: 50px; width: 100%; display: flex; position: relative;">' +
              '<div style="background-color: darkgray; height: 100%; width: 100%;"></div>' +
              '<div style="background-color: forestgreen; height: 100%; width: ' + progress + '%; position: absolute"></div>' +
              '<div style="position: absolute; top: 10px; text-align: center; width: 100%; color: white">' + progress + ' %</div>' +
              '</div>'
        });
      }
    });
  }
}
