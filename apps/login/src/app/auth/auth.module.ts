import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from "@ng-mf/data-access-user";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';


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
providers: [
  ToastrService
]
})
export class AppLoginModule { }
