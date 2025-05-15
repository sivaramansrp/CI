import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    AkitaNgDevtools,
    AuthRoutingModule,
    BreadcrumbComponent,
    CommonModule,
    FirmaElectronicaComponent,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    ToastrModule.forRoot(),
],
providers: [
  ToastrService
]
})
export class AppLoginModule { }
