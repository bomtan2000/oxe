import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { field: 'clientName' },
    { field: 'address' },
    { field: 'postalCode' },
    { field: 'contactPerson' },
    { field: 'mobileNo' },
    { field: 'updatedByName' },
    { field: 'country' },
    { field: 'createDate' },
    { field: 'createByName' },
  ];
  searchModel: any = {};
  dataSource =  [];
  modelAdd: any = {};
  modelSearch : any = {};

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public cacheBlockSize = 10;
  public paginationPageSize = 20;

  public rowData$: Observable<any[]>;
  public rowData: [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(
    private appService: TitleHeaderPageService,
    private http: HttpClient,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toaster: ToasterService
    ) { }

  ngOnInit(): void {
    this.appService.updateApprovalMessage("Customer");
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    let modelSearch : any = {}
        modelSearch.clientName = "",
        modelSearch.companyId = "",
        modelSearch.phone = "",
    this.customerService.search(modelSearch).subscribe((res: any) => {
      this.rowData = res; 
    });
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  // search() {
  //   let modelSearch = {
  //     "ContactCode" :"NABATI",
  //     "CompanyCode": "",
  //     "CompanyName": "",
  //     "Tel" :"",
  //     "CompanyType" :"CUSTOMER"   
  //   } 

  //   if (this.searchModel['customerType'] == "CompanyCode") {
  //     modelSearch['CompanyCode'] = this.searchModel['customerValue'];
  //   } else if (this.searchModel['customerType'] == "CompanyName") {
  //     modelSearch['CompanyName'] = this.searchModel['customerValue'];
  //   } else if (this.searchModel['customerType'] == "Tel") {
  //     modelSearch['Tel'] = this.searchModel['customerValue'];
  //   }
    
  //   this.customerService.search(modelSearch).subscribe(data => {
  //     console.log(data);
  //   });
  // }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  addNewCustomer(f1 : any){
    let modelAdd :any = {}
      modelAdd.clientName = this.modelAdd.clientName,
      modelAdd.address = this.modelAdd.address,
      modelAdd.mobileNo = this.modelAdd.mobileNo,
      modelAdd.postalCode = this.modelAdd.postalCode,
      modelAdd.contactPerson = this.modelAdd.contactPerson
      modelAdd.companyId = 0,
      modelAdd.country = this.modelAdd.country,
      modelAdd.createByName = this.modelAdd.createByName,
      modelAdd.updatedByName = this.modelAdd.updatedByName,
    this.customerService.add(modelAdd).subscribe({
      next: () => {
          this.toaster.pop('success', 'Successfuly', '');
          this.modelAdd = {};
          f1.resetForm();
        },
      error: () => this.toaster.pop('error', 'Error', ''),
      complete: () => console.info('complete') 
      });
  }

  searchCustomer(type: string, value: string) {

    let objModel = {};
    objModel[type] = value;

    this.customerService.search(objModel).subscribe((res: any) => {
      this.rowData = res; 
      this.modelSearch = {}
      // f1.resetForm();
    });

  }
}
