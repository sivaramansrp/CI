import { BtnContinuarComponent, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DesmantelarComponent } from './pages/desmantelar/desmantelar.component';
import { DesmantelarRoutingModule } from './desmantelar-routing.module';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { FraccionComponent } from './components/fraccion/fraccion.component';
import { NgModule } from '@angular/core';

import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';



@NgModule({
  declarations: [    
    DatosComponent,FirmarSolicitudComponent,DesmantelarComponent
  ],
  imports: [
    CommonModule,FraccionComponent,
    DesmantelarRoutingModule,
    BtnContinuarComponent,   
    TituloComponent,
    DatosDeLaSolicitudComponent,
  
    WizardComponent,FirmaElectronicaComponent,SolicitanteComponent
  
  ],
  providers: [
    ToastrService
  ]
})
export class DesmantelarModule { }
