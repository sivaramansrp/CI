import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from 'libs/shared/data-access-user/src/tramites/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';

import { TercerosComponent } from 'libs/shared/data-access-user/src/tramites/components/terceros/terceros.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { AgriculturaComponent } from './pages/agricultura/agricultura.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { InputCheckComponent } from 'libs/shared/data-access-user/src/tramites/components/input-check/input-check.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { SharedModule } from 'libs/shared/data-access-user/src/tramites/shared.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoCuatroComponent,
    AgriculturaComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    PagoDeDerechosComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FitosanitarioRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    InputCheckComponent,
    SelectCatalogosComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent
  ]
})
export class FitosanitarioModule { }