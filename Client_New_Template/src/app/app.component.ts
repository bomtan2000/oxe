import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo1';

  // showSidebar: boolean = true;
  showNavbar: boolean = true;
  // showFooter: boolean = true;
  isLoading: boolean;
  typeSelected: string;

  constructor(private router: Router, private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'timer';
    

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
          // this.isLoading = true;
          this.spinnerService.show();
      } else if (event instanceof RouteConfigLoadEnd) {
          // this.isLoading = false;
          this.spinnerService.hide();
      }
    });
  }



  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }

}
