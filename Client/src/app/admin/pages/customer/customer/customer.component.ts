import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/admin/services/customer.service';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';

import { _const } from 'src/app/core/constants';
import { GlobalConstants } from 'src/app/core/constants/global/global-constants';
import { Helpers } from 'src/app/core/helper';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @ViewChild("gridContainer") dataGrid!: DxDataGridComponent;

  dataSource =  [];
  currentuser = '';
  listCountry = [];
  listCustomerType: any[] = [
    {
      ID: 1,
      customerTypeCode: 'CompanyCode',
      customerTypeValue: 'Company Code',
    }, {
      ID: 2,
      customerTypeCode: 'CompanyName',
      customerTypeValue: 'Company Name',
    }, {
      ID: 3,
      customerTypeCode: 'Tel',
      customerTypeValue: 'Mobile No',
    }];
  searchModel: any = {};
  constructor(
    private appService: TitleHeaderPageService,
    private toastr: ToastrService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.currentuser = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user)["userName"] || {};
    this.appService.updateApprovalMessage("Customer");
    // this.getCountry();
    // this.search();
  }

  search() {
    let modelSearch = {
      "ContactCode" :"NABATI",
      "CompanyCode": "",
      "CompanyName": "",
      "Tel" :"",
      "CompanyType" :"CUSTOMER"   
    } 

    if (this.searchModel['customerType'] == "CompanyCode") {
      modelSearch['CompanyCode'] = this.searchModel['customerValue'];
    } else if (this.searchModel['customerType'] == "CompanyName") {
      modelSearch['CompanyName'] = this.searchModel['customerValue'];
    } else if (this.searchModel['customerType'] == "Tel") {
      modelSearch['Tel'] = this.searchModel['customerValue'];
    }
    
    this.customerService.search(modelSearch).subscribe((res: any) => {
      this.dataSource = res['payload'];
    });
  }

  getCountry() {
    this.customerService.getCountry().subscribe((res: any) => {
      this.listCountry = res['payload'];
    });
  }

  updateCustomer(eventName: any) {
    const updatedObject = Object.assign({}, eventName.oldData, eventName.newData);

    let objModel = this.mappingModelCustomer(updatedObject);

    this.customerService.update(objModel).subscribe({
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

  deleteCustomer(model: any) {
    // console.log(model);
    this.customerService.delete(model['key']).subscribe({
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

  mappingModelCustomer(modelInput: any) {
    let objModelRaw = {
        ContactCode : "NABATI",
        CompanyCode : "",
        CompanyName : "",
        Addr1 : "",
        Addr2 : "",
        Addr3 : "",
        Addr4 : "",
        City : "",
        Province : "",
        AreaCode : "",
        ZipCode : "",
        Country : "",
        Lat : "",
        Lon : "",
        CreateUser : this.currentuser,
        ContactPerson : "",
        Tel : "",
        Fax : "",
        SalesPerson : "",
        SalesPersonMobile : "",
        ShopType : "",
        CompanyType : "CUSTOMER",
        CompanyGroup : "",
    }

    modelInput["companyName"] ? objModelRaw.CompanyName = modelInput["companyName"] : null;
    modelInput["addr1"] ? objModelRaw.Addr1 = modelInput["addr1"] : null;
    modelInput["areaCode"] ? objModelRaw.ZipCode = modelInput["areaCode"] : null;
    modelInput["contactPerson"] ? objModelRaw.ContactPerson = modelInput["contactPerson"] : null;
    modelInput["tel"] ? objModelRaw.Tel = modelInput["tel"] : null;
    modelInput["companyCode"] ? objModelRaw.CompanyCode = modelInput["companyCode"] : null;
    modelInput["country"] ? objModelRaw.Country = modelInput["country"] : null;

    return objModelRaw;
  }

  addCustomer(model: any) {
    let objModel = this.mappingModelCustomer(model['data']);

    this.customerService.add(objModel).subscribe({
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

}
