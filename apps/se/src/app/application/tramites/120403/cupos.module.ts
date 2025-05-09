import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuposRoutingModule } from './cupos-routing.module';
import { AsignacionComponent } from './components/asignacion.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PasoUnoComponent,PasoDosComponent,PasoTresComponent,SolicitudPageComponent],
  imports: [
    CommonModule,
    CuposRoutingModule,
    AsignacionComponent,
    TituloComponent,
    CatalogoSelectComponent,
    FirmaElectronicaComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    ReactiveFormsModule,
    WizardComponent,
    FormsModule, 
    BtnContinuarComponent,
    SolicitanteComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CuposModule { }
