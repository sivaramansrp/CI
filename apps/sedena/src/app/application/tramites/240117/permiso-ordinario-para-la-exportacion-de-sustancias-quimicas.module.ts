import { AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteContenedoraComponent } from './components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from './components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule } from './permiso-ordinario-para-la-exportacion-de-sustancias-quimicas-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosRelacionadosContenedoraComponent } from './components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';

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
    SolicitanteComponent,
    AlertComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    BtnContinuarComponent,
    DatosDelTramiteContenedoraComponent,
    TercerosRelacionadosContenedoraComponent,
    PagoDeDerechosContenedoraComponent
],
  exports:[
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitanteComponent
  ]
})
export class PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasModule { }
