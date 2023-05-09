import { NgModule } from '@angular/core';
import { AdminComponent} from './pages';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DriverComponent } from './pages/driver/driver.component';
import { PlaceComponent } from './pages/place/place.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { StdcodeComponent } from './pages/stdcode/stdcode.component';

const routes: Routes = [
  {   path: '', component: AdminComponent,
      children :[
          { path: 'dashboard', component: DashboardComponent},
          { path: 'customer', component: CustomerComponent},
          { path: 'driver', component: DriverComponent},
          { path: 'place', component: PlaceComponent},
          { path: 'userprofile', component: UserprofileComponent},
          { path: 'stdcode', component: StdcodeComponent}
          // { path: 'vendor', component: VendorComponent},
          // { path: 'Address', component: AddressComponent},
      ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
