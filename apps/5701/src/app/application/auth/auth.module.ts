import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from "../shared/components/firma-electronica/firma-electronica.component";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TituloComponent } from '../shared/components/titulo/titulo.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FirmaElectronicaComponent,
    RouterModule,
    TituloComponent,
    ToastrModule.forRoot(),
],
})
export class AuthModule { }
