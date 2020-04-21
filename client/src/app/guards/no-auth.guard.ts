import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../services/user/user.service";
import {UtilityService} from "../services/utility/utility-service.service";

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private utility: UtilityService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.userService.isLogged()) {
      this.router.navigate(['/home']).then();
      this.utility.swalError("Vous devez vous deconnecter pour accèder à cette page.");
    } else {
      return true;
    }
  }
}
