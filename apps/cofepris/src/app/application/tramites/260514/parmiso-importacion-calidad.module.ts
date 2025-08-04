import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AvisoTercerosRelacionadosComponent } from '../../shared/components/aviso-terceros-relacionados/aviso-terceros-relacionados.component';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { NgModule } from '@angular/core';
import { PagoDerechosComponent } from '../../shared/components/pago-derechos/pago-Derechos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { ParmisoImportacionCalidadRoutingModule } from './parmiso-importacion-calidad-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { RepresentanteLegalRfcComponent } from '../../shared/components/representante-legal-rfc/representante-legal-rfc.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [DatosComponent, PantallasComponent, PasoDosComponent, PasoTresComponent

  ],
  imports: [CommonModule,
    ParmisoImportacionCalidadRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    PagoDerechosComponent,
    AvisoTercerosRelacionadosComponent,
    DatosDelEstablecimientoRFCComponent,
    DomicilioEstablecimientoAduanasComponent,
    ManifiestosComponent,
    RepresentanteLegalRfcComponent,
  ],
  providers: [
    provideHttpClient(),

    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
  ],
})
export class ParmisoImportacionCalidadModule { }
