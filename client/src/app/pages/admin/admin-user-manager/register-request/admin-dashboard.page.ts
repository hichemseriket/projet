import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ApiModel} from "../../../../models/api.model";
import {ApiService} from "../../../../services/api/api.service";
import {UserManager} from "../../../../services/user-manager/user-manager";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  users: any[];
  masterCheck:boolean;

  constructor(private apiService: ApiService, private userManag: UserManager) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users = this.userManag.userList;
  }

  async onAccept(mail: string, data: number) {
    const content = {
      mail
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
    this.apiService.postApi('guest', 'addUser', content).then((res: ApiModel) => {
      if (res.success) {

        Toast.fire('Utilisateur ajouté !', '', 'success');
        this.users.splice(data, 1);
      } else {
        Toast.fire('Oups !', 'Une erreur est survenue', 'error');
      }
    });
  }

  onRefuse(data: number) {
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
    Toast.fire('Utilisateur refusé !', '', "success");
    this.users.splice(data, 1);
  }

  onAcceptSelection() {
    for(let user of this.users) {
      if(user.checked === true) {
        user.active = false;
      }
    }
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
    Toast.fire('Utilisateurs ajoutés !', '', 'success');
  }

  onRefuseSelection() {
    for(let user of this.users) {
      if(user.checked === true) {
        user.active = false;
      }
    }
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
    Toast.fire('Utilisateurs refusés !', '', "success");
  }

  onSelectAll() {
    for (let user of this.users) {
      user.checked = !this.masterCheck;
    }
  }
}
