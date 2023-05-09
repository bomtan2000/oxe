/*********************************************************
 * File Name: SSOUserProfileService
 * Created By: hau.le
 * Created Date: 20/02/2020
 * Description: All service user profile SSO API
 *********************************************************/

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationHttpClient } from '../helper/base/http-client';


@Injectable()
export class ForgetPasswordService {

  // private parentPath: string = 'Clients';
  private parentPath: string = 'user';

  constructor(private _httpClient: ApplicationHttpClient) {
  }

  sendMailVerify(model: any){
    const enpoint = `${environment.urlAPISSO}User/ResetPassword`;
    return this._httpClient.Post(enpoint, model);
  }

  createNewPassword(model: any){
    const enpoint = `${environment.urlAPISSO}User/ChangeUserPassWithGuiID`;
    return this._httpClient.Post(enpoint, model);
  }
}