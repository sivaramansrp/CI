import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OperacionesDeComercioExteriorComponent } from './components/operaciones-de-comercio-exterior/operaciones-de-comercio-exterior.component';
import { OperacionesDeComercioExteriorRoutingModule } from './operaciones-de-comercio-exterior-routing.module';
import { PasoDocComponent } from './pages/paso-doc/paso-doc.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent,SharedModule, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    PasoDocComponent,
    PasoUnoComponent,
    SolicitudPageComponent,
    OperacionesDeComercioExteriorComponent
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
    TablaDinamicaComponent
    
    
  ]
})
export class OperacionesDeComercioExteriorModule { }
