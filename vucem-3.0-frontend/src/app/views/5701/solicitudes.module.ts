import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { RouterModule } from '@angular/router';
import { ServiciosExtraordinariosComponent } from './servicios-extraordinarios/servicios-extraordinarios.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';



@NgModule({
  declarations: [
    ServiciosExtraordinariosComponent
  ] ,
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent
  ]
})
export class SolicitudesModule { }