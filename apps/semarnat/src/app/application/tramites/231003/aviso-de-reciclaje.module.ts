import {
  AlertComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  NotificacionesComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { AvisoDeReciclajeRoutingModule } from './aviso-de-reciclaje-routing.module';
import { AvisoReciclajeComponent } from './pages/aviso-reciclaje/aviso-reciclaje.component';
import { CommonModule } from '@angular/common';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoT231003Component } from './pages/paso-uno/paso-uno-t231003.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AvisoReciclajeComponent,
    PasoUnoT231003Component,
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
