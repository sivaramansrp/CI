import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadLegalRoutingModule } from './entidad-legal-routing.module';
import { AsignciondirectaPageComponent } from './pages/asignciondirecta-page/asignciondirecta-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { SolicitanteAsigncionComponent } from './pages/solicitante-asigncion/solicitante-asigncion.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
// import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    EntidadLegalRoutingModule, WizardComponent,AsignciondirectaPageComponent,SolicitanteAsigncionComponent,SolicitanteComponent,InputRadioComponent
  ]
})
export class EntidadLegalModule { }
