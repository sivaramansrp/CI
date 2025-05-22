import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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

import { CertificadoZoosanitario } from './certificado-zoosanitario-routing.module';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    ZoosanitarioPageComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    PagoDeDerechosComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CertificadoZoosanitario,
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
    TablaDinamicaComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService
  ]
})
export class CertificadoZoosanitarioModule { }