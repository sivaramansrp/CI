import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadLegalRoutingModule } from './entidad-legal-routing.module';
import { AsignciondirectaPageComponent } from './pages/asignciondirecta-page/asignciondirecta-page.component';
// import { WizardComponent } from '@ng-mf/data-access-user';
import { SolicitanteAsigncionComponent } from './pages/solicitante-asigncion/solicitante-asigncion.component';
import { CatalogoSelectComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
// import { InputRadioComponent } from '@ng-mf/data-access-user';
// import{ AsignciontabComponent } from './component/asignciontab/asignciontab.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
// import { AsignciondirectaComponent } from './pages/asignciondirecta/asignciondirecta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsignciontabComponent } from './component/asignciontab/asignciontab.component';

import { SolicitantetabComponent } from './component/solicitantetab/solicitantetab.component';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';
@NgModule({

declarations: [SolicitanteAsigncionComponent,AsignciondirectaPageComponent],
  imports: [
    CommonModule,WizardComponent,
    EntidadLegalRoutingModule,SolicitanteComponent,ReactiveFormsModule,AsignciontabComponent, CatalogoSelectComponent,SolicitantetabComponent,BtnContinuarComponent]
  
})
export class EntidadLegalModule { }
