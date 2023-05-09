import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnumMPLSystem, _const } from 'src/app/core/constants';
import { GlobalConstants } from 'src/app/core/constants/global/global-constants';
import { Helpers } from 'src/app/core/helper';
import { AuthenticationService, SSOUserProfileService } from 'src/app/core/services';

@Component({
  selector: 'tab-password-change',
  templateUrl: './tab-password-change.component.html',
  styleUrls: ['./tab-password-change.component.scss']
})
export class TabPasswordChangeComponent implements OnInit {

  languages: any = [];
  loading: boolean = false;
  modelChangePass: any = {};
  model: any = {};
  currentUser: any = {};

  constructor(
    private ssoAuthenSvc: AuthenticationService,
    private toastr: ToastrService,
    private ssoUserProfileSvc: SSOUserProfileService,
  ) { }

  ngOnInit(): void {
  }
  private async getUserInfo(userId: number): Promise<any> {
    const model = {
        employeeId: userId
        , systemId: EnumMPLSystem.DEFAULT
    }
    // Get user info
    const objUserInfo = await this.ssoUserProfileSvc.getPrivateInfoAsync(model);

    if (Helpers.checkObjAPIsReturn(objUserInfo))
        return objUserInfo;

    return null;
}

  updatePassword(f2: any) {
    // this.modelChangePass.EmployeeId = this.model.employeeId;
    // this.modelChangePass.UpdateUser = this.currentUser.employeeId;
    // const curPass = localStorage.getItem('loginPasswordNewApp');

    // if(!this.modelChangePass.currentpassword){
    //   this.toastr.error("Current password wrong!", "Error");
    //   return;
    // }
    let model:any ={};
    model.password = this.model.current_password;
    model.updatedBy = this.model.new_password;
    model.userId = "2";
    model.IpAddress =  "14.241.226.211";
    model.SystemId = EnumMPLSystem.DEFAULT;
    let data = this.modelChangePass.currentpassword;
    this.ssoAuthenSvc.changePassword(model).subscribe({
      next: (data:any) => {
          // if (data["payload"] > 0) {
          //   this.toastr.success("Update password successfully !");
          // }
          this.toastr.success(_const.NOTIFICATIONS.update_success);
          this.modelChangePass = {};
          f2.resetForm();
        },
      error: (e: any) => this.toastr.error(_const.NOTIFICATIONS.update_fail, e.toString()),
      complete: () => console.info('complete') 
      }

    )
  }

}
