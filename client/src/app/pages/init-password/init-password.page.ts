import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {UtilityService} from "../../services/utility/utility-service.service";
import {InitPassService} from "./init-pass.service";

@Component({
  selector: 'app-init-password',
  templateUrl: './init-password.page.html',
  styleUrls: ['./init-password.page.scss'],
})
export class InitPasswordPage implements OnInit {

  public idUser: number;
  public keyTemp: string;
  public initPassForm: FormGroup;
  public inProcess = false;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private initpassService: InitPassService,
              private utility: UtilityService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.urlSnapchot();
    this.createForm();
  }

  private urlSnapchot() {
    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.keyTemp = this.activatedRoute.snapshot.paramMap.get('keytemp');
  }

  /**
   * Submit to Api the new password
   */
  public onSubmit() {
    this.inProcess = true;
    this.utility.swalLoading();
    const pass1 = this.initPassForm.get('pass1').value;
    const pass2 = this.initPassForm.get('pass2').value;
    this.initpassService.initPass(this.idUser, this.keyTemp, pass1, pass2)
        .then(() => {
          this.utility.swalToast(true, 'Félicitation! Vous pouvez désormais vous connecter avec vos identifiants.');
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.userService.clearSession();
          }, 300);
        })
        .catch(() => {
          this.inProcess = false;
        });
  }

  // PRIVATE ================================================

  /**
   * Set init pass formular
   */
  private createForm() {
    this.initPassForm = this.initpassService.setInitPassForm();
  }

}
