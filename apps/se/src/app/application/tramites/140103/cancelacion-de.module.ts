import { BtnContinuarComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CancelacionDeCertificateComponent } from './components/cancelacionde/cancelacion-de-certificado.component';
import { CancelacionDeComponent } from './pages/cancelacion/cancelacion-de.component';
import { CancelacionDeRoutingModule } from './cancelacion-de-routing.module';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { DevolverComponent } from './components/devolver/devolver.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { NgModule } from '@angular/core';
import { OficioComponent } from './components/oficio/oficio.component';
import { Solicitante140103Component } from './pages/solicitante/solicitante.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';


import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CancelacionDeComponent,
    DatosComponent,FirmarSolicitudComponent,
   
  ],
  imports: [
    CommonModule,Solicitante140103Component,
    CancelacionDeRoutingModule,
    BtnContinuarComponent,
    CancelacionDeCertificateComponent,
    TituloComponent,
    DevolverComponent,DetalleComponent,OficioComponent,
  
    WizardComponent,FirmaElectronicaComponent, ReactiveFormsModule,
    TablaDinamicaComponent
  
  ],
  providers: [
    ToastrService
  ]
})
export class CancelacionDeModule { }
