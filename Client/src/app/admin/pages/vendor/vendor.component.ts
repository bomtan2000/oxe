import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { _const } from 'src/app/core/constants';
import { Helpers } from 'src/app/core/helper';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  @ViewChild("gridContainer") dataGrid!: DxDataGridComponent;

  dataSource =  [];
  currentuser = '';
  listVendorType: any[] = [
    {
      ID: 1,
      customerTypeCode: 'CompanyCode',
      customerTypeValue: 'Vendor Code',
    }, {
      ID: 2,
      customerTypeCode: 'CompanyName',
      customerTypeValue: 'Vendor Name',
    }, {
      ID: 3,
      customerTypeCode: 'Tel',
      customerTypeValue: 'Mobile No',
    }];
  searchModel: any = {};
  constructor(
    private appService: TitleHeaderPageService,
    private toastr: ToastrService,
    private customerService: VendorService) { }

  ngOnInit(): void {
    this.currentuser = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user)["userName"] || {};
    this.appService.updateApprovalMessage("Vendor");
    this.search();
  }

  search() {
    let modelSearch = {
      "ContactCode" :"NABATI",
      "CompanyCode": "",
      "CompanyName": "",
      "Tel" :"",
      "CompanyType" :"VENDOR"   
    } 

    if (this.searchModel['vendorType'] == "CompanyCode") {
      modelSearch['CompanyCode'] = this.searchModel['vendorValue'];
    } else if (this.searchModel['vendorType'] == "CompanyName") {
      modelSearch['CompanyName'] = this.searchModel['vendorValue'];
    } else if (this.searchModel['vendorType'] == "Tel") {
      modelSearch['Tel'] = this.searchModel['vendorValue'];
    }
    
    this.customerService.search(modelSearch).subscribe((res: any) => {
      this.dataSource = res['payload'];
    });
  }

  addCustomer(model: any) {

  }

  updateCustomer(eventName: any) {
   
  }

  deleteCustomer(model: any) {
    
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

    return objModelRaw;
  }

}
