import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';

import { CertificadoZoosanitario } from './certificado-zoosanitario-routing.module';

import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';

import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SharedModule } from '../../shared/shared.module';

import { TercerorRelacionadosComponent } from './components/terceror-relacionados/terceror-relacionados.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { ServiciosExtraordinariosModule } from '../5701/servicios-extraordinarios.module';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoCuatroComponent,
    PasoTresComponent,
    PasoUnoComponent,
    ZoosanitarioPageComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    TercerorRelacionadosComponent,
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
    SelectCatalogosComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SelectCatalogosComponent,
    SolicitanteComponent,
    ServiciosExtraordinariosModule
  ]
})
export class CertificadoZoosanitarioModule { }
