import { BtnContinuarComponent, InicioSesionService, SubirDocumentoService, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { AvisoTercerosRelacionadosComponent } from '../../shared/components/aviso-terceros-relacionados/aviso-terceros-relacionados.component';
import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { PagoDerechosComponent } from '../../shared/components/pago-Derechos/pago-Derechos.component';
import { RepresentanteLegalRfcComponent } from '../../shared/components/representante-legal-rfc/representante-legal-rfc.component';
import { ExportacionService } from '../../shared/services/exportacion.service';
import { DatosComponent } from './pages/datos/datos.component';
import { PantallasComponent } from './pages/Pantallas/Pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PermisoDeImportacionRoutingModule } from './permiso-de-importacion-routing.module';

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
    RepresentanteLegalRfcComponent,
    PagoDerechosComponent,
    AvisoTercerosRelacionadosComponent
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
