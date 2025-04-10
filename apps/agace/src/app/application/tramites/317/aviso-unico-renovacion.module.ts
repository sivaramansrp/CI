import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoUnicoRenovacionRoutingModule } from './aviso-unico-renovacion-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { AvisoDeRenovacionComponent } from './components/aviso-de-renovacion/aviso-de-renovacion.component';

import { AlertComponent, BtnContinuarComponent, InicioSesionService, ServiciosPantallasService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { AvisoUnicoService } from './services/aviso-unico.service';

@NgModule({
  declarations: [ DatosComponent,PantallasComponent],
  imports: [
    CommonModule,
    AvisoUnicoRenovacionRoutingModule,
    AvisoDeRenovacionComponent,
    SolicitanteComponent,
    AlertComponent,
  BtnContinuarComponent,
  TituloComponent,
  WizardComponent,
  PasoDosComponent,
  PasoTresComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
      ServiciosPantallasService,
      InicioSesionService,
      SubirDocumentoService,
     AvisoUnicoService
  ],
})
export class AvisoUnicoRenovacionModule { }
