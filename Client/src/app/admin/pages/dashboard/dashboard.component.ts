import { Component, OnInit } from '@angular/core';
import { TitleHeaderPageService } from 'src/app/core/services/title-header-page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private appService: TitleHeaderPageService) { }


  ngOnInit(): void {
    this.appService.updateApprovalMessage("Dashboard");
  }

}
