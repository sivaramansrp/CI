import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDelSolicitudModificacionComponent } from '../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { ModificacionPermisoImportacionComponent } from './pages/modificacion-permiso-importacion/modificacion-permiso-importacion.component';
import { NgModule } from '@angular/core';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoImportacionRoutingModule } from './permiso-importacion-routing.module';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TramitesAsociadosComponent } from './components/tramites-asociados/tramites-asociados.component';


@NgModule({
  declarations: [
    ModificacionPermisoImportacionComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [CommonModule, PermisoImportacionRoutingModule,BtnContinuarComponent,WizardComponent,SolicitanteComponent,DatosSolicitudComponent,TercerosRelacionadosComponent,PagoDerechosComponent,TramitesAsociadosComponent,DatosDelSolicitudModificacionComponent],
})
export class PermisoImportacionModule {}
