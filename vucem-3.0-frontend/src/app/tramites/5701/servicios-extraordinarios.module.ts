import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { TercerosComponent } from './components/terceros/terceros.component';
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { SharedModule } from '../../shared/shared.module';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';



@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    TercerosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
 ] ,
  imports: [
    CommonModule,
    SharedModule,
    ServiciosExtraordinariosRoutingModule,
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
],
exports: [
  SolicitudComponent,
  TercerosComponent
]
})
export class ServiciosExtraordinariosModule { }
