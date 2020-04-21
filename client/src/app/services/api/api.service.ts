import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {Platform} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IApi} from '../../../../../core/IApi';
import {ErrorManagerService} from '../error-manager/error-manager.service';
import {TokenService} from "../user/token.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // private domainMobile = 'http://' + environment.URL_API + ':' + environment.PORT_API;
    public domain = '';
    private httpHeader: HttpHeaders = null;


    constructor(private ngHttp: HttpClient,
                private ionHttp: HTTP,
                private errMan: ErrorManagerService,
                private platform: Platform,
                private tokenService: TokenService) {
        this.defineUrl();
    }

    /**
     * If environment production is true, set a ionic http request for mobile device, else, set a angular http request for browser.
     * Return Promise
     * @param target: string
     * @param action: string
     * @param contentPost: object
     */
    public postApi(target: string, action: string, contentPost?: any) {
        return new Promise((resolve) => {
            // check if contentPost exists
            if (contentPost === undefined) {contentPost = {}; }
            // check if token exists and set the http header
            if (this.tokenService.getToken() !== null && this.tokenService.isTokenNotExpired()) {
                this.httpHeader = new HttpHeaders({Authorization: this.tokenService.getToken()});
            }
            // push action in contentPost
            contentPost.action = action;
            // Post the request
            if (environment.production) {
                // if (this.platform.is('ios') || this.platform.is('android')) {
                this.ionPost(target, contentPost).then((response) => {
                    resolve(response);
                });
            } else {
                this.ngPost(target, contentPost)
                    .then((response) => {
                       resolve(response);
                });
            }
        });
    }

    /**
     * post request to node back-end and get the response. Post with http native's ionic.
     * Return Promise
     * @param target - string
     * @param contentPost - object
     */
    private ionPost(target: string, contentPost: any) {
        return new Promise((resolve) => {
          this.ionHttp.post(
              this.domain + '/' + target, contentPost,
              {'Content-Type': 'application/json', enctype: 'multipart/form-data', headers: this.httpHeader}
              ).then((data) => {
                  const result = JSON.parse(data.data);
                  if (result.logger) {
                      this.errMan.modalError(result.logger.logCode, result.logger.logMsg);
                      resolve({success: false});
                  } else {
                      resolve(result);
                  }
              })
              .catch((errorIonPost) => {
                  this.errMan.modalError(errorIonPost);
                  resolve({success: false});
              });
        });
    }

    /**
     * post request to node back-end and get the response. Post with httpClient's angular.
     * Return Promise
     * @param target - string
     * @param contentPost - object
     */
    private ngPost(target: string, contentPost: any) {
        return new Promise((resolve) => {
            this.ngHttp.post<IApi>(
                this.domain + '/' + target, contentPost,
                {headers: this.httpHeader}
                ).subscribe((result: IApi) => {
                if (result.logger) {
                    this.errMan.modalError(result.logger.logCode, result.logger.logMsg);
                    result.success = false;
                    resolve(result);
                } else {
                    resolve(result);
                }
            }, (errorNgPost) => {
                this.errMan.modalError(errorNgPost);
                resolve({success: false});
            });
        });
    }

    /**
     * get windows location url and define this for the request post to backend
     */
    private defineUrl() {
        let url = window.location.href;
        const regex = /.*.\/\/.*?\//;
        url = url.match(regex).toString();
        url = url.slice(0, -1);
        const regex2 = /(.{6}):/;
        if (url.match(regex2)) {
            url = url.match(/.*:/).toString();
            url = url.slice(0, -1);
        }
        if (environment.production) {
            this.domain = 'http://' + environment.URL_API + ':' + environment.PORT_API;
        } else {
            this.domain = url + ':' + environment.PORT_API;
        }
    }
}
