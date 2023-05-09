import { Injectable, Injector } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { _const } from '../../constants/constants';
import { Helpers } from '../helpers';

@Injectable()
export class AuthService {
  // Assuming this would be cached somehow from a login call.
  public authTokenStale!: string; // stale auth token
  public authTokenNew!: string; // new_auth_token
  public currentToken!: string;

  constructor() {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
    let objData = Helpers.getLocalStorage(_const.LOCAL_STORAGE.authen_info);

    if (objData && objData[_const.AUTHEN_FIELDS.access_token])
      this.currentToken = objData[_const.AUTHEN_FIELDS.access_token];
    
    return this.currentToken;
  }

  refreshToken(): Observable<string> {

    //  this.authenticationService.refeshTokenAsync("").then(data=>{
    // 
    //  });
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */

    // this.currentToken = this.authTokenNew;

    return of(this.authTokenNew).pipe(delay(200));
  }
}