import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, SelectPaisesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatosDeLaMercanciaComponent } from './components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';
import { PaisProcendenciaComponent } from './components/pais-procendencia/pais-procendencia.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
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
    DatosDeLaMercanciaComponent,
    DatosDelTramiteComponent,
    PaisProcendenciaComponent,
    PartidasDeLaMercanciaComponent,
    RepresentacionComponent
  ],
  exports: [
    SolicitudComponent
  ],
})
export class VehiculosUsadosAdaptadosModule{}