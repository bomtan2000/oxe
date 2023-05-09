import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from 'src/app/admin/services/driver.service';
import { _const } from 'src/app/core/constants';
import { Helpers } from 'src/app/core/helper';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  
  @ViewChild("gridContainer") dataGrid!: DxDataGridComponent;

  dataSource =  [];
  currentUserId = '';
  listDriverType: any[] = [
    {
      ID: 1,
      customerTypeCode: 'StaffName',
      customerTypeValue: 'Staff Name',
    },
    {
      ID: 2,
      customerTypeCode: 'MobileNo',
      customerTypeValue: 'Mobile No',
    }
  ];
  searchModel: any = {};
  constructor(
    private appService: TitleHeaderPageService,
    private toastr: ToastrService,
    private driverService: DriverService) { }

  ngOnInit(): void {
    this.currentUserId = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user)["userid"] || {};
    this.appService.updateApprovalMessage("Driver");
    this.search();
  }

  search() {
    let modelSearch = {
      "id" :"0",
      "driverName": "",
      "phoneNumber" :"" 
    } 

    switch (this.searchModel['driverType']) {
      case "StaffId":
        modelSearch['id'] = this.searchModel['driverValue'];
        break;
      case "StaffName":
        modelSearch['driverName'] = this.searchModel['driverValue'];
        break;
      case "MobileNo":
        modelSearch['phoneNumber'] = this.searchModel['driverValue'];
        break;
  
      default:
        break;
    }

    this.driverService.search(modelSearch).subscribe((res: any) => {
      this.dataSource = res;
    });
    
  }

  updateDriver(eventName: any) {
    const updatedObject = Object.assign({}, eventName.oldData, eventName.newData);

    let objModel = this.mappingModelDriver(updatedObject);

    this.driverService.update(objModel).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        console.error(e);
        this.toastr.error(_const.NOTIFICATIONS.update_fail);
      },
      complete: () => {
        this.toastr.success(_const.NOTIFICATIONS.update_success);
      }
    });
  }

  mappingModelDriver(modelInput: any) {
    let objModelRaw = {
      id : "",
      driverName : "", 
      mobileNo : "",
      dob : "",
      plateNumber : "",
      companyId : "",
      driverIcno : "",
      licenseClass : "",
      remark : "",
      referenceUserId : "",
      attach1 : "",
      attach2 : "",
      attach3 : "",
      attach4 : "",
      customField01 : "",
      customField02 : "",
      customField03 : "",
      customField04 : "",
      customField05 : "",
    }

    modelInput["staffName"] ? objModelRaw.driverName = modelInput["staffName"] : null;
    modelInput["mobileNo"] ? objModelRaw.mobileNo = modelInput["mobileNo"] : null;
    modelInput["Remark"] ? objModelRaw.remark = modelInput["Remark"] : null;

    return objModelRaw;
  }

  addDriver(model: any) {
    let objModel = this.mappingModelDriver(model['data']);

    this.driverService.add(objModel).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        console.error(e);
        this.toastr.error(_const.NOTIFICATIONS.save_fail);
      },
      complete: () => {
        this.toastr.success(_const.NOTIFICATIONS.save_success);
      }
    });
  }

  deleteDriver(model: any) {
    // console.log(model);
    this.driverService.delete(model['data']['id']).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        console.error(e);
        this.toastr.error(_const.NOTIFICATIONS.delete_fail);
      },
      complete: () => {
        this.toastr.success(_const.NOTIFICATIONS.update_success);
      }
    });
  }

}
