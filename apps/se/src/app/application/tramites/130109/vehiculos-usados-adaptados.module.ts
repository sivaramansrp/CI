import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, SelectPaisesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetosDelLaMarcaciaComponent } from './components/datos-de-la-mercacia/datos-de-la-mercacia.component';
import { DetosDelTramiteComponent } from './components/detos-del-tramite/detos-del-tramite.component';
import { PaisProcendenciaComponent } from './components/pais-procendencia/pais-procendencia.component';
import { PartidasDeLaComponent } from './components/partidas-de-la/partidas-de-la.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentacionComponent } from './components/representacion/representacion.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { VehiculosUsadosAdaptadosRoutingModule } from './vehiculos-usados-adaptados-routing.module';

@NgModule({
  declarations: [
    PasoUnoComponent,
    SolicitudPageComponent,
    SolicitudComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VehiculosUsadosAdaptadosRoutingModule,
    WizardComponent,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    TituloComponent,
    SelectPaisesComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    DetosDelLaMarcaciaComponent,
    DetosDelTramiteComponent,
    PaisProcendenciaComponent,
    PartidasDeLaComponent,
    RepresentacionComponent
  ],
  exports: [
    SolicitudComponent
  ],
})
export class VehiculosUsadosAdaptadosModule{}