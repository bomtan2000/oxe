import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import * as $ from 'jquery';
import { race } from 'rxjs';
import { AnnounceService } from 'src/app/admin/services/announce.service';
import { _const } from 'src/app/core/constants';
import { GlobalConstants } from 'src/app/core/constants/global/global-constants';
import { Helpers } from 'src/app/core/helper';
import { AnnounceModel } from 'src/app/core/models/announce';
import { AuthenticationService } from 'src/app/core/services';
import { UserProfileService } from 'src/app/core/services/userprofile.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { MenuService } from 'src/app/shared/services/menu.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {
  systemId: string = "WB_TMS";
  loading = false;
  isLoading = false;

  constructor(
            private clientService: ClientService, 
            private userProfileSvc: UserProfileService, 
            private authenticationService: AuthenticationService,
            private router: Router,
            private toaster: ToasterService,
            private announceService : AnnounceService,
            private menuService : MenuService,
            ) {
              this.toaster = toaster;
  }
  ngOnDestroy(): void {
    $("app-navbar").css("display", "block");
  }

  ngOnInit() {
    localStorage.clear();
    $("app-navbar").css("display", "none");
  }

  onSignIn(username: string, password: string) {

    if (!username || !password) {
      this.toaster.pop('warning', "Please enter username and password");
    }
    if (GlobalConstants.ipAddressCurrentUser == '') {
      this.raceMultipleServer().subscribe((res: any) => {
          this.userLoginProcess(username, password, this.systemId, this.mappingIpAddressMultiServer(res));
      });
    } else {
        this.userLoginProcess(username, password, this.systemId, GlobalConstants.ipAddressCurrentUser);
    }
  }

  raceMultipleServer() {
    let server_1 = this.clientService.getClientIPAddress();
    let server_2 = this.clientService.getClientIPAddressServerBackup();
    let server_3 = this.clientService.getClientIPAddressServerBackup2();
    let server_4 = this.clientService.getClientIPAddressServerBackup3();
    return race(server_1, server_2, server_3, server_4);
  }

  forgotPassword(username = "") {
    this.router.navigate(['page/request-verify'], { queryParams: {username: username}});
  }

  mappingIpAddressMultiServer(res: any) {
    if (res && res.hasOwnProperty('ip')) {
        return res['ip'];
    } else if(res && res.hasOwnProperty('ipAddress')) {
        return res['ipAddress'];
    }
  }

  private async userLoginProcess(userName: string, password: string, systemId: string, ip: string) {
    // Authentication username, password
    const objAuthen = await this.authenticateLogin(userName, password, systemId, ip);
    this.loading = false;
    if (!objAuthen) return;

    // console.log('objAuthen: ===> ', objAuthen)

    // Check access token
    if (objAuthen && objAuthen["userInfo"][_const.AUTHEN_FIELDS.user_id]) {
        const employeeId = objAuthen["userInfo"][_const.AUTHEN_FIELDS.user_id];

        // if (employeeId) {
        //     this.notification.success("Login successfull", _const.NOTIFICATIONS.title_default);
        //     this.router.navigateByUrl("/admin/dashboard");
        // }
        // Get info
        const objUserInfo = await this.getUserInfo(employeeId);
        if (objUserInfo) {
            let that = this; 
            Helpers.setLocalStorage(_const.LOCAL_STORAGE.current_user, objUserInfo);
            this.announceService.getAnnounce(employeeId)
            .subscribe({
              next(data: AnnounceModel) {
                that.announceService.updateAnnounce(data);
                that.router.navigateByUrl("/administrator/dashboard");
                this.getMenu();
              },
              error(msg) {
                this.router.navigateByUrl("/administrator/dashboard");
              }
            });
            this.router.navigateByUrl("/administrator/dashboard");
            // this.toaster.pop('success', "Login Successfuly",);
        } else {
            this.loading = false;
        }
    } else {
        this.loading = false;
    }
  }
  private getMenu() {
    let modelSearch : any = {}
        modelSearch.userId  = "2";
        modelSearch.systemCode = "WB_TMS",
    this.menuService.search(modelSearch).subscribe((res: any) => {
    });
  }

  private async getUserInfo(userId: number): Promise<any> {
    // Get user info
    const objUserInfo = await this.userProfileSvc.getAsyncUserInfoById(userId);

    if (objUserInfo)
        return objUserInfo;
    return null;
  }

  private async authenticateLogin(userName: string, password: string, systemId: string,ip: string): Promise<any> {
    const result = await this.authenticationService.loginWithParams(userName, password, systemId, ip);
    if (result["data"]["success"]) {
      if (result["data"]["content"]) {
        const objData = result["data"]["content"];
        // Set local storage authentication data
        this.toaster.pop('success', "Login Successfuly",);
        Helpers.setLocalStorage(_const.LOCAL_STORAGE.authen_info, objData);
        return objData;
      }
        // this.notification.error(result.message, _const.NOTIFICATIONS.title_default);
    } else {
      let errorMessage = result["data"]["errors"][0]["code"];
      this.toaster.pop('error', "Login Fail",errorMessage); 
            
    }

    return null;  
  }

}
