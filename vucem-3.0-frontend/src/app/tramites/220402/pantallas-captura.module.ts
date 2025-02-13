import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasCapturaRoutingModule } from './pantallas-captura-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { SharedModule } from '../../shared/shared.module';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { AgregarTransporteComponent } from "../../shared/components/agregar-transporte/agregar-transporte.component";
import { RepresentanteFiscalComponent } from '../../shared/components/representante-fiscal/representante-fiscal.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    PasoUnoComponent
 ] ,
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
    SelectPaisesComponent
],
exports: []
})
export class PantallasCapturaModule { }