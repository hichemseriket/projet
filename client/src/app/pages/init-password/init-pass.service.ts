import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {IApi} from "../../../../../core/IApi";
import {ApiService} from "../../services/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class InitPassService {

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  /**
   * Post to Api the new password
   * @param idUser: number
   * @param keytemp: string
   * @param pass1: string
   * @param pass2: string
   */
  public initPass(idUser: number, keytemp: string, pass1: string, pass2: string) {
    return new Promise((resolve, reject) => {
      this.postDbNewPass(idUser, keytemp, pass1, pass2)
        .then(() => {
          resolve();
        })
        .catch(() => {reject(); });
    });
  }

  /**
   * Create init pass formular
   */
  public setInitPassForm(): FormGroup {
    return this.formBuilder.group({
      pass1: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        this.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        this.patternValidator(/[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\'\:\"\|\,\.\<\>\?]/, { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])],
      pass2: [null, Validators.required]
    }, {
      validator: this.MustMatch('pass1', 'pass2')
    });
  }

  // PRIVATE ====================================================

  /**
   * Compare if two password match
   * @param controlName: string
   * @param matchingControlName: string
   * @constructor
   */
  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {      console.log("is logged");

      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  /**
   * Pattern validators for regexp password
   * @param regex: Regexp
   * @param error: {name: boolean}
   */
  private patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  /**
   * Post to Api the new password
   * @param idUser: number
   * @param keytemp: string
   * @param pass1: string
   * @param pass2: string
   */
  private postDbNewPass(idUser: number, keytemp: string, pass1: string, pass2: string) {
    return new Promise((resolve, reject) => {
      const content = {idUser, keytemp, password: pass1, passwordConfirm: pass2};
      console.log(content)
      this.apiService.postApi('guest', 'initPassword', content)
        .then((res: IApi) => {
          if (res.success) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {reject(); });
    });

  }

}
