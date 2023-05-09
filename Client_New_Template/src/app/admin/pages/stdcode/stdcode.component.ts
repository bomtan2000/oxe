import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToasterService } from 'angular2-toaster';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import { StdcodeService } from '../../services/stdcode.service';

@Component({
  selector: 'app-stdcode',
  templateUrl: './stdcode.component.html',
  styleUrls: ['./stdcode.component.scss']
})
export class StdcodeComponent implements OnInit {
  
  dataSource =  [];
  modelAdd: any = {};
  modelSearch : any = {};
  public columnDefs: ColDef[] = [
    { field: 'id'},
    { field: 'codeDesc'},
    { field: 'codeGroup' },
    { field: 'codeId' },
    { field: 'createdBy' },
    { field: 'createDate' },
    { field: 'createdByName' },
    { field: 'remark' },
    { field: 'updateDate' },
    { field: 'updatedBy' },
    { field: 'updatedByName' },
  ];
  public rowData : any = [];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public cacheBlockSize = 10;
  public paginationPageSize = 20;

  constructor(
    private appService: TitleHeaderPageService,
    private modalService: NgbModal,
    private stdcodeService : StdcodeService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.appService.updateApprovalMessage("Std Code");
  }

  onGridReady(params: GridReadyEvent) {
    let modelSearch = {
      "codeGroup": "",
      "codeId": "",
      "codeDesc": ""
    } 
    this.stdcodeService.search(modelSearch).subscribe((res: any) => {
      this.rowData = res; 
    });
  }
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  addNewStd(f2 : any){
    let modelAdd :any = {}
      modelAdd.codeGroup = this.modelAdd.codeGroup,
      modelAdd.codeId = this.modelAdd.codeId,
      modelAdd.codeDesc = this.modelAdd.codeDesc,
      modelAdd.createdBy = 0,
      modelAdd.createDate = "2022-12-05T07:29:23.345Z",
      modelAdd.updatedBy = 0,
      modelAdd.updateDate = "2022-12-05T07:29:23.345Z",
      modelAdd.isValid = this.modelAdd.isValid,
      modelAdd.companyId = 0,
      modelAdd.remark = this.modelAdd.remark,
      modelAdd.createdByName = this.modelAdd.createdByName,
      modelAdd.updatedByName = this.modelAdd.updatedByName,
      modelAdd.seqNo = 0,
    this.stdcodeService.add(modelAdd).subscribe({
      next: (data:any) => {
          this.toaster.pop('success', 'Successfuly', '');
          this.modelAdd = {};
          f2.resetForm();
        },
      error: (e: any) => this.toaster.pop('error', 'Error', ''),
      complete: () => console.info('complete') 
      });
  }

  searchStd(type: string, value: string){
  let objModel = {};
  objModel[type] = value;
  this.stdcodeService.search(objModel).subscribe((res: any) => {
  this.rowData = res;
  this.modelSearch = {}
  });
  }
}
