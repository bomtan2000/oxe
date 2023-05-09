import { Component, OnInit } from '@angular/core';
import { _const } from 'src/app/core/constants';
import { Helpers } from 'src/app/core/helper';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {

  menus: any;
  currentuser: any;

  constructor() { }

  ngOnInit(): void {
    this.getLocalStorage();
  }

  private getLocalStorage() {
    this.currentuser = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user) || {};
    this.menus = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_menus);
  }

}
