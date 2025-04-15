import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ExportarIlustracionesRoutingModule } from './exportar-ilustraciones-routing.module';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    ExportarIlustracionesRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    TituloComponent,
    AlertComponent,
    DatosDeLaSolicitudComponent
  ]
})

export class ExportarIlustracionesModule { }
