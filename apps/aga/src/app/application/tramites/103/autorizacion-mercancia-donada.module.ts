import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExencionImpuestosComponent } from './components/exencion-impuestos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { AutorizacionMercanciaDonadaRoutingModule } from './autorizacion-mercancia-donada-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutorizacionMercanciaDonadaRoutingModule,
    PasoUnoComponent,
    AlertComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    ExencionImpuestosComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    PasoDosComponent
  ],
})
export class AutorizacionMercanciaDonadaModule { }
