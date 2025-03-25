import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { AsignciontabComponent } from './component/asigncionTab/asigncion-tab.component';
import { SolicitantetabComponent } from './component/solicitantetab/solicitantetab.component';

import { EntidadLegalRoutingModule } from './entidad-legal-routing.module';

import { AsignciondirectaPageComponent } from './pages/asignciondirecta-page/asignciondirecta-page.component';
import { PasoDosComponent } from '../120404/component/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../120404/component/paso-tres/paso-tres.component';
import { SolicitanteAsigncionComponent } from './pages/solicitante-asigncionTab/solicitante-entidad.component';

@NgModule({

declarations: [SolicitanteAsigncionComponent,AsignciondirectaPageComponent],
  imports: [
    PasoDosComponent,PasoTresComponent,
    CommonModule,WizardComponent,
    EntidadLegalRoutingModule,SolicitanteComponent,ReactiveFormsModule,AsignciontabComponent, CatalogoSelectComponent,SolicitantetabComponent,BtnContinuarComponent]
  
})
export class EntidadLegalModule { }
