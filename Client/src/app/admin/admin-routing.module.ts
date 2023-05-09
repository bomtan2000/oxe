import { NgModule } from '@angular/core';
import { AdminComponent, DashboardComponent, UserProfileComponent } from './pages';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer/customer.component';
import { DriverComponent } from './pages/driver/driver/driver.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { AddressComponent } from './pages/address/address.component';

const routes: Routes = [
  {   path: '', component: AdminComponent,
      children :[
          { path: 'dashboard', component: DashboardComponent},
          { path: 'user-profile', component: UserProfileComponent},
          { path: 'customer', component: CustomerComponent},
          { path: 'driver', component: DriverComponent},
          { path: 'vendor', component: VendorComponent},
          { path: 'Address', component: AddressComponent},
      ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
