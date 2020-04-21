import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {UserClass} from "../../../services/user/user.class";
import {UserService} from "../../../services/user/user.service";
import {UtilityService} from "../../../services/utility/utility-service.service";
import {IApi} from "../../../../../../core/IApi";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

    @Input() User: UserClass = null;
    choseRole;
    groups = [];

  constructor(public userService: UserService,
              private apiService: ApiService,
              private utilityService: UtilityService) { }

    ngOnInit() { this.getGroupList(); }

    // Get groups from database
    getGroupList() {
        this.apiService.postApi("group/admin", "getGroupsList").then((result: IApi) => {
            result.groupList.forEach((group) => {
                this.groups.push(group);
            });
        });
    }

    public onUpdatePassword() {
        this.utilityService.swalInput("Par sécurité, saisissez votre mot de passe", "password")
            .then((password) => {
                setTimeout(() => {
                    this.utilityService.swalLoading();
                    this.userService.willUpdatePassword(password).then((res) => {
                        this.utilityService.swalToast(true, "Votre demande à été prise en compte. " +
                            "Vous allez recevoir un e-mail afin de poursuivre l'initialisation de votre mot de passe");
                    });
                }, 300);
            });
    }

    public onUpdateMail() {
        this.utilityService.swalInput("Saisissez votre nouvelle adresse e-mail", "email")
            .then((mail) => {
                setTimeout(() => {
                    this.utilityService.swalLoading();
                    this.userService.willUpdateMail(mail).then((res) => {
                        this.utilityService.swalToast(true, "Votre demande à été prise en compte. " +
                            "Vous allez recevoir un e-mail afin de confirmer votre nouvel e-mail");
                    });
                }, 300);
            });
    }

    // Change user's group (for admin only)
    public onChangeGroup(newGroup) {
        const group = Number(newGroup.target.value);

        const idOtherUser = this.User.Id;
        const content = {
            idOtherUser,
            item: "groupId",
            value: group
        };
        this.apiService.postApi("user/admin", "updateUser", content).then(() => {
        });
    }

    // PRIVATE ==========================================


}
