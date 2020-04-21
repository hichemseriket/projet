import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-association',
  templateUrl: './association.page.html',
  styleUrls: ['./association.page.scss'],
})
export class AssociationPage implements OnInit {

  constructor(private userService: UserService) {

  }

  ngOnInit() {
  }

  /**
   * Event when we enter in this page
   */
  ionViewWillEnter() {
  }
}
