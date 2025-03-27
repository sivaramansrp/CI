import { ToastrModule, provideToastr } from 'ngx-toastr';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@ng-mf/data-access-user';
import { HeaderComponent } from '@ng-mf/data-access-user';
import { InformacionUsuarioComponent } from "@ng-mf/data-access-user";
import { NavComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { SolicitanteService } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";

import { PagoDeDerechos260402Service } from './shared/services/pago-de-derechos-260402.service';

@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent
  ],
  imports: [
    AkitaNgDevtools,
    AppRoutingModule,
    CommonModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    InformacionUsuarioComponent,
    InformacionUsuarioComponent,
    NavComponent,
    TituloComponent,
    ToastrModule.forRoot(),
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
    SolicitanteService,
    PagoDeDerechos260402Service
  ],
  bootstrap: [AppComponent],
})
export class AppCofeprisModule {}
