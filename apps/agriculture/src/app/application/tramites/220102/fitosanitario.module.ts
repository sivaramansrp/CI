import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';

import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { DatosMercanciaComponent } from './components/datos-mercancia/datos-mercancia.component';

import { ToastrModule } from 'ngx-toastr';

import { ToastrService } from 'ngx-toastr';

import {
  AlertComponent,

  AnexarDocumentosComponent,

  BtnContinuarComponent,

  CatalogoSelectComponent,

  CrosslistComponent,

  FirmaElectronicaComponent,

  InputCheckComponent,

  InputFechaComponent,

  InputRadioComponent,

  SharedModule,

  SolicitanteComponent,

  TablaDinamicaComponent,

  TableComponent,

  TercerosComponent,

  TituloComponent,

  WizardComponent
} from '@ng-mf/data-access-user';



@NgModule({
  declarations: [
    PasoDosComponent,
    PasoUnoComponent,
    PasoTresComponent,
    DatosMercanciaComponent,
    SolicitudPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
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
    TableComponent,
    CatalogoSelectComponent,
    TercerosComponent,
    ToastrModule.forRoot(),
    FitosanitarioRoutingModule,
    TablaDinamicaComponent
  ]
  ,
  providers: [
    ToastrService
  ]
})
export class FitosanitarioModule { }
