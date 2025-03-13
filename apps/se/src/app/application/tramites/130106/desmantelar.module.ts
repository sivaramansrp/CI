import { BtnContinuarComponent } from '@ng-mf/data-access-user';

import { DesmantelarRoutingModule } from './desmantelar-routing.module';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';

import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { NgModule } from '@angular/core';

import { Solicitante130106Component } from './pages/solicitante/solicitante.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';
import { DesmantelarComponent } from './pages/desmantelar/desmantelar.component';
import { DatosDeLaSolicitudeComponent } from './components/datos-de-la-solicitude/datos-de-la-solicitude.component';


@NgModule({
  declarations: [    
    DatosComponent,FirmarSolicitudComponent,DesmantelarComponent
  ],
  imports: [
    CommonModule,Solicitante130106Component,
    DesmantelarRoutingModule,
    BtnContinuarComponent,   
    TituloComponent,
    DatosDeLaSolicitudeComponent,
  
    WizardComponent,FirmaElectronicaComponent
  
  ],
  providers: [
    ToastrService
  ]
})
export class DesmantelarModule { }
