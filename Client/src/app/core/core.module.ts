import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationHttpClient } from './helper/base/http-client';
import { ExecCallApi } from './helper/exec-call-api';
import { SSOUserProfileService } from './services';
import { SSOCommonService } from './services/sso.common.service';
import { AlertComponent } from './components';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { LoaderService } from './services/loader.service';
import { CommonService } from './services/common.service';
// import { SignalRService } from './services/signalR.service';
import { MessageService } from './services/message.service';
import { Globalconst } from './helper/globalvariable';
import { TitleHeaderPageService } from './services/title-header-page.service';
import { UserProfileService } from './services/userprofile.service';



/**
 * === Core Module ===
 * The Services shared across the application must become part of the CoreModule.
 * The Services usually needs to be Singleton, Only one instance of the Service must exist.
 * The core module must be imported only in the root module. Other modules must not import the core modules.
 */

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerLoadingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ApplicationHttpClient,
    ExecCallApi,
    SSOUserProfileService,
    UserProfileService,
    SSOCommonService,
    LoaderService,
    CommonService,
    // SignalRService,
    MessageService,
    Globalconst,
    TitleHeaderPageService
  ],
  exports: [
    SpinnerLoadingComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() core:CoreModule ){
    if (core) {
        throw new Error("You should import core module only in the root module")
    }
  }
}
