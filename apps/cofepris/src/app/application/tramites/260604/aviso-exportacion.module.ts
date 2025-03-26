import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoExportacionRoutingModule } from './aviso-exportacion-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { DatosComponent } from './pages/datos/datos.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  ServiciosPantallasService,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,} from '@libs/shared/data-access-user/src';

// import { TercerosRelacionadoComponent } from './components/tercerosRelacionado/tercerosRelacionado.component';
import { TercerosRelacionadoComponent } from '../../shared/components/tercerosRelacionado/tercerosRelacionado.component'


import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { ExportacionService } from '../../shared/services/exportacion.service';

@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    
    
  ],
  imports: [
  CommonModule,
  HttpClientModule,  
  AvisoExportacionRoutingModule,
  AlertComponent,
  BtnContinuarComponent,
  // TituloComponent,
  WizardComponent,
  TercerosRelacionadoComponent,
 
  SolicitanteComponent,
  PasoDosComponent,
  PasoTresComponent,
  
],
providers: [
 ToastrService,
//  provideHttpClient(),
  ServiciosPantallasService,
  ExportacionService
],
})
export class AvisoExportacionModule {}
