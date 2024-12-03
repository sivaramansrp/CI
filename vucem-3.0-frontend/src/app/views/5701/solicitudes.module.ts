import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { RouterModule } from '@angular/router';
import { ServiciosExtraordinariosComponent } from './servicios-extraordinarios/servicios-extraordinarios.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { SolicitanteComponent } from './servicios-extraordinarios/solicitante/solicitante.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';



@NgModule({
  declarations: [
    ServiciosExtraordinariosComponent,
    SolicitanteComponent,
  ] ,
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent,
    TituloComponent,
    InputTextComponent
  ]
})
export class SolicitudesModule { }