import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api/api.service";
import {UserService} from "../../services/user/user.service";
import {UtilityService} from "../../services/utility/utility-service.service";

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.page.html',
  styleUrls: ['./confirm-mail.page.scss'],
})
export class ConfirmMailPage implements OnInit {

  public idUser: number;
  public keyTemp: string;
  public newMail: string;
  public confirmMailForm: FormGroup;
  public inProcess = false;

  constructor(private formBuilder: FormBuilder,
              private utility: UtilityService,
              private apiService: ApiService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.urlSnapchot();
    this.initForm();
  }

  public onSubmit() {
    this.utility.swalLoading();
    const password = this.confirmMailForm.get('password').value;
    const content = {
      idUser: this.idUser,
      keytemp: this.keyTemp,
      newMail: this.newMail,
      password
    };
    this.apiService.postApi("guest", "confirmMail", content).then((res) => {
      this.utility.swalToast(true, 'Félicitation! Vous pouvez désormais vous connecter avec vos identifiants.');
      setTimeout(() => {
        this.router.navigate(['/login']);
        this.userService.clearSession();
      }, 300);
    });
  }

  // PRIVATE =========================================================

  private urlSnapchot() {
    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.keyTemp = this.activatedRoute.snapshot.paramMap.get('keytemp');
    this.newMail = this.activatedRoute.snapshot.paramMap.get('newMail');
  }

  private initForm() {
    this.confirmMailForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

}
