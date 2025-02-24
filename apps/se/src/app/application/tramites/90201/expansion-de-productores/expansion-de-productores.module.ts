/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpansionDeProductoresRoutingModule } from './expansion-de-productores-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { SolicitanteComponent } from '../components/solicitante/solicitante.component';
import { SectoresYMercanciasComponent } from '../components/sectores-y-mercancias/sectores-y-mercancias.component';
import { ProductorIndirectoComponent } from '../components/productor-indirecto/productor-indirecto.component';
import { DomiciliosDePlantasComponent } from '../components/domicilios-de-plantas/domicilios-de-plantas.component';



@NgModule({
  declarations: [ 
    DatosComponent, 
    PantallasComponent
  ],
  imports: [
    CommonModule,
    ExpansionDeProductoresRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    SectoresYMercanciasComponent,
    ProductorIndirectoComponent,
    DomiciliosDePlantasComponent
  ]
})
export class ExpansionDeProductoresModule { }
