import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DesistirSolicitudInformacionHistoricaComponent } from './pages/desistir-solicitud-informacion-historica/desistir-solicitud-informacion-historica.component';
import { DesistirSolicitudInformacionHistoricaRoutingModule } from './desistir-solicitud-informacion-historica-routing.module';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabDesistirSolicitudInfoHistoricaComponent } from './components/tab-desistir-solicitud-info-historica/tab-desistir-solicitud-info-historica.component';


@NgModule({
  declarations: [
    DesistirSolicitudInformacionHistoricaComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    DesistirSolicitudInformacionHistoricaRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    SolicitanteComponent,
    AlertComponent,
    TabDesistirSolicitudInfoHistoricaComponent,
    PasoTresComponent
  ]
})
export class DesistirSolicitudInformacionHistoricaModule { }
