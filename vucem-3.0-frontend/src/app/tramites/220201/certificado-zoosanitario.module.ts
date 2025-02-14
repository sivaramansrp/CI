import { AgriculturaComponent } from '../220202/pages/agricultura/agricultura.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { CommonModule } from '@angular/common';
<<<<<<<< HEAD: vucem - 3.0 - frontend / src / app / tramites / 220202 / fitosanitario.module.ts
import { DatosDeLaSolicitudComponent } from '../220202/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from '../220202/components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FitosanitarioRoutingModule } from '../220202/fitosanitario-routing.module';
========
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';

import { CertificadoZoosanitario } from './certificado-zoosanitario-routing.module';

import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';

>>>>>>>> 1bb2b2560482b6a09ee562708aaf77a5bfcc0716:vucem-3.0-frontend/src/app/tramites/220202/certificado-zoosanitario.module.ts
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';


import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<<< HEAD:vucem-3.0-frontend/src/app/tramites/220202/fitosanitario.module.ts
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';

import { ServiciosExtraordinariosModule } from '../5701/servicios-extraordinarios.module';
import { TableComponent } from '../../shared/components/table/table.component';
import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '../../shared/components/input-radio/input-radio.component';
========

import { SharedModule } from '../../shared/shared.module';

import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { ServiciosExtraordinariosModule } from '../5701/servicios-extraordinarios.module';
import { InputRadioComponent } from '../../shared/components/input-radio/input-radio.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';

>>>>>>>> 1bb2b2560482b6a09ee562708aaf77a5bfcc0716:vucem-3.0-frontend/src/app/tramites/220202/certificado-zoosanitario.module.ts

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoCuatroComponent,
<<<<<<<< HEAD:vucem-3.0-frontend/src/app/tramites/220202/fitosanitario.module.ts
    AgriculturaComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    PagoDeDerechosComponent
========
    PasoTresComponent,
    PasoUnoComponent,
    ZoosanitarioPageComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    PagoDeDerechosComponent,


>>>>>>>> 1bb2b2560482b6a09ee562708aaf77a5bfcc0716:vucem-3.0-frontend/src/app/tramites/220202/certificado-zoosanitario.module.ts
  ],
  imports: [
    CommonModule,
<<<<<<<< HEAD:vucem-3.0-frontend/src/app/tramites/220202/fitosanitario.module.ts
    ReactiveFormsModule,
    FitosanitarioRoutingModule,
========
    CertificadoZoosanitario,
>>>>>>>> 1bb2b2560482b6a09ee562708aaf77a5bfcc0716:vucem-3.0-frontend/src/app/tramites/220202/certificado-zoosanitario.module.ts
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
<<<<<<<< HEAD:vucem-3.0-frontend/src/app/tramites/220202/fitosanitario.module.ts
    ServiciosExtraordinariosModule,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent
  ]
})
export class FitosanitarioModule { }
========
    InputRadioComponent,
    TableComponent,
    CatalogoSelectComponent,
    ServiciosExtraordinariosModule
  ]
})
export class CertificadoZoosanitarioModule { }
>>>>>>>> 1bb2b2560482b6a09ee562708aaf77a5bfcc0716:vucem-3.0-frontend/src/app/tramites/220202/certificado-zoosanitario.module.ts
