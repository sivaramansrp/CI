import { BreadcrumbComponent, FirmaElectronicaComponent, FooterComponent, HeaderComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


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
