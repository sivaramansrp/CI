// inspeccion-fisica.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { PedimentoComponent } from '../5701/components/pedimento/pedimento.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { SharedModule } from '../../shared/shared.module';
import { InspeccionFisicaRoutingModule } from './inspeccion-fisica-routing.module';
import { InspeccionFisicaComponent } from './pages/inspeccion-fisica/inspeccion-fisica.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { CarrosDeFerrocarrilComponent } from './shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { HistorialInspeccionFisicaComponent } from './shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { SolicitudDatosComponent } from './shared/solicitud-datos/solicitud-datos.component';

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
    PedimentoComponent,
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
    SolicitudComponent
  ]
})
export class InspeccionFisicaModule {}
