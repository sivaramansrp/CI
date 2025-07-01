import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { AvisoDePrivacidadComponent } from '../../shared/components/aviso-de-privacidad/aviso-de-privacidad.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaComponent } from './components/datos-solicitud/datos-solicitud.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioImportacionRoutingModule } from './permiso-sanitario-importacion-routing.module';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';
import { ServiciosPermisoSanitarioService } from './services/servicios-permiso-sanitario.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    PasoTresComponent,
    SanitarioComponent,
    PasoDosComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    PermisoSanitarioImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    TituloComponent,
    DatosDeLaComponent,
    AvisoDePrivacidadComponent,
  ],
  providers: [
    ServiciosPermisoSanitarioService,
    ToastrService,
    CatalogosService,
    InicioSesionService,
    provideHttpClient(),
    SubirDocumentoService,
  ],
})
export class PermisoSanitarioImportacionModule {}
