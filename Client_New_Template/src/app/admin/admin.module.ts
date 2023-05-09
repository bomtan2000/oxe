import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Globalconst } from '../core/helper';
import { SSOUserProfileService } from '../core/services';
import { CommonService } from '../core/services/common.service';
import { UserProfileService } from '../core/services/userprofile.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DriverComponent } from './pages/driver/driver.component';
import { PlaceComponent } from './pages/place/place.component';
import { CustomerService } from './services/customer.service';
import { VendorService } from './services/vendor.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { StdcodeComponent } from './pages/stdcode/stdcode.component';
import { IpaddressService } from './services/ipaddress.service';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    FooterComponent,
    CustomerComponent,
    DriverComponent,
    PlaceComponent,
    UserprofileComponent,
    StdcodeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule,
    AgGridModule,
    ToasterModule,
  ],
  providers: [
    CustomerService,
    VendorService,
    Globalconst,
    CommonService,
    SSOUserProfileService,
    UserProfileService,
    ToasterService,
    IpaddressService
  ]
})
export class AdminModule { }
