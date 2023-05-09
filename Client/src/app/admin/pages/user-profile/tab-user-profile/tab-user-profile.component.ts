import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, SSOUserProfileService } from 'src/app/core/services';
import { CommonService } from 'src/app/core/services/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globalconst, Helpers } from 'src/app/core/helper';
import { ToastrService } from 'ngx-toastr';
import { _const } from 'src/app/core/constants';

@Component({
  selector: 'tab-user-profile',
  templateUrl: './tab-user-profile.component.html',
  styleUrls: ['./tab-user-profile.component.scss']
})
export class TabUserProfileComponent implements OnInit {

  @Input() model: any = {};
  dataSource: any = {};
  languages: any = [];
  languages1: any = [];
  // model: any = {};
  loading = false;
  vehicles: any = [];
  currentUser: any = {};

  @ViewChild('staticModal3')
  public modalAvatar3!: ModalDirective;

  constructor(
    private commonSvc: CommonService,
    public globals: Globalconst,
    private ssoAuthenSvc: AuthenticationService,
    private ssoUserProfile: SSOUserProfileService,
    private toastr: ToastrService) { 
      this.languages = this.globals._resources;
      this.currentUser = this.globals._userinfo;
  }

  ngOnInit(): void {
    // console.log("usser info", this.userInfo);
    // this.getLanguages();
    // this.getStdCode();

    // const employeeId = this.currentUser.employeeId;
    // if (employeeId) {
    //   // this.getUserLogin(employeeId);
    //   this.getInfoById(employeeId);
    //   // this.getOffboardNotice();
    // }
  }

  updateProfile() {
    this.loading = true;
    this.model.updateDate = null;
    this.model.createDate = null;

    this.ssoUserProfile.updateUserInfo(this.model).subscribe(
      () => {
        this.toastr.success(_const.NOTIFICATIONS.update_success, "info");
      },
      (      error: { [x: string]: string | undefined; }) => {
        this.toastr.error(error['message']);
      },
      () => {
        this.loading = false;
      }
    )
  }

  private getLanguages() {
    this.commonSvc.getLanguages().subscribe(
      (      data: { [x: string]: any; }) => {
        this.languages1 = data['payload'];
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

  private getInfoById(employeeId: number) {
    
    // this.ssoAuthenSvc.getUserInfoById(employeeId).subscribe(
    //   (      resData: { [x: string]: { userInfo: any; }; }) => {

    //     // Payload table[0]: info user
    //     if (Helpers.checkObjAPIsReturn(resData) && resData['payload'].userInfo) {
    //       let userInfo = resData['payload'].userInfo;
    //       // console.log('===> ', userInfo)
    //       userInfo.avartarThumbnail = userInfo.avartarThumbnail ? Helpers.getUrlImage(userInfo.avartarThumbnail) : this.globals._noAvatar;
    //       this.model = userInfo;
    //     }
    //   },
    //   (      error: { [x: string]: any; }) => {
    //     this.toastr.error(error['message'] ? error['message'] : error);
    //   }
    // )
  }

}
