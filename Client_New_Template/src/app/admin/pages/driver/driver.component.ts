import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToasterService } from 'angular2-toaster';
import { add } from 'lodash';
import { Observable } from 'rxjs';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent{

  dataSource =  [];
  modelAdd: any = {};
  modelSearch: any = {};
  public rowData : any = [];
  public cacheBlockSize = 10;
  public paginationPageSize = 20;

  public columnDefs: ColDef[] = [
    { field: "id"},
    { field: 'driverName'},
    { field: 'mobileNo' },
    { field: 'remark' },
    { field: 'createDate' },
    { field: 'updateDate' },
    { field: 'updatedBy' },
    { field: 'dob' },
    { field: 'button' },

  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    // editable: true
  };
  

  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private driverService: DriverService, 
    private modalService: NgbModal,
    private toaster: ToasterService,
    private appService: TitleHeaderPageService,
    ) {
      this.toaster = toaster;
    }

  ngOnInit(): void{
    this.appService.updateApprovalMessage("Driver");
  }
  

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {

    let modelSearch : any = {}
    modelSearch.driverName = "",
    modelSearch.phoneNumber = "",
    this.driverService.search(modelSearch).subscribe((res: any) => {
      this.rowData = res; 
    });
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void { 
    console.log('cellClicked', e);
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }
  

  addNewDriver(f2 : any){
    let modelAdd :any = {}
      modelAdd.driverName = this.modelAdd.driverName,
      modelAdd.mobileNo = this.modelAdd.mobileNo,
      modelAdd.dob = "2022-12-01T07:12:54.159Z",
      modelAdd.createDate = "2022-12-01T07:12:54.159Z",
      modelAdd.createBy = 0,
      modelAdd.plateNumber = this.modelAdd.plateNumber,
      modelAdd.equipemtType = this.modelAdd.equipemtType
      modelAdd.companyId = 0,
      modelAdd.driverIcno = this.modelAdd.driverIcno,
      modelAdd.licenseClass = this.modelAdd.licenseClass,
      modelAdd.remark = this.modelAdd.remark,
      modelAdd.referenceUserId = 0,
    this.driverService.add(modelAdd).subscribe({
      next: (data:any) => {
          this.toaster.pop('success', 'Successfuly', '');
          this.modelAdd = {};
          f2.resetForm();
        },
      error: (e: any) => this.toaster.pop('error', 'Error', ''),
      complete: () => console.info('complete') 
      });
  }

  // searchDriver(f1 : any){
  //   let modelSearch : any = {}
  //     modelSearch.driverName = this.modelSearch.driverName,
  //     modelSearch.mobileNo = "",
  //   this.driverService.search(modelSearch).subscribe((res: any) => {
  //   this.rowData = res;
  //   this.modelSearch = {}
  //   f1.resetForm();
  //   });
  // };

  searchDriver(type: string, value: string){
    let objModel = {};
    objModel[type] = value;
    this.driverService.search(objModel).subscribe((res: any) => {
        this.rowData = res;
        this.modelSearch = {}
    })
  }
}