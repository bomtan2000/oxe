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
export class UserProfileService {

  private parentPath: string = 'api/User';

  constructor(private _httpClient: ApplicationHttpClient) {
  }

  async getAsyncUserInfoById(id: number) {
    const slash: string = "\\";
    const enpoint = `${environment.urlAPISSO}${this.parentPath}${slash}${id}`;
    return await this._httpClient.GetAsync(enpoint);
  }

  getUserInfoById(id: number) {
    const slash: string = "\\";
    const enpoint = `${environment.urlAPISSO}${this.parentPath}${slash}${id}`;
    return this._httpClient.Get(enpoint);
  }

}