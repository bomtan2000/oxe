import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-notification-forget-password',
  templateUrl: './notification-forget-password.component.html',
  styleUrls: ['./notification-forget-password.component.scss']
})
export class NotificationForgetPasswordComponent implements OnInit {

  email_address: string = "";
  constructor(private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    $("app-navbar").css("display", "none");

    this.route.queryParams.subscribe(data => {
      if (data && data["email"]) {
        this.email_address = data["email"];
      }
      
    });
  }

  ngOnDestroy(): void {
    $("app-navbar").css("display", "block");
  }

}
