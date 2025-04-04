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

import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalComponent } from '../../shared/components/representante-legal-rfc/representante-legal-rfc.component';  

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
    DatosDelEstablecimientoRFCComponent,
    DomicilioEstablecimientoAduanasComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent
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
