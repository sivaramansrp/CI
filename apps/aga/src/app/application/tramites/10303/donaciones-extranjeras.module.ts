import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from '@ng-mf/data-access-user';
// import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
// import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { DatosDelFabricanteComponent } from './components/datos-del-fabricante/datos-del-fabricante.component';
import { DatosDonanteExtranjeroComponent } from './components/datos-donante-extranjero/datos-donante-extranjero.component';
import { DatosDonatarioComponent } from './components/datos-donatario/datos-donatario.component';
import { DatosPersonaOirRecibirComponent } from './components/datos-persona-oir-recibir/datos-persona-oir-recibir.component';
import { DatosRepLegalDonatarioComponent } from './components/datos-rep-legal-donatario/datos-rep-legal-donatario.component';
import { DatosRepLegalRecibirDonacionComponent } from './components/datos-rep-legal-recibir-donacion/datos-rep-legal-recibir-donacion.component';
import { DonacionesExtranjerasRoutingModule } from './donaciones-extranjeras-routing.module';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroDeDonacionComponent } from './components/registro-de-donacion/registro-de-donacion.component';
import { RegistroSolicitudPageComponent } from './pages/registro-solicitud-page/registro-solicitud-page.component';
import { SharedModule } from 'libs/shared/data-access-user/src/tramites/shared.module';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';


@NgModule({
  declarations: [
    RegistroDeDonacionComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    RegistroSolicitudPageComponent,
    DatosDonanteExtranjeroComponent,
    DatosDonatarioComponent,
    DatosRepLegalDonatarioComponent,
    DatosRepLegalRecibirDonacionComponent,
    DatosPersonaOirRecibirComponent,
    DatosDelFabricanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DonacionesExtranjerasRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent,
    InputFechaComponent
  ]
})
export class DonacionesExtranjerasModule { }
