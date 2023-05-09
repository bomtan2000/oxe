import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ForgetPasswordService } from 'src/app/core/services/forget-password.service';
import { CustomValidators } from 'src/app/shared/helpers/passwordValidators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit,OnDestroy {

  private uuid: string;
  private user_name: string;

  profileForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  constructor(private route: ActivatedRoute, private router: Router, private forgetService: ForgetPasswordService, private toaster: ToasterService) { }


  ngOnDestroy(): void {
    $("app-navbar").css("display", "block");
  }

  ngOnInit() {
    //localStorage.clear();
    $("app-navbar").css("display", "none");
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  createNewPassword(password) {
    let objNewPass = {
      "systemId" : "WB_TMS",
      "ipAddress" : "14.241.226.211",
      "verifyGuiId": this.uuid,
      "pwd": password
    }
    this.forgetService.createNewPassword(objNewPass).subscribe(data => {
      this.toaster.pop("success", "Change password successful!", "Website will automatically navigate to login page in 3 seconds.");
      setTimeout(() => {
        this.router.navigate(['page/login']);
      }, 3000);
    });
  }

  get passwordMatchError() {
    let password = this.profileForm.get('password');
    let confirmPassword = this.profileForm.get('confirmPassword');
    return (
      this.profileForm.getError('mismatch') &&
      this.profileForm.get('confirmPassword')?.touched
    );
  }

  get passwordRequiredError() {
    return (
      this.profileForm.get('password').errors
    );
  }

  get passwordComfirmRequiredError() {
    return (
      this.profileForm.get('confirmPassword').errors
    );
  }

}
