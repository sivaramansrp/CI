import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificacionComponent } from './components/Modificacion/modificacion.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';


@NgModule({
  declarations: [PasoDosComponent,PasoUnoComponent,PasoTresComponent,SolicitudPageComponent],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    SharedModule,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    FormsModule,
    WizardComponent,
    BitacoraComponent,
    ModificacionComponent,
    TituloComponent,
    TablaDinamicaComponent
  ]
})
export class CatalogosModule { }
