import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { TemporalContenedoresRoutingModule } from './temporal-contenedores-routing.module';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoDosComponent
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
    TemporalContenedoresRoutingModule,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoTresComponent,
    WizardComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    TituloComponent
  ],
  exports: [],
  providers: [
    ToastrService
  ]
})
export class TemporalContenedoresModule { }
