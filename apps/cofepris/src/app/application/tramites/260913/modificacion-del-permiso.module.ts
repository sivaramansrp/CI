import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaSolicitudModificacionComponent } from '../../shared/components/datos-de-la-solicitud-modificacion/datos-de-la-solicitud-modificacion.component';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { ModificacionDelPermisoRoutingModule } from './modificacion-del-permiso-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosFabricanteComponent } from '../../shared/components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadosSeccionComponent } from '../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
  ],
  imports: [
    CommonModule,
    ModificacionDelPermisoRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitanteComponent,
    PagoDeDerechosEntradaComponent,
    TramitesAsociadosSeccionComponent,
    TercerosRelacionadosFabricanteComponent,
    InputCheckComponent,
    DatosDeLaSolicitudModificacionComponent
  ],
  providers: [
    ToastrService
  ],
})
export class ModificacionDelPermisoModule { }
