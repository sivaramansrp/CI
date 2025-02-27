import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasCapturaRoutingModule } from './pantallas-captura-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { NavComponent } from 'libs/shared/data-access-user/src/tramites/components/nav/nav.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { SelectCatalogosComponent } from 'libs/shared/data-access-user/src/tramites/components/select-catalogos/select-catalogos.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { SharedModule } from 'libs/shared/data-access-user/src/tramites/shared.module';
import { InputCheckComponent } from 'libs/shared/data-access-user/src/tramites/components/input-check/input-check.component';
import { InputHoraComponent } from 'libs/shared/data-access-user/src/tramites/components/input-hora/input-hora.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { AgregarTransporteComponent } from 'libs/shared/data-access-user/src/tramites/components/agregar-transporte/agregar-transporte.component';
import { RepresentanteFiscalComponent } from 'libs/shared/data-access-user/src/tramites/components/representante-fiscal/representante-fiscal.component';
import { SelectPaisesComponent } from 'libs/shared/data-access-user/src/tramites/components/select-paises/select-paises.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';

import { AgregarDestinatarioComponent } from './components/agregar-destinatario/agregar-destinatario.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    PasoUnoComponent,
    TransporteComponent,
    PagoDeDerechoComponent,
    AgregarDestinatarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PantallasCapturaRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    AlertComponent,
    FirmaElectronicaComponent,
    SelectCatalogosComponent,
    SolicitanteComponent,
    AnexarDocumentosComponent,
    InputCheckComponent,
    InputHoraComponent,
    InputFechaComponent,
    CrosslistComponent,
    AgregarTransporteComponent,
    RepresentanteFiscalComponent,
    SelectPaisesComponent,
    CatalogoSelectComponent,
  ],
  exports: [],
})
export class PantallasCapturaModule {}
