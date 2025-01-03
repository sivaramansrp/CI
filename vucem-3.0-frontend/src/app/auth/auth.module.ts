import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { TituloComponent } from '../shared/components/titulo/titulo.component';
import { FirmaElectronicaComponent } from "../shared/components/firma-electronica/firma-electronica.component";



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    TituloComponent,
    FirmaElectronicaComponent,
]
})
export class AuthModule { }
