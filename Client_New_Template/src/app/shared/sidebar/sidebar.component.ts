import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  currentUser: any = {};
  
  constructor(
    private menuService : MenuService,
  ) { }

  ngOnInit() {
    this.getMenu();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser' ) || '{}') ;
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    }
    );
  }
  getMenu(){
    let modelSearch : any = {}
        modelSearch.userId  = "2";
        modelSearch.systemCode = "WB_TMS",
    this.menuService.search(modelSearch).subscribe((res: any) => {
    });
  }
}
