import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.page.html',
  styleUrls: ['./admin-header.page.scss'],
})
export class AdminHeaderPage implements OnInit {

  url: string;

  constructor(private router: Router, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    if (this.route) {
      if (typeof this.route.snapshot.component !== 'string') {
        this.url = this.route.snapshot.component.name;
      }
    }
  }
  onRouterLink(link) {
    this.router.navigate([link]);
  }
}
