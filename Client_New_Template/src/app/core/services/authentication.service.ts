import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { _const } from '../constants/constants';
import { EnumMPLSystem } from '../constants/enums';
import { ApiSSO, ExecCallApi } from '../helper/exec-call-api';
import { Helpers } from '../helper/helpers';
import { User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiSSO {
  private authenSSOAPI: string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private ssoAuthenModule: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private execCallApi: ExecCallApi
  ) {
    super();
    this.ssoAuthenModule = 'api/authentication';
    this.authenSSOAPI = environment.urlAPISSO;
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(_const.LOCAL_STORAGE.current_user) || '{}'));
    this.user = this.userSubject.asObservable();
  }

  /**
     * New func authen SSO login with params userName and password
     * @param {string} userName param userName login
     * @param {string} password param password login
     * @returns {object}
     */
  async loginWithParams(userName: string, password: string, systemId: string, ip: string): Promise<any> {

    let result = {
      error: false
      , data: {}
      , message: ""
    }

    if (Helpers.isNullOrEmpty(userName) || Helpers.isNullOrEmpty(password)) {
      result.error = true;
      result.message = 'Username or password can\'t not null';
      return result;
    }

    try {
      // Validate user login in server
      const data: any = await this.validateUserLoginAsync(userName, password, systemId, ip);

      if (data)
        result.data = data;
      else {
        result.error = true;
        result.message = 'Username or password is incorrect';
      }
    } catch (ex: any) {
      result.error = true;
      if (ex) {
        result.message = ex["error_description"];
      }
      else {
        result.message = ex.message;
      }
    }

    return result;
  }

  /**
     * Validate user login Async
     * @param {string} userName
     * @param {string} password
     */
  private async validateUserLoginAsync(userName: string, password: string,systemId: string , ip: string) {
    // Add header content-type, get params login
    // const headers = this.setHeaderLogin();
    // const params = await this.getParamsLogin(userName, password, systemId, ip);
    const obj = {
      "UserName": userName,
      "Password": password,
      "SystemId": systemId,
      "IPAddress": ip
    }

    const headers = new HttpHeaders().set('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers.append('Access-Control-Allow-Credentials', 'true');

    // Url API SSO use grantrefreshtoken
    // const endPoint = `${this.authenSSOAPI}api/Auth`;
    const endPoint = `${this.authenSSOAPI}auth`;
    const source$ = this.httpClient.post(endPoint, obj, { headers: headers });
    // const finalSource$ = await lastValueFrom(source$);
    const finalSource$ = source$.toPromise();

    return finalSource$;

    // return this.httpClient
    //   .post(endPoint, params, { headers: headers })
    //   .lastValueFrom();
  }

  /**
     * Get user info profile 
     * Method: GET
     * API: SSO/authentication
     * @param id user id current login
     */ 
  getUserInfoById(id: number) {
    this.isAuthenSSO = true;
    const endPoint = `${this.ssoAuthenModule}/userprofile/${id}`;
    return this.execCallApi.getDataApi(endPoint);
  }

  private setHeaderLogin(): any {
    let header = new Headers({
      'Content-Type': 'application/json'
    });

    return header;
  }

  private getParamsLogin(userName: string, password: string, systemId: string, ip: string): any {
    const body = new URLSearchParams();
    // body.set('grant_type', _const.APP_CONFIG.grant_type);
    body.set('UserName', userName);
    body.set('Password', password);
    body.set('SystemId', systemId);
    body.set('IPAddress', ip);
    // body.set('client_id', EnumMPLSystem.DEFAULT.toString());
    // body.set('ip', ip);
    return body.toString();
  }

  isUserLoggedIn(): boolean {
    let user = localStorage.getItem(_const.LOCAL_STORAGE.authen_info);
    return user != null;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authenInfo');
    localStorage.removeItem('currentmenus');
    this.router.navigate(['/account/login']);
  }

  /**
     * Change password user
     * Method: POST
     * API: SSO/authentication
     * @param model Model info
     */
   changePassword(model: any) {
    this.isAuthenSSO = true;
    const endPoint = `User/ChangePass`;
    return this.execCallApi.postDataApi(endPoint, model);
}
}