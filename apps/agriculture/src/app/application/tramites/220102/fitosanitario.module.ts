import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { DatosMercanciaComponent } from './components/datos-mercancia/datos-mercancia.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SharedModule, SolicitanteComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


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
    FitosanitarioRoutingModule
  ]
  ,
  providers: [
    ToastrService
  ]
})
export class FitosanitarioModule { }
