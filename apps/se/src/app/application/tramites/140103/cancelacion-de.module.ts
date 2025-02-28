import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';

import { CancelacionDeCertificateComponent } from './components/cancelacionde/cancelacion-de-certificate.component';
import { CancelacionDeComponent } from './pages/cancelacion/cancelacion-de.component';
import { CancelacionDeRoutingModule } from './cancelacion-de-routing.module';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { DevolverComponent } from './components/devolver/devolver.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { NgModule } from '@angular/core';
import { OficioComponent } from './components/oficio/oficio.component';
import { Solicitante140103Component } from './pages/solicitante/solicitante.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';


@NgModule({
  declarations: [
    CancelacionDeComponent,
    DatosComponent,FirmarSolicitudComponent,Solicitante140103Component
  ],
  imports: [
    CommonModule,
    CancelacionDeRoutingModule,
    BtnContinuarComponent,
    CancelacionDeCertificateComponent,
    TituloComponent,
    DevolverComponent,DetalleComponent,OficioComponent,
  
    WizardComponent,FirmaElectronicaComponent
  
  ],
  providers: [
    ToastrService
  ]
})
export class CancelacionDeModule { }
