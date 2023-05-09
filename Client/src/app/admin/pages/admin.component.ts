import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DataGrid from 'devextreme/ui/data_grid';
import * as moment from 'moment';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  constructor(
        private changeDetectorRef: ChangeDetectorRef,
        public commonSvc: CommonService
    ) {
    const that = this;
    const grid: any = DataGrid;
    grid.defaultOptions({
      options: {
        editing: {
          // allowUpdating: true,
          // allowDeleting:true,
          // allowAdding:true,
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        selection: {
          mode: 'single',
        },
        paging: {
          enable: true,
          pageSize: '20'
        },
        pager: {
          allowedPageSizes: [10, 20, 50, 100],
          showInfo: true,
          showPageSizeSelector: true,
        },
        onCellPrepared: function (e: { rowType: string; column: { command: string; dataType: string; }; row: { isEditing: any; }; cellElement: { innerText: any; querySelector: any }; value: any; }) {

          if (e.rowType === 'data' && e.column.command === 'edit') {
            const isEditing = e.row.isEditing,
              cellElement = e.cellElement;

            if (isEditing) {
              const saveLink = cellElement.querySelector('.dx-link-save'),
                cancelLink = cellElement.querySelector('.dx-link-cancel');

              saveLink.classList.add('dx-icon-save');
              cancelLink.classList.add('dx-icon-revert');

              saveLink.textContent = '';
              cancelLink.textContent = '';
            }else {
              const editLink = cellElement.querySelector('.dx-link-edit'),
                deleteLink = cellElement.querySelector('.dx-link-delete');
              if (editLink) {
                editLink.classList.add('dx-icon-edit');
                editLink.textContent = '';
              }
              if (deleteLink) {
                deleteLink.textContent = '';
                deleteLink.classList.add('dx-icon-trash');
              }
            }
          }
          if (e.rowType === 'data') {

            if (e.column.dataType === 'datetime3') {
              e.cellElement.innerText = moment.parseZone(e.value).local().format("DD/MM/YYYY")
            }
            if (e.column.dataType === 'datetime2') {
              e.cellElement.innerText = that.commonSvc.convertMilisecondToUTCDateTime2(e.value);
            }else if (e.column.dataType === 'date2') {
              e.cellElement.innerText = that.commonSvc.convertMilisecondToUTCDate2(e.value);
              // e.cellElement.innerText = (new Date(e.value)).toUTCString();// that.commonSvc.convertMilisecondToUTCDate(e.value);
            }
            if (e.column.dataType === 'time2') {
              e.cellElement.innerText = that.commonSvc.convertTime(e.value);
              // e.cellElement.innerText = (new Date(e.value)).toUTCString();// that.commonSvc.convertMilisecondToUTCDate(e.value);
            }
            if (e.column.dataType === 'time3') {
              e.cellElement.innerText = that.commonSvc.convertRealTime(e.value, null);
            }

          }
        },

      },
    });
  }

  ngOnInit(): void {
    this.body.classList.remove('login-page');
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000);
    
    
  }


}
