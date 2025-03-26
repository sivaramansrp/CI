
import { ToastrService } from 'ngx-toastr';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ModificacionRoutingModule } from './modificacion.routing.module';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
    ModificacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    PasoUnoComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ],
  exports: [],
  providers: [
    ToastrService
  ]
})
export class ModificacionModule { }
