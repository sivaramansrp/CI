import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';


import { OperacionesDeComercioExteriorRoutingModule } from './operaciones-de-comercio-exterior-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent,SharedModule, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { OperacionesDeComercioExterioComponent } from './components/operaciones-de-comercio-exterior/operaciones-de-comercio-exterior.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    PasoDosComponent,
    SolicitudPageComponent,
  ],
  imports: [
    CommonModule,
    OperacionesDeComercioExteriorRoutingModule,
    SharedModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    InputCheckComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ToastrModule.forRoot(),
    TablaDinamicaComponent,
    OperacionesDeComercioExterioComponent,
     PasoUnoComponent,
  ]
})
export class OperacionesDeComercioExteriorModule { }
