import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NavbarComponent,
    // SidebarComponent,
    // FooterComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NavbarComponent,
    // SidebarComponent,
    // FooterComponent
  ],
  providers: [
    ClientService
  ]
})
export class SharedModule { }