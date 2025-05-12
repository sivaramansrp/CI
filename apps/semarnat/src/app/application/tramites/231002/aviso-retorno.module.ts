import { AlertComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AvisoRetornoComponent } from './pages/aviso-retorno/aviso-retorno.component';
import { AvisoRetornoRoutingModule } from './aviso-retorno-routing.module';
import { CommonModule } from '@angular/common';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { SolicitudDatosSolicitanteComponent } from './pages/solicitud-datos-solicitante/solicitud-datos-solicitante.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AvisoRetornoComponent,
    SolicitudDatosSolicitanteComponent,
    PantallasComponent,
    PasoDosComponent,
  ],
  imports: [
    CommonModule,
    WizardComponent,
    AlertComponent,
    SolicitanteComponent,
    DatosSolicitudComponent,
    BtnContinuarComponent,
    AvisoRetornoRoutingModule,
    FirmaElectronicaComponent,
    ToastrModule.forRoot(),
  ],
  providers:[ToastrService]
})
export class AvisoRetornoModule {}
