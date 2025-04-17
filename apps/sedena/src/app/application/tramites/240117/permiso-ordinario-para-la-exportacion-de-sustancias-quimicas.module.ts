import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule } from './permiso-ordinario-para-la-exportacion-de-sustancias-quimicas-routing.module';

import { AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';

import { AlertComponent } from '@ng-mf/data-access-user';

import { DatosDelTramiteComponent } from '../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoOrdinarioImportacionArmasMunicionesRoutingModule } from '../240101/permiso-ordinario-importacion-armas-municiones-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosRelacionadosComponent } from '../../shared/components/terceros-relacionados/terceros-relacionados.component';



@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
  ],
  imports: [
    CommonModule,
    PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule,
    PermisoOrdinarioImportacionArmasMunicionesRoutingModule,
    SolicitanteComponent,
    DatosDelTramiteComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent,
    AlertComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    BtnContinuarComponent,
  ],
  exports:[
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitanteComponent
  ]
})
export class PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasModule { }
