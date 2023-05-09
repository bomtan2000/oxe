import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToasterService } from 'angular2-toaster';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  dataSource =  [];
  modelAdd: any = {};
  modelSearch : any = {};
  public columnDefs: ColDef[] = [
    { field: 'id'},
    { field: 'contactPerson'},
    { field: 'mobileNo' },
    { field: 'country' },
    { field: 'postalcode' },
    { field: 'createDate' },
    { field: 'updateDate' },
    { field: 'updatedByName' },
    { field: 'placeDesc' },
    { field: 'remark' },
  ];
  public rowData : any = [];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public cacheBlockSize = 10;
  public paginationPageSize = 20;
  
  // Data that gets displayed in the grid

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private appService: TitleHeaderPageService,
    private placeService: PlaceService,
    private modalService: NgbModal,
    private toaster: ToasterService,
    ) { }

  ngOnInit(): void {
    this.appService.updateApprovalMessage("Place");
  }

  onGridReady(params: GridReadyEvent) {
    let modelSearch = {
      "contactPerson": "",
      "mobileNo" :"" 
    } 
    this.placeService.search(modelSearch).subscribe((res: any) => {
      this.rowData = res; 
    });
  }
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  addNewPlace(f2 : any){
    let modelAdd :any = {}
      modelAdd.placeDesc = this.modelAdd.placeDesc,
      modelAdd.address = this.modelAdd.address,
      modelAdd.postalcode = this.modelAdd.postalcode,
      modelAdd.contactPerson = this.modelAdd.contactPerson
      modelAdd.companyId = 0,
      modelAdd.clientsId = 0,
      modelAdd.mobileNo = this.modelAdd.mobileNo,
      modelAdd.country = this.modelAdd.country,
      modelAdd.remark = this.modelAdd.remark,
      modelAdd.createdByName = this.modelAdd.createdByName,
      modelAdd.updatedByName = this.modelAdd.updatedByName,
    this.placeService.add(modelAdd).subscribe({
      next: (data:any) => {
          this.toaster.pop('success', 'Successfuly', '');
          this.modelAdd = {};
          f2.resetForm();
        },
      error: (e: any) => this.toaster.pop('error', 'Error', ''),
      complete: () => console.info('complete') 
      });
  }

  searchPlace(type: string, value: string){
    let objModel = {};
    objModel[type] = value;
    this.placeService.search(objModel).subscribe((res: any) => {
    this.rowData = res;
    this.modelSearch = {}
    });
  };
}

