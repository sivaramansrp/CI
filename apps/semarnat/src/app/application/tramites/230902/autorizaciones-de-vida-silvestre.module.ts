import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { AutorizacionesDeVidaSilvestreRoutingModule } from './autorizaciones-de-vida-silvestre-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosSolicitudComponent } from './components/DatosSolicitud.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';




@NgModule({
  declarations: [DatosComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    AutorizacionesDeVidaSilvestreRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    DatosSolicitudComponent
],
})
export class AutorizacionesDeVidaSilvestreModule {}
