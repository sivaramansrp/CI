import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PageComponent } from './pages/page/page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RefProcedureRoutingModule } from './ref-procedure-routing.module';




@NgModule({
  declarations: [PageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    RefProcedureRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent
  ],
})
export class RefProcedureModule {}
