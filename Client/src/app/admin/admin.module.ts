import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin.component';
import { DashboardComponent, UserProfileComponent } from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './directives/header/header.component';
import { MenuLeftComponent } from './directives/menu-left/menu-left.component';
import { FooterComponent } from './directives/footer/footer.component';
import { LogoComponent } from './directives/logo/logo.component';
import { TabUserProfileComponent } from './pages/user-profile/tab-user-profile/tab-user-profile.component';
import { TabPasswordChangeComponent } from './pages/user-profile/tab-password-change/tab-password-change.component';
import { TabTimelineComponent } from './pages/user-profile/tab-timeline/tab-timeline.component';
import { TabAnnouncementComponent } from './pages/user-profile/tab-announcement/tab-announcement.component';
import { TabNotificationComponent } from './pages/user-profile/tab-notification/tab-notification.component';
import { TabUserSettingComponent } from './pages/user-profile/tab-user-setting/tab-user-setting.component';

import { DxDataGridModule, DxSchedulerModule, DxTreeListModule, DxButtonModule, DxNumberBoxModule, DxTagBoxModule, DxValidatorModule, DxTextBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxDateBoxModule, DxSwitchModule, DxPopupModule, DxCalendarModule, DxTemplateModule } from 'devextreme-angular';
import { DashboardService } from './services/dashboard.service';
import { CustomerComponent } from './pages/customer/customer/customer.component';
import { DriverComponent } from './pages/driver/driver/driver.component';
import { CustomerService } from './services/customer.service';
import { VendorComponent } from './pages/vendor/vendor.component';
import { AddressComponent } from './pages/address/address.component';
import { VendorService } from './services/vendor.service';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    UserProfileComponent,
    HeaderComponent,
    MenuLeftComponent,
    FooterComponent,
    LogoComponent,
    TabUserProfileComponent,
    TabPasswordChangeComponent,
    TabTimelineComponent,
    TabAnnouncementComponent,
    TabNotificationComponent,
    TabUserSettingComponent,
    CustomerComponent,
    DriverComponent,
    VendorComponent,
    AddressComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    // Dev-Express
    DxDataGridModule, DxSchedulerModule, DxTreeListModule, DxButtonModule, DxNumberBoxModule, DxValidatorModule, DxTextBoxModule, DxSelectBoxModule, DxTagBoxModule,
    DxDateBoxModule, DxSwitchModule, DxPopupModule, DxCalendarModule, DxTemplateModule
  ],
  providers: [
    DashboardService,
    CustomerService,
    VendorService
  ]
})
export class AdminModule { }
