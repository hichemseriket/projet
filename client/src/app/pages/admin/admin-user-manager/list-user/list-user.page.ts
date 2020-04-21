import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {ApiModel} from "../../../../models/api.model";
import {ApiService} from "../../../../services/api/api.service";
import {Router} from "@angular/router";
import { IApi } from '../../../../../../../core/IApi';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {
  res: boolean;
  changedRole: number;
  choiceRole = "Tous";

  userList = [];
  groups = [];

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserList();
    this.getGroupList();
  }

  // Get groups from database
  getGroupList() {
    this.groups = [];
    this.apiService.postApi("group/admin", "getGroupsList").then((result: IApi) => {
      result.groupList.forEach((group) => {
        this.groups.push(group);
      });
    });
  }

  // Get users from database
  getUserList() {
    this.userList = [];
    this.apiService.postApi("user/admin", "getUsersList").then((result: IApi) => {
    result.usersList.forEach((user) => {
      this.userList.push(user);
      });
    });
    this.apiService.postApi("building", "getBuildingList").then((result: IApi) => {
      result.houseList.forEach((user) => {
        // console.log(user.idParcelle);
      })
     // console.log(result);
    });
    this.apiService.postApi("building", "addBuilding").then((result: IApi) => {
      // console.log("AAAAAAAAAAAA: " + result);
    });
  }

  // Select the role
  onRoleChoice(e) {
    this.choiceRole = e.target.value;
  }

  public changeRole(e, mail: string, index) {
    this.changedRole = +e.target.value;
    const content = {
      mail,
      role: this.changedRole
    };
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    this.userList[index].role = this.changedRole;
    this.apiService.postApi('guest', 'changeRole', content).then((res: ApiModel) => {
      if (res.success) {

        Toast.fire(
            '',
            'Droits de l\'utilisateur changés !',
            'success'
        );
      }
    });
  }

  onRouterLink(link) {
    this.router.navigate([link]);
  }
}
