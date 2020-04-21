import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService} from "../../services/api/api.service";
import {UserService} from "../../services/user/user.service";
import { UtilityService } from "../../services/utility/utility-service.service";
import { IApi } from "../../../../../core/IApi";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public formBuilder: FormBuilder,
              private utility: UtilityService,
              private userService: UserService,
              public router: Router,
              public apiService: ApiService) { }

  ngOnInit() {
    this.createForm();
  }

  get result() {
    return this.loginForm.controls;
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  mdpoublier() {
    // TODO : faire pop un modal qui demandera l'adresse é-mail
    console.log('Changement de mot de passe');
  }

  public onSend() {
    this.submitted = true;

    this.utility.swalLoading();
    const content = {
      mail: this.result.userName.value,
      password: this.result.mdp.value,
    };
    this.apiService.postApi('guest', 'login', content ).then((res: IApi) => {
      if (res.success) {
        this.userService.createSession(res.token);
        this.utility.swalToast(true, 'Bienvenue');
        this.router.navigate(['home']);
      } else {
        this.submitted = false;
      }
    });
  }
}
