import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EntregaActaRoutingModule } from './entrega-acta-routing.module';
import { InputRadioComponent, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { EntregaActaService } from './services/entrega-acta.service';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    EntregaActaRoutingModule,
    WizardComponent,
    
    
  ],
  providers:[EntregaActaService]
})
export class EntregaActaModule { }
