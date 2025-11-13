import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';

import { ModificacionPermisoSanitarioComponent } from './pages/modificacion-permiso-sanitario/modificacion-permiso-sanitario.component';
import { ModificacionPermisoSanitarioRoutingModule } from './modificacion-permiso-sanitario-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { DatosDeLaSolicitudComponent } from '../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelSolicitudModificacionComponent } from '../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { PasoDosComponent } from '../260401/components/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../260401/components/paso-tres/paso-tres.component';
import { TercerosRelacionadosModificacionComponent } from '../../shared/components/shared2609/terceros-relacionados-modificacion/terceros-relacionados.component';
import {TercerosRelacionadosVistaComponent } from './components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { TramitesAsociadosSeccionComponent } from '../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';

import { ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [ModificacionPermisoSanitarioComponent, PasoUnoComponent],
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
    FormsModule,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    DatosDelSolicitudModificacionComponent,
    ModificacionPermisoSanitarioRoutingModule,
    TramitesAsociadosSeccionComponent,
    TercerosRelacionadosModificacionComponent,
    PagoDeDerechosEntradaComponent,
    PasoTresComponent,PasoDosComponent,
    TercerosRelacionadosVistaComponent,
  ],
   providers: [ToastrService ],
})
export class ModificacionPermisoSanitarioModule {}
