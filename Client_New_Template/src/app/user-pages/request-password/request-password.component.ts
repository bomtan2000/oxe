import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ForgetPasswordService } from 'src/app/core/services/forget-password.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  user_name = '';
  constructor(private route: ActivatedRoute, private router: Router,private forgetService: ForgetPasswordService, private toaster: ToasterService) { }

  ngOnInit(): void {
    $("app-navbar").css("display", "none");
    this.route.queryParams.subscribe(data => {
      if (data && data["username"]) {
        this.user_name = data["username"];
      }
      
    });
    
  }
  
  ngOnDestroy(): void {
    $("app-navbar").css("display", "block");
  }

  requestVerifyEmail(username, email) {
    localStorage.setItem("email_forgot_password", email);
    this.forgetService.sendMailVerify({
      "loginId": username,
      "email": email
    }).subscribe({
      next: (x: any) => this.router.navigate(['page/notification-forget-password'],{ queryParams: {username: this.user_name, email: email}}),
      error: (err: Error) => {
        this.toaster.pop("error","Notification", err.message)
      } ,
      complete: () => console.log('Observer got a complete notification')
    });
    

    
  }

}
