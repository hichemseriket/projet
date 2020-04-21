import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from "../services/user/user.service";
import {UtilityService} from "../services/utility/utility-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private utility: UtilityService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.userService.isLogged()) { // TODO : vérifier le token et le cookie a chaque routage
      return true;
    } else {
      this.router.navigate(['/home']).then();
      this.utility.swalError("Vous devez être identifié pour accéder à cette page.");
    }
  }
}
