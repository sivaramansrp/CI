import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { AvisoTercerosRelacionadosComponent } from '../../shared/components/aviso-terceros-relacionados/aviso-terceros-relacionados.component';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ExportacionService } from '../../shared/services/exportacion.service';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { NgModule } from '@angular/core';
import { PagoDerechosComponent } from '../../shared/components/pago-Derechos/pago-Derechos.component';
import { PantallasComponent } from './pages/Pantallas/Pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PermisoDeImportacionRoutingModule } from './permiso-de-importacion-routing.module';
import { RepresentanteLegalRfcComponent } from '../../shared/components/representante-legal-rfc/representante-legal-rfc.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    PermisoDeImportacionRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    DatosDelEstablecimientoRFCComponent,
    DomicilioEstablecimientoAduanasComponent,
    ManifiestosComponent,
    RepresentanteLegalRfcComponent,
    PagoDerechosComponent,
    AvisoTercerosRelacionadosComponent,
    TituloComponent,
    AnexarDocumentosComponent, 
    AlertComponent,
    FirmaElectronicaComponent
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
