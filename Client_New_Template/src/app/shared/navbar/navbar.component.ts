import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AnnounceService } from 'src/app/admin/services/announce.service';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  currentUser: any = {};
  titleHeader: string = '';
  listannounece : any = {};
  companyId : string = '';
  
  constructor(config: NgbDropdownConfig, 
    private router: Router, 
    private appService: TitleHeaderPageService,
    private announceService : AnnounceService,
    ) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser' ) || '{}') ;
    this.companyId = JSON.parse(localStorage.getItem("authenInfo"))["userInfo"]["companyName"];
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.announceService.annount.subscribe(data => {
      this.listannounece = data;
    });
    this.toggleSidebar();
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
        // document.getElementById("menu-icon-cus").style.display = "display";
        $('.menu-icon-cus').css("display","block");
      } else {
        body.classList.remove('sidebar-icon-only');
        // document.getElementById("menu-icon-cus").style.display = "none";
        $('.menu-icon-cus').css("display","none");
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  Logout() {
    this.router.navigate(['/page/login']);
  }

  userprofile(){
    this.router.navigate(['/administrator/userprofile']);
  }


}
