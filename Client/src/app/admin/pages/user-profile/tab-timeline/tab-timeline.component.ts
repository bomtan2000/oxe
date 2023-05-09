import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Globalconst } from 'src/app/core/helper';
import { SSOUserProfileService } from 'src/app/core/services';

@Component({
  selector: 'tab-timeline',
  templateUrl: './tab-timeline.component.html',
  styleUrls: ['./tab-timeline.component.scss']
})
export class TabTimelineComponent implements OnInit {

  dataSourceUserLogin: any = {};
  currentUser: any = {};
  constructor(
    private toastr: ToastrService,
    private ssoUserProfile: SSOUserProfileService,
    public globals: Globalconst
  ) { 
    this.currentUser = this.globals._userinfo;
  }

  ngOnInit(): void {
    const employeeId = this.currentUser.employeeId;
    if (employeeId) {
      this.getUserLogin(employeeId);
    }
  }

  getUserLogin(employeeId: number) {
    if (!employeeId) {
      this.toastr.error('error', 'Get user login failed !');
      return;
    }

    this.ssoUserProfile.getUserLogin(employeeId).subscribe(
      (      data: { [x: string]: any; }) => {
        this.dataSourceUserLogin = data['payload'];
      }
    )

  }
  

}
