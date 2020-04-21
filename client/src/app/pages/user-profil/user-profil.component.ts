import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserInfoClass} from "../../services/user/user-info.class";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss'],
})
export class UserProfilComponent implements OnInit {

  public idUser: number;
  public User: UserInfoClass = null;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.routeSnapchot();
  }

  private routeSnapchot() {
    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get("idUser"));
    console.log(this.idUser);
    this.getUserById();
  }

  private getUserById() {
    if (this.idUser > 0) {
      this.userService.getUserById(this.idUser).then((user) => {
        this.User = new UserInfoClass(user);
      });
    }
  }
}


