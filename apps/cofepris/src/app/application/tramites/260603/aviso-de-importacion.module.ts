import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoDeImportacionRoutingModule } from './aviso-de-importacion-routing.module';

import {
  BtnContinuarComponent,
  InicioSesionService,
  SubirDocumentoService,
  WizardComponent,
} from '@libs/shared/data-access-user/src';

import { SolicitudeComponent } from './pages/solicitude/solicitude.component';

import { DatosPageComponent } from './pages/datos-page/datos-page.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

import { DatosDelEstablecimientoComponent } from '../../shared/components/datos-del-establecimiento/datos-del-establecimiento.component';
import { DomicilioDelEstablecimientoComponent } from '../../shared/components/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { TercerosRelacionadoComponent } from '../../shared/components/tercerosRelacionado/tercerosRelacionado.component';

import { RepresentanteLegalComponent } from '../../shared/components/representante-legal/representante-legal.component';
import { provideHttpClient } from '@angular/common/http';

import { DatosService } from '../../shared/services/datos.service';
import { ExportacionService } from '../../shared/services/exportacion.service';
import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [SolicitudeComponent, DatosPageComponent],
  imports: [
    CommonModule,
    AvisoDeImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    DatosDelEstablecimientoComponent,
    DomicilioDelEstablecimientoComponent,
    RepresentanteLegalComponent,
    TercerosRelacionadoComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  providers: [provideHttpClient(), DatosService, ExportacionService, InicioSesionService,
    SubirDocumentoService, ToastrService],
})
export class AvisoDeImportacionModule { }
