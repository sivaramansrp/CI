import { CarrosDeFerrocarrilComponent } from './shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialInspeccionFisicaComponent } from './shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { InspeccionFisicaComponent } from './pages/inspeccion-fisica/inspeccion-fisica.component';
import { InspeccionFisicaRoutingModule } from './inspeccion-fisica-routing.module';
import { MedioTransporteComponent } from './shared/medio-transporte/medio-transporte.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from './shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { RouterModule } from '@angular/router';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudDatosComponent } from './shared/solicitud-datos/solicitud-datos.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, SelectCatalogosComponent, SelectPaisesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    InspeccionFisicaComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    WizardComponent,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    SelectCatalogosComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    // PedimentoComponent,
    ReactiveFormsModule,
    TituloComponent,
    SelectPaisesComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    InspeccionFisicaRoutingModule,
    SharedModule,
    SolicitudDatosComponent,
    CarrosDeFerrocarrilComponent,
    HistorialInspeccionFisicaComponent,
    SolicitudComponent,
    ResponsableInspeccionEnPuntoComponent,
    MedioTransporteComponent
  ]
})
export class InspeccionFisicaModule {}
