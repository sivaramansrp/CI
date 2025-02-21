/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpansionDeProductoresRoutingModule } from './expansion-de-productores-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';



@NgModule({
  declarations: [ 
    DatosComponent, 
    PantallasComponent
  ],
  imports: [
    CommonModule,
    ExpansionDeProductoresRoutingModule,
    WizardComponent
  ]
})
export class ExpansionDeProductoresModule { }
