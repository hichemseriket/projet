import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {IApi} from "../../../../../core/IApi";
import {ApiService} from "../../services/api/api.service";
import { UtilityService } from "../../services/utility/utility-service.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-register-form',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  public submitted = false;
  public registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private utility: UtilityService,
              private router: Router,
              public apiService: ApiService) { }

  ngOnInit() {
    this.buildForm();
  }


  /**
   * Getter
   */
  get result() { return this.registerForm.controls; }

  /**
   * on submit, send data to API
   */
  public onSend() {
    this.submitted = true;
    this.utility.swalLoading();
    const content = {
      mail: this.result.mail.value,
      password: this.result.userPwd.value,
      passwordConfirm: this.result.userPwdConfirm.value,
      gcu: this.result.gcu.value
    };
    this.apiService.postApi('guest', 'register', content).then((res: IApi) => {
      if (res.success) {
        this.utility.swalToast(true, 'Vos informations ont bien été envoyées à un administrateur. Un mail vous sera envoyé ultérieurement');
        this.router.navigate(['login']);
      } else {
        this.submitted = false;
      }
    });
  }

  // PRIVATE ===================================================================================================

  /**
   * Build the formular
   */
  private buildForm() {
    this.registerForm = this.formBuilder.group({
          mail: ['', Validators.compose([Validators.email, Validators.required])],
          userPwd: ['', Validators.compose([
            Validators.required,
            Validators.maxLength(80),
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+\\-\\=\\[\\]\\{\\}\\;\'\"\\|\\,\\.\\<\\>\\?]).*[A-Za-z0-9].{7,}$')])
          ],
          userPwdConfirm: ['', Validators.compose([Validators.required])],
          gcu: false
        }, {
          validator: this.MustMatch('userPwd', 'userPwdConfirm')
        }
    );
  }

  /**
   * Compare two password
   * @param controlName: string
   * @param matchingControlName: string
   */
  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
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
    };
  }
}

