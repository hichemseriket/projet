import { Component, OnInit } from '@angular/core';
import {UserManager} from "../../../../services/user-manager/user-manager";
import Swal from "sweetalert2";
import { ApiService } from 'src/app/services/api/api.service';
import { IApi } from '../../../../../../../core/IApi';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.page.html',
  styleUrls: ['./inactive-user.page.scss'],
})
export class InactiveUserPage implements OnInit {

  listeInactive = [];

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserList();
  }

  getUserList() {
    this.listeInactive = [];
    this.apiService.postApi("user/admin", "getUsersList").then((result: IApi) => {
    result.usersList.forEach((user) => {
    this.listeInactive.push(user);
    });
  });
  }

  async onAccept(idUser: number, index: number) {
    const content = {
      idOtherUser: idUser,
      item: "activ",
      value: 1
    };

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    this.apiService.postApi("user/admin", "updateUser", content).then(() => {
        Toast.fire('Utilisateur restauré !', '', 'success');
        this.listeInactive.splice(index, 1);
      });
    }

  async onRefuse(idUser: number, index: number) {

    const content = {
      idOtherUser: idUser,
      item: "activ",
      value: 0
    };

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    this.apiService.postApi("user/admin", "deleteUser", content).then(() => {
      Toast.fire('Utilisateur supprimé !', '', 'success');
      this.listeInactive.splice(index, 1);
    });
  }
}
