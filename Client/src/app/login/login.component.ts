import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService, SSOUserProfileService } from '../core/services';
import { SSOCommonService } from '../core/services/sso.common.service';
import { _const } from '../core/constants/constants';
import { Helpers } from '../core/helper/helpers';
import { EnumMPLSystem } from '../core/constants/enums';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../shared/services/client.service';
import { race } from 'rxjs';  
import { GlobalConstants } from '../core/constants/global/global-constants';
import { UserProfileService } from '../core/services/userprofile.service';


// import { ToastrService } from 'ngx-toastr';
// import { NotificationService } from '../../services/notification.service';



@Component({ 
    selector: 'login', 
    templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit {
    body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    form!: FormGroup;
    loading = false;
    submitted = false;
    model: any = {};
    systemId: string = "WB_TMS";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private ssoCommonSvc: SSOCommonService,
        private authenticationService: AuthenticationService,
        private notification: ToastrService,
        private clientService: ClientService,
        private userProfileSvc: UserProfileService,
    ) { }

    ngOnInit() {

        this.raceMultipleServer().subscribe((res: any) => {
            GlobalConstants.ipAddressCurrentUser = this.mappingIpAddressMultiServer(res);
        });


        this.body.classList.add('login-page');
        this.body.classList.remove('skin-blue');
        this.body.classList.remove('sidebar-mini');
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    raceMultipleServer() {
        let server_1 = this.clientService.getClientIPAddress();
        let server_2 = this.clientService.getClientIPAddressServerBackup();
        let server_3 = this.clientService.getClientIPAddressServerBackup2();
        let server_4 = this.clientService.getClientIPAddressServerBackup3();
        return race(server_1, server_2, server_3, server_4);
    }

    mappingIpAddressMultiServer(res: any) {
        if (res && res.hasOwnProperty('ip')) {
            return res['ip'];
        } else if(res && res.hasOwnProperty('ipAddress')) {
            return res['ipAddress'];
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        const username = this.f['username'].value;
        const password = this.f['password'].value;
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        
        
        if (GlobalConstants.ipAddressCurrentUser == '') {
            this.raceMultipleServer().subscribe((res: any) => {
                this.userLoginProcess(username, password, this.systemId, this.mappingIpAddressMultiServer(res));
            });
        } else {
            this.userLoginProcess(username, password, this.systemId, GlobalConstants.ipAddressCurrentUser);
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
                Helpers.setLocalStorage(_const.LOCAL_STORAGE.current_user, objUserInfo);
                this.notification.success("Login successfull", _const.NOTIFICATIONS.title_default);
                this.router.navigateByUrl("/admin/dashboard");
            } else {
                this.notification.error("Login Fail");
                this.loading = false;
            }
        } else {
            this.notification.error("Login Fail");
            this.loading = false;
        }
    }

    getCommonData(data: any) {
        const menus: Observable<any> = this.ssoCommonSvc.getPageMenu(data?.userName, EnumMPLSystem.DEFAULT, _const.APP_CONFIG.plat_form_id, EnumMPLSystem.DEFAULT);

        return menus;
    }

    private setUserCommonData(objData: any) {
        // Get data common
        this.getCommonData(objData).subscribe(
            resData => {
                let _dataMenus;
                _dataMenus = JSON.stringify(resData?.payload);
                localStorage.setItem(_const.LOCAL_STORAGE.current_menus, _dataMenus);
                this.loading = false;
            },
            error => {
                this.notification.error(error['message'], 'Login');
                this.loading = false;
            }
        );
    }

    private async authenticateLogin(userName: string, password: string, systemId: string,ip: string): Promise<any> {
        const result = await this.authenticationService.loginWithParams(userName, password, systemId, ip);
        if (result.error) {
            this.notification.error(result.message, _const.NOTIFICATIONS.title_default);
            // this.loading = false;
        } else {

            if (result["data"] && result["data"]["content"]) {
                const objData = result["data"]["content"];

                // Set local storage authentication data
                Helpers.setLocalStorage(_const.LOCAL_STORAGE.authen_info, objData);
                return objData;
            }
            else
                this.notification.error('Data user info null', 'Login');
                console.log('Data user info null');
        }

        return null;
    }
    /**
   * Get user info after authentication ok
   * @param userId number user id
   */
    private async getUserInfo(userId: number): Promise<any> {
        // Get user info
        const objUserInfo = await this.userProfileSvc.getAsyncUserInfoById(userId);

        if (objUserInfo)
            return objUserInfo;
        return null;
    }
}