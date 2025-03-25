import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ImportacionVehiculosNuevosRoutingModule } from './importacion-vehiculos-nuevos-routing.module';




@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    ImportacionVehiculosNuevosRoutingModule,
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
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService
  ]
})
export class ImportacionVehiculosNuevosModule {}
