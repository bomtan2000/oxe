import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { EnumMPLSystem, _const } from 'src/app/core/constants';
import { Globalconst } from 'src/app/core/helper';
import { AuthenticationService, SSOUserProfileService } from 'src/app/core/services';
import { CommonService } from 'src/app/core/services/common.service';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { UserProfileService } from 'src/app/core/services/userprofile.service';
import { CustomerService } from '../services/customer.service';
import { IpaddressService } from '../services/ipaddress.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  model: any = {};
  dataSource: any = {};
  languages: any = [];
  languages1: any = [];
  // model: any = {};
  loading = false;
  vehicles: any = [];
  currentUser: any = {};
  modelChangePass: any = {};
  userID: string = "";
  
  public columnDefs: ColDef[] = [
    { field: 'userId' },
    { field: 'systemId' },
    { field: 'ipaddress' },
    { field: 'fromServer' },
    { field: 'createDate' },
    { field: 'remarks' },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public cacheBlockSize = 10;
  public paginationPageSize = 20;
  public rowData$: Observable<any[]>;
  public rowData: [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    let userNameLocal = JSON.parse(localStorage.getItem("currentUser"))["loginId"];
    let modelSearch : any = {
      userId: userNameLocal,
      systemId:"WB_TMS"
    }
    this.ipService.search(modelSearch).subscribe((res: any) => {
    this.rowData = res; 
    });
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }


  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  constructor(
    private commonSvc: CommonService,
    public globals: Globalconst,
    private ssoAuthenSvc: AuthenticationService,
    private ssoUserProfile: SSOUserProfileService,
    private userProfileSvc: UserProfileService,
    private toaster: ToasterService,
    private customerService: CustomerService,
    private appService: TitleHeaderPageService,
    private ipService : IpaddressService,
    ) { 
      this.languages = this.globals._resources;
      this.currentUser = this.globals._userinfo;
  }

  ngOnInit(): void {
    this.appService.updateApprovalMessage("User Profile");
    // this.getLanguages();
    // this.getStdCode();
    this.currentUser = JSON.parse(localStorage.getItem('authenInfo') || '{}');

    const employeeId = this.currentUser["userInfo"]["userId"];
    if (employeeId) {
      this.getInfoById(employeeId);
    }
  }

  private getInfoById(employeeId: number) {
    this.userProfileSvc.getUserInfoById(employeeId).subscribe(data => {
      this.currentUser = data;
      this.model.displayName = data["displayName"];
      this.model.firstName = data["firstName"];
      this.model.lastName = data["lastName"];
      this.model.mobileNo = data["mobileNo"];
      this.model.email = data["email"];
      this.model.userID = data["loginId"];
    });
  }

  
  updatePassword(f2: any) {
    let model:any ={};
    model.password = this.model.current_password;
    model.updatedBy = this.model.new_password;
    model.userId = "5121";
    model.IpAddress =  "14.241.226.211";
    model.SystemId = EnumMPLSystem.DEFAULT;
    let data = this.modelChangePass.currentpassword;
    this.userProfileSvc.changePass(model).subscribe({
      next: () => {
        this.toaster.pop("success", "Update Successful");
        this.modelChangePass = {};
        f2.resetForm();
        },
      error: (e: any) => {
        this.toaster.pop("error", "Update Fail");
      },
      complete: () => console.info('complete') 
      }

    )
  }
  updateProfile(f1 : any) {
    let model:any ={};
    model.updateDate = "2022-09-12T00:00:00";
    model.createDate = "2022-07-07T00:00:00";
    model.id = this.currentUser.id;
    model.loginId = this.currentUser.loginId;
    model.firstName = this.model.firstName;
    model.lastName = this.model.lastName;
    model.mobileNo = this.model.mobileNo;
    model.email = this.model.email;
    model.displayName = this.model.displayName;
    model.regType = "";
    model.createdBy =0;
    model.updatedBy =0;
    model.pwd = "123456";
        this.userProfileSvc.updateUserprofile(model).subscribe(
      () => {
        this.toaster.pop("success", "Update Successful");
      },
      () => {
        this.toaster.pop("error", "Update Fail");
        f1.resetForm();
      },
      () => {
        this.loading = false;
      }
    )
  }
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {
      console.log(file.name);

        // this.fileName = file.name;

        // const formData = new FormData();

        // formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
  }

  // getIpAddress(){
  //   let modelSearch : any = {}
  //       modelSearch.userId  = "thien.tran",
  //       modelSearch.systemId = "",
  //   this.customerService.search(modelSearch).subscribe((res: any) => {
  //   this.rowData = res; 
  //   });
  // }
}