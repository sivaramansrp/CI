import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

import { DatosComponent } from './pages/datos/datos.component';
import { DatosSolicitudComponent } from './components/datos-solicitud.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoCitesRoutingModule } from './permiso-cites-routing.module';




@NgModule({
  declarations: [DatosComponent, PasoUnoComponent, DatosSolicitudComponent,],
  imports: [
    CommonModule,
    PermisoCitesRoutingModule,
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
    CrosslistComponent,
    
   
],
})
export class PermisoCitesModule {}
