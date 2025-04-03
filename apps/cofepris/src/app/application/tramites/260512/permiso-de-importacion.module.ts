import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PermisoDeImportacionRoutingModule } from './permiso-de-importacion-routing.module';

import { DatosComponent } from './pages/datos/datos.component';

import { BtnContinuarComponent, InicioSesionService, SubirDocumentoService, WizardComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

import { PantallasComponent } from './pages/Pantallas/Pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { provideHttpClient } from '@angular/common/http';

import { ExportacionService } from '../../shared/services/exportacion.service';
import { ToastrService } from 'ngx-toastr';

import { DatosDelEstablecimientoComponent } from '../../shared/components/datos-del-establecimiento/datos-del-establecimiento.component';
import { DomicilioComponent } from '../../shared/components/domicilio-establecimiento/domicilio-establecimiento.component'
@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
  ],
  imports: [
    CommonModule,
    PermisoDeImportacionRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    PasoDosComponent,
    PasoTresComponent,
    DatosDelEstablecimientoComponent,
    DomicilioComponent
  ],
  providers: [
    provideHttpClient(),
    InicioSesionService,
    SubirDocumentoService,
    ExportacionService, 
    ToastrService
  ],

})
export class PermisoDeImportacionModule { }
