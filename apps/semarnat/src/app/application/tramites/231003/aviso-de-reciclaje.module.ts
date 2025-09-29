import {
  AlertComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  NotificacionesComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { NgModule } from '@angular/core';

import { AvisoDeReciclajeRoutingModule } from './aviso-de-reciclaje-routing.module';
import { AvisoReciclajeComponent } from './pages/aviso-reciclaje/aviso-reciclaje.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { SolicitudDatosSolicitanteComponent } from './pages/solicitud-datos-solicitante/solicitud-datos-solicitante.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AvisoReciclajeComponent,
    SolicitudDatosSolicitanteComponent,
    PantallasComponent,
    PasoDosComponent,
  ],
  imports: [
    NotificacionesComponent,
    CommonModule,
    WizardComponent,
    AlertComponent,
    SolicitanteComponent,
    DatosSolicitudComponent,
    BtnContinuarComponent,
    AvisoDeReciclajeRoutingModule,
    FirmaElectronicaComponent,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],
})
export class AvisoDeReciclajeModule {}
