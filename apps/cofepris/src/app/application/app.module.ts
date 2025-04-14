import { ToastrModule, provideToastr } from 'ngx-toastr';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { EstablecimientoService } from './shared/services/establecimiento.service';
import { FooterComponent } from '@ng-mf/data-access-user';
import { HeaderComponent } from '@ng-mf/data-access-user';
import { InformacionUsuarioComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';

import {provideHttpClient} from '@angular/common/http';

import { SolicitanteService } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';


import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';


import { PagoDeDerechosEntradaService } from './shared/services/pago-de-derechos-entrada.service';

@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent,
    
  ],
  imports: [
    AkitaNgDevtools,
    AppRoutingModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    InformacionUsuarioComponent,
    InformacionUsuarioComponent,
    NavComponent,
    TituloComponent,
    ToastrModule.forRoot(),
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent
],
  providers: [
    EstablecimientoService,
    PagoDeDerechosEntradaService,
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
    SolicitanteService,
  ],
  bootstrap: [AppComponent],
})
export class AppCofeprisModule {}
