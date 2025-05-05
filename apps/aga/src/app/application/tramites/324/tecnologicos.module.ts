import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnologicosRoutingModule } from './tecnologicos-routing.module';
import { BtnContinuarComponent, FirmaElectronicaComponent, NotificacionesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { GestionDeCuentasComponent } from './components/gestion-de-cuentas.component';


@NgModule({
  declarations: [PasoUnoComponent,PasoTresComponent,SolicitudPageComponent],
  imports: [
    CommonModule,
    TecnologicosRoutingModule,
    NotificacionesComponent,
    BtnContinuarComponent,
    SharedModule,
    WizardComponent,
    SolicitanteComponent,
    GestionDeCuentasComponent,
    FirmaElectronicaComponent,
    TituloComponent
  ]
})
export class TecnologicosModule { }
