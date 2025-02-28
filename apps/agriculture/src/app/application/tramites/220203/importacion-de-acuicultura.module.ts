import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ImportacionDeAcuiculturaRoutingModule } from './importacion-de-acuicultura-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionComponent } from './components/datos-para-movilizacion/datos-para-movilizacion.component';

import { SanidadCertificadoComponent } from './pages/sanidad-certificado/sanidad-certificado.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { InputCheckComponent } from 'libs/shared/data-access-user/src/tramites/components/input-check/input-check.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TercerosComponent } from 'libs/shared/data-access-user/src/tramites/components/terceros/terceros.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component'



@NgModule({
  declarations: [
    PagoDeDerechosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionComponent,
    SanidadCertificadoComponent
  ],
  imports: [
    CommonModule,
    ImportacionDeAcuiculturaRoutingModule,
    TablaDinamicaComponent,
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



  ]
})
export class ImportacionDeAcuiculturaModule { }
