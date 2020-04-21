import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GroupManager} from "../../../../services/group-manager/group-manager";
import { ApiService } from 'src/app/services/api/api.service';
import { IApi } from '../../../../../../../core/IApi';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.page.html',
  styleUrls: ['./group-manager.page.scss'],
})
export class GroupManagerPage implements OnInit {
  suggestNeeded: boolean;
  validateNeeded: boolean;
  hideForm = true;
  public newGroupForm: FormGroup;

  groups = [];

  constructor(private formBuilder: FormBuilder, private groupeManager: GroupManager, private apiService: ApiService) {
  }

  get result() {
    return this.newGroupForm.controls;
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.getGroupList();
  }

  private buildForm() {
    this.newGroupForm = this.formBuilder.group({
      name: ''
    });
  }

  onSend() {
    const content = {
      name: this.result.name.value,
      validate: false,
      suggest: false,
      administrate: false
    };
    this.apiService.postApi("group/admin", "createGroup", content).then(() => {
      this.newGroupForm.reset();
      this.groups = [];
      this.getGroupList();
    });
  }

  // Callback suggestion's rights
  onSuggestCallback() {
    this.suggestNeeded = !this.suggestNeeded;
    this.validateNeeded = false;
  }

  onValidateCallback() {
    this.validateNeeded = !this.validateNeeded;
    this.suggestNeeded = false;
  }

  onCheckboxSuggest(groupId: number, changedValidate: boolean, groupName: number, changedSuggest: boolean, changedAdministrate: boolean) {

    changedSuggest = !changedSuggest;
    const content = {
      id: groupId,
      name: groupName,
      validate: changedValidate,
      suggest: changedSuggest,
      administrate: changedAdministrate
    };
    this.apiService.postApi("group/admin", "updateGroup", content).then(() => {
      this.groups = [];
      this.getGroupList();
    });
  }

  onCheckboxValidate(groupId: number, changedValidate: boolean, groupName: number, changedSuggest: boolean, changedAdministrate: boolean) {

    changedValidate = !changedValidate;
    const content = {
      id: groupId,
      name: groupName,
      validate: changedValidate,
      suggest: changedSuggest,
      administrate: changedAdministrate
    };
    console.log(content);
    this.apiService.postApi("group/admin", "updateGroup", content).then(() => {
      this.groups = [];
      this.getGroupList();
    });
  }

  onCheckboxAdministrate(groupId: number, changedValidate: boolean, groupName: number, changedSuggest: boolean, changedAdministrate: boolean) {

    changedAdministrate = !changedAdministrate;
    const content = {
      id: groupId,
      name: groupName,
      validate: changedValidate,
      suggest: changedSuggest,
      administrate: changedAdministrate
    };
    console.log(content);
    this.apiService.postApi("group/admin", "updateGroup", content).then(() => {
      this.groups = [];
      this.getGroupList();
    });
  }

  onRevealForm() {
    this.hideForm = !this.hideForm;
  }

  getGroupList() {
    this.groups = [];
    this.apiService.postApi("group/admin", "getGroupsList").then((result: IApi) => {
      result.groupList.forEach((group) => {
        this.groups.push(group);
      });
    });
  }

  onDeleteGroup(idGroup: number, changedValidate: boolean, groupName: number, changedSuggest: boolean, changedAdministrate: boolean) {
    const content = {
      id: idGroup,
      name: groupName,
      validate: changedValidate,
      suggest: changedSuggest,
      administrate: changedAdministrate
    };
    this.apiService.postApi("group/admin", "deleteGroup", content).then(() => {
      this.groups = [];
      this.getGroupList();
    });
  }

}
