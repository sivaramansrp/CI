import { AlertComponent,AnexarDocumentosComponent,BtnContinuarComponent, FirmaElectronicaComponent, InputCheckComponent,NotificacionesComponent,SharedModule,SolicitanteComponent, TituloComponent,WizardComponent} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroSolicitudDesistimientoRoutingModule } from './registro-solicitud-desistimiento-routing.module';
import { SolicitudComponent } from './components/Solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [PasoUnoComponent, PasoTresComponent, SolicitudPageComponent],
  imports: [
    CommonModule,
    RegistroSolicitudDesistimientoRoutingModule,
    SharedModule,
    SolicitudComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    SolicitanteComponent,
    ReactiveFormsModule,
    InputCheckComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SharedModule,
    TituloComponent,
    AlertComponent,
    NotificacionesComponent
  ],
  exports:[SolicitudPageComponent]
})
export class RegistroSolicitudDesistimientoModule { }
