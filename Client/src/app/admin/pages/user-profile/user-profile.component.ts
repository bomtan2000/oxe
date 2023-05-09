import { Component, OnInit } from '@angular/core';
import { _const } from 'src/app/core/constants/constants';
import { Helpers } from 'src/app/core/helper/helpers';
import { AuthenticationService, SSOUserProfileService } from 'src/app/core/services';
import { CommonService } from 'src/app/core/services/common.service';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { UserProfileService } from 'src/app/core/services/userprofile.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any = {};
  model: any = {};
  subsidiaryInfoUser: any;
  loading = false;
  languages: any = [];
  vehicles: any = [];
  userInfo: any = {};

  constructor(
    private ssoUserProfile: SSOUserProfileService,
    // private notificationSerice: NotificationService,
    private commonSvc: CommonService,
    private ssoAuthenSvc: AuthenticationService,
    private userProfileSvc: UserProfileService,
    private appService: TitleHeaderPageService
  ) { }

  ngOnInit(): void {
    this.appService.updateApprovalMessage("User Profile");
    // this.getLanguages();
    // this.getStdCode();
    this.currentUser = JSON.parse(localStorage.getItem('authenInfo') || '{}');

    const employeeId = this.currentUser["userInfo"]["userId"];
    if (employeeId) {
      this.getInfoById(employeeId);
      this.model.displayName = this.currentUser["userInfo"]["displayName"];
      this.model.email = this.currentUser["userInfo"]["email"];

    }
  }

  private getInfoById(employeeId: number) {
    // this.ssoAuthenSvc.getUserInfoById(employeeId).subscribe(
    //   (      resData: { [x: string]: { userInfo: any; subsidiaryInfo: any }; }) => {

    //     // Payload table[0]: info user
    //     if (Helpers.checkObjAPIsReturn(resData) && resData['payload'].userInfo) {
    //       let userInfo = resData['payload'].userInfo;
    //       this.subsidiaryInfoUser = resData['payload'].subsidiaryInfo;
          
    //       // console.log('===> ', userInfo)
    //       userInfo.avartarThumbnail = userInfo.avartarThumbnail ? Helpers.getUrlImage(userInfo.avartarThumbnail) : _const.APP_CONFIG.no_avatar;
    //       this.model = userInfo;
          
    //     }
    //   },
    //   (      error: { [x: string]: any; }) => {
    //     // this.notificationSerice.showError(error['message'] ? error['message'] : error, _const.NOTIFICATIONS.title_default);
    //   }
    // )
    // Get user info
    this.userProfileSvc.getUserInfoById(employeeId).subscribe(data => {
      this.userInfo = data;
    });
  }

  updateProfile() {
    this.loading = true;
    this.model.updateDate = null;
    this.model.createDate = null;

    this.ssoUserProfile.updateUserInfo(this.model).subscribe(
      () => {
        // this.notificationSerice.showSuccess(_const.NOTIFICATIONS.update_success, "Info");
      },
      (error: { [x: string]: any; }) => {
        // this.notificationSerice.showError(error['message'], "Info");
      },
      () => {
        this.loading = false;
      }
    )
  }

  private getStdCode() {
    this.commonSvc.getStdcodesByCode('VEHICLETYPE').subscribe(
      (      data: { [x: string]: any; }) => {
        this.vehicles = data['payload'];
      }
    )
  }

  private getLanguages() {
    this.commonSvc.getLanguages().subscribe(
      (data: { [x: string]: any; }) => {
        this.languages = data['payload'];
      }
    )
  }

}
