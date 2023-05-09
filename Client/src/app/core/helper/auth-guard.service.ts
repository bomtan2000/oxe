import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuardService implements CanLoad {

  constructor(
    private authService: AuthenticationService
    , private router: Router
  ) {
  }

  canLoad(route: Route): boolean {
    let url: string = location.pathname;
    //console.log('Url:' + url);
    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    //this.authService.setRedirectUrl(url);
    //this.router.navigate([this.authService.getLoginUrl()]);
    this.router.navigate(['/login']);
    return false;
  }
} 