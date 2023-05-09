import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ToastrService } from 'ngx-toastr';
import { Globalconst } from 'src/app/core/helper';
import { DashboardService } from 'src/app/admin/services/dashboard.service';

@Component({
  selector: 'tab-user-setting',
  templateUrl: './tab-user-setting.component.html',
  styleUrls: ['./tab-user-setting.component.scss']
})
export class TabUserSettingComponent implements OnInit {

  simpleProducts!: DataSource;
  currentUser: any = {};
  model: any = {};
  treeDataSource: any = [
    {
      "ID": 1,
      "Name": "Inbound Status (Item Qty)",
      "Category": "OS"
    }, {
      "ID": 2,
      "Name": "Daily Outbound Volume(Item Qty)",
      "Category": "OS"
    }, {
      "ID": 3,
      "Name": "Volume by Province(Item Qty)",
      "Category": "OS"
    }, {
      "ID": 4,
      "Name": "In Progress Popular selling Item (Item Qty)",
      "Category": "OS"
    },
    {
      "ID": 5,
      "Name": "In Progress Inventoy By Item Code (Item Qty)",
      "Category": "OS"
    },

    {
      "ID": 6,
      "Name": "Vehicle Utilization ( # of trips)",
      "Category": "TE"
    },
    {
      "ID": 7,
      "Name": "Transport Order by Contact (# of orders)",
      "Category": "TE"
    },
    {
      "ID": 8,
      "Name": "Daily Transport Order (Item Qty)",
      "Category": "TE"
    },
    {
      "ID": 9,
      "Name": "Order chart by Contact (# of Orders)",
      "Category": "TE"
    },
    {
      "ID": 10,
      "Name": "Transport volume by Area (Item Qty)",
      "Category": "TE"
    },
    {
      "ID": 11,
      "Name": "Transport volume by ShipTo (Item Qty)",
      "Category": "TE"
    },

  ];

  constructor(
    private toastr: ToastrService,
    public globals: Globalconst,
    private dashboardService: DashboardService
  ) {
    this.currentUser = this.globals._userinfo;
  }

  ngOnInit(): void {

    // this.simpleProducts = new DataSource({
    //   store: new ArrayStore({
    //     data: this.treeDataSource,
    //     key: "id",
    //   }),
    //   group: "Category"
    // });
    // this.loadDashboardConfig();
  }

  loadDashboardConfig()
  {
      this.dashboardService.loadDashboardConfig(this.currentUser.employeeId).subscribe(
        data=>
        {
          if(data['LoadDashboardConfigResult']){
            this.model.typedashboard1 = JSON.parse(data['LoadDashboardConfigResult'].ValueReturn);
          }
          
        }
      )
  }

  saveTypeDashboard() {
    let model = {
      "username": this.currentUser.employeeId,
      "dashboardConfig": JSON.stringify(this.model.typedashboard1),
      "dashboardName": "WP_Dashboard",
    }
    this.dashboardService.saveDashboardConfig(model).subscribe(() => {
        this.toastr.success("Update Successfully", "Change Dashboard");
    });
  }

}
