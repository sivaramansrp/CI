import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AtencionDeRenovacionRoutingModule } from './atencion-de-renovacion-routing.module';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DatosTramiteRenovacionComponent } from './components/datosTramiteRenovacion/datosTramiteRenovacion.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    
  ],
  imports: [
    SolicitanteComponent,
    CommonModule,
    AtencionDeRenovacionRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    DatosTramiteRenovacionComponent,
    PasoDosComponent,
    AnexarDocumentosComponent
  ]
})
export class AtencionDeRenovacionModule {}
