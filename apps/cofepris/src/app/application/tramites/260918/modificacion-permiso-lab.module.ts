import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDelSolicitudModificacionComponent } from '../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { ManifiestosComponent } from "../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component";
import { ModificacionPermisoLabComponent } from './pages/modificacion-permiso-lab/modificacion-permiso-lab.component';
import { ModificacionPermisoLabRoutingModule } from './modificacion-permiso-lab-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentanteLegalComponent } from '../../shared/components/representante-legal/representante-legal.component';
import { TercerosRelacionadosFabSeccionComponent } from '../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';
import { TramitesAsociadosSeccionComponent } from '../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';

@NgModule({
  declarations: [
    ModificacionPermisoLabComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    ModificacionPermisoLabRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatosDelSolicitudModificacionComponent,
    TercerosRelacionadosFabSeccionComponent,
    PagoDeDerechosEntradaComponent,
    TramitesAsociadosSeccionComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    RepresentanteLegalComponent,
    ManifiestosComponent
],
})
export class ModificacionPermisoLabModule {}
