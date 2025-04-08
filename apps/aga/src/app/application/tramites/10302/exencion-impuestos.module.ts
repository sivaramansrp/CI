import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExencionImpuestosRoutingModule } from './exencion-impuestos-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosTramiteComponent } from './components/datosTramite.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExencionImpuestosRoutingModule,
    PasoUnoComponent,
    AlertComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    DatosTramiteComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    PasoDosComponent
  ],
})
export class ExencionImpuestosModule { }
