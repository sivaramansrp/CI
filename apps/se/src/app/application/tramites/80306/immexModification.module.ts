import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ImmexModificationRoutingModule } from './immexModification.routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
    ImmexModificationRoutingModule,
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
export class ImmexModificationModule { }
