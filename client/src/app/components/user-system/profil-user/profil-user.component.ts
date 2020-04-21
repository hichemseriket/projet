import {Component, Input, OnInit} from '@angular/core';
import {faEdit, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {ItemType} from "../../../../../../core/user-system/IUser";
import {UserInfoClass} from "../../../services/user/user-info.class";
import { UserService } from "../../../services/user/user.service";
import {UtilityService} from "../../../services/utility/utility-service.service";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],
})
export class ProfilUserComponent implements OnInit {

    @Input() User: UserInfoClass = null;
    readonly faEdit = faEdit;
    readonly faPencilAlt = faPencilAlt;
    public editMode = false;

  constructor(public userService: UserService,
              private utility: UtilityService) {
  }

    ngOnInit() {
        this.initUser();
    }

    public onEditItem(itemName: ItemType) {
        this.utility.swalInput('Mettre à jour les données suivantes :', 'text', this.userService.User[itemName])
            .then((result) => {
                this.utility.swalLoading();
                this.userService.updateUSerInfo(itemName, result)
                    .then((res) => {
                        this.utility.swalToast(true);
                    });
            });
    }

    /**
     * Enable or disable edit mode
     */
    public onEditToggle() {
        this.editMode = !this.editMode;
    }

    // PRIVATE ============================================================================

    private async initUser() {
        this.utility.swalLoading();
        const user = await this.userService.User;
        if (user) {
            this.utility.swalClose();
        }
    }

  }
