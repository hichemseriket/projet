import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {Subject} from "rxjs";
import {ItemType, IUserInfo, TUserInfo} from "../../../../../core/user-system/IUser";
import {IApi} from "../../../../../core/IApi";
import {ApiService} from "../api/api.service";
import {UtilityService} from "../utility/utility-service.service";
import {TokenService} from "./token.service";
import {UserInfoClass} from "./user-info.class";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public User: UserInfoClass;
    public userList: UserInfoClass[];
    public adminSubject = new Subject<boolean>();
    private admin = false;

  constructor(private storage: Storage,
              private apiService: ApiService,
              private tokenService: TokenService,
              private router: Router,
              private utility: UtilityService) {

  }

    /**
     * Init the user service
     */
    public initService() {
        this.getDbUser()
            .then((res: IUserInfo) => {
                this.User = new UserInfoClass(res);
            });
    }


    /**
     * Return a boolean if user is logged
     */
    public isLogged(): boolean {
        return this.tokenService.isTokenNotExpired();
    }

    /**
     * Set a cookie and request the user data
     * @param token [string]
     */
    public createSession(token: string) {
        this.tokenService.setAuthToken(token);
        this.getDbUser().then((res: IUserInfo) => {
            this.User = new UserInfoClass(res);
        });
    }

    /**
     * Remove the cookie and set User null
     */
    public clearSession() {
        this.apiService.postApi('user', 'clearUser').then((res) => {
            if (res) {
                this.User = null;
                this.tokenService.clearAuthToken();
                this.utility.swalToastLittle(true, 'Vous êtes maintenant déconnecté');
                this.router.navigate(['/home']).then();
            }
        });
    }

    /**
     * Request to API for update a data of user
     * @param itemName [TUserInfo] = "name" | "firstName" | "groupId" | "role" | "activ"
     * @param itemValue [string | number]
     */
    public updateUSerInfo(itemName: ItemType , itemValue: string) {
        return new Promise((resolve) => {
            const content = {itemName, itemValue};
            this.apiService.postApi('user', 'updateUser', content).then((res: IApi) => {
                    if (res.success) {
                        this.User = new UserInfoClass(res.user);
                        resolve(true);
                    }
                });
        });
    }

    /**
     * Get all user in database
     */
    public getUsersList() {
        this.userList = [];
        this.apiService.postApi("user/admin", "getUsersList").then((result: IApi) => {
            if (result.success) {
                const list = result.usersList;
                list.forEach((user) => {
                    this.userList.push(new UserInfoClass(user));
                });
            }
        });
    }

    /**
     * Request to API for initialized the password
     * @param currentPassword [string]
     */
    public willUpdatePassword(currentPassword: string) {
        return new Promise((resolve) => {
           const content = {currentPassword};
           this.apiService.postApi("user", "updatePassword", content).then((res: IApi) => {
               if (res.success) {
                   resolve(true);
               }
           });
        });
    }

    /**
     * Request to API for initialized the mail
     * @param newMail [string]
     */
    public willUpdateMail(newMail: string) {
        return new Promise((resolve) => {
            const content = {newMail};
            this.apiService.postApi("user", "updateMail", content).then((res: IApi) => {
                if (res.success) {
                    resolve(true);
                }
            });
        });
    }

    public getUserById(id: number) {
        return new Promise((resolve: (user: IUserInfo) => void) => {
            const content = {userById: id};
            this.apiService.postApi('user', 'getUserById', content)
                .then((res: IApi) => {
                    if (res.success) {
                        resolve(res.user);
                    }
                });
        });
    }

    // PRIVATE ===========================================================

    /**
     * Get user to database in terms of user id
     */
    private getDbUser() {
        return new Promise((resolve: (user: IUserInfo) => void) => {
            const token = this.tokenService.getToken();
            if (token !== null && this.tokenService.isTokenNotExpired()) {
                const content = {token};
                this.apiService.postApi('user', 'getUser', content)
                    .then((res: IApi) => {
                        if (res.success) {
                            console.log(res.user);
                            resolve(res.user);
                        } else {
                            if (res.logger.logCode === "-->[Token expired]") {
                                this.clearSession();
                            }
                        }
                    });
            } else {
                this.clearSession();
            }
        });
    }

  // TEMPORAIRE ==========================================================
    /**
     * toogle adminstrator mode state
     * @param cb: return state of admin
     */
  public adminToogle(cb) {
      this.admin = !this.admin;
      this.emitAdminState();
      this.storage.set('adminState', this.admin);
      return cb(this.admin);
  }

    /**
     * emit admin state
     */
  public emitAdminState() {
      this.adminSubject.next(this.admin);
  }

    /**
     * Set admin state on storage
     * @param cb: return admin state
     */
  public getAdminStorage(cb) {
      this.storage.get('adminState')
          .then((val) => {
              if (!val) {
                  // do nothing
                  return cb(false);
              } else {
                  this.admin = val;
                  this.emitAdminState();
                  return cb(val);
              }
          });
  }
}
