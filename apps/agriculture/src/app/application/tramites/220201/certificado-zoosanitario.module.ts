import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';

import { CertificadoZoosanitario } from './certificado-zoosanitario-routing.module';

import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from 'libs/shared/data-access-user/src/tramites/components/input-check/input-check.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';

import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'libs/shared/data-access-user/src/tramites/shared.module';

import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { ServiciosExtraordinariosModule } from '../5701/servicios-extraordinarios.module';
import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoCuatroComponent,
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
    ServiciosExtraordinariosModule
  ]
})
export class CertificadoZoosanitarioModule { }