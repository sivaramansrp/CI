import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, InicioSesionService, PasoCargaDocumentoComponent, PasoFirmaComponent, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { AvisoDePrivacidadComponent } from '../../shared/components/aviso-de-privacidad/aviso-de-privacidad.component';
import { AvisoTercerosRelacionadosComponent } from '../../shared/components/aviso-terceros-relacionados/aviso-terceros-relacionados.component';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaComponent } from '../../shared/components/datos-solicitud/datos-solicitud.component';
import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ExportacionService } from '../../shared/services/exportacion.service';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { NgModule } from '@angular/core';
import { PaginasComponent } from './pages/paginas/paginas.component';
import { PagoDeDerechosContenedoraComponent } from './components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PermisoDeImportacionRoutingModule } from './permiso-de-importacion-routing.module';
import { RepresentanteLegalRfcComponent } from '../../shared/components/representante-legal-rfc/representante-legal-rfc.component';
import { SharedPagoDerechosComponent } from '../../shared/components/shared-pago-derechos/shared-pago-derechos.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    DatosComponent,
    PaginasComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    PermisoDeImportacionRoutingModule,
    PasoCargaDocumentoComponent,
    PasoFirmaComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    SharedPagoDerechosComponent,
    AvisoTercerosRelacionadosComponent,
    DatosDelEstablecimientoRFCComponent,
    DomicilioEstablecimientoAduanasComponent,
    ManifiestosComponent,
    RepresentanteLegalRfcComponent,
    PagoDeDerechosContenedoraComponent,
    DatosDeLaComponent,
    AvisoDePrivacidadComponent,
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
