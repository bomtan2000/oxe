import { Component } from '@angular/core';
import { Helpers } from 'src/app/core/helper';
import { _const } from './core/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'template-base-admin';

  constructor() {
    const objMenu = [
      {
        "menuId": "DB0001",
        "menuName": "DashBoard",
        "pageId": "Dashboard",
        "seqNo": null,
        "isGroup": "1",
        "prerentsMenu": "Dashboard",
        "del": true,
        "excel": true,
        "new": true,
        "preview": true,
        "sav": true,
        "systemId": "WB_MPI",
        "icon": "fa fa-dashboard",
        "tid": null,
        "component": "dashboard",
        "language": "Dashboard",
        "menuChils": []
      },
      {
        "menuId": "ITSR0001",
        "menuName": "Customer",
        "pageId": null,
        "seqNo": null,
        "isGroup": "1",
        "prerentsMenu": null,
        "del": false,
        "excel": false,
        "new": false,
        "preview": false,
        "sav": false,
        "systemId": "WB_MPI",
        "icon": "fa fa-wrench",
        "tid": null,
        "component": "customer",
        "language": "Customer",
        "menuChils": [
        ]
      },
      {
        "menuId": "ITSR0001",
        "menuName": "Driver",
        "pageId": null,
        "seqNo": null,
        "isGroup": "1",
        "prerentsMenu": null,
        "del": false,
        "excel": false,
        "new": false,
        "preview": false,
        "sav": false,
        "systemId": "WB_MPI",
        "icon": "fa fa-wrench",
        "tid": null,
        "component": "driver",
        "language": "Driver",
        "menuChils": [
        ]
      },
      {
        "menuId": "ITSR0001",
        "menuName": "Vendor",
        "pageId": null,
        "seqNo": null,
        "isGroup": "1",
        "prerentsMenu": null,
        "del": false,
        "excel": false,
        "new": false,
        "preview": false,
        "sav": false,
        "systemId": "WB_MPI",
        "icon": "fa fa-wrench",
        "tid": null,
        "component": "vendor",
        "language": "Vendor",
        "menuChils": [
        ]
      },

    ];
    Helpers.setLocalStorage(_const.LOCAL_STORAGE.current_menus, objMenu);
  }
  
}
