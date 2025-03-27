import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { TemporalContenedoresRoutingModule } from './temporal-contenedores-routing.module';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    SolicitantePageComponent,
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
    TemporalContenedoresRoutingModule,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    WizardComponent
  ],
  exports: [],
  providers: [
    ToastrService
  ]
})
export class TemporalContenedoresModule { }
