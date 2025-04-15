import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificacionPermisoSanitarioLaSaludRoutingModule } from './modificacion-permiso-sanitario-la-salud-routing.module';
import { PasoUnoPagesComponent } from './pages/paso-uno-pages/paso-uno-pages.component';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from '../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelSolicitudModificacionComponent } from '../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { TramitesAsociadosSeccionComponent } from '../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';
import { TercerosRelacionadosFabricanteComponent } from '../../shared/components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { ModificacionPermisoSanitarioLaSaludComponent } from './pages/modificacion-permiso-sanitario-la-salud/modificacion-permiso-sanitario-la-salud.component';
import { TercerosRelacionadosComponent } from '../260212/components/terceros-relacionados/terceros-relacionados.component';
import { TercerosRelacionadosFabSeccionComponent } from '../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { TercerosRelacionadosFebService } from '../../shared/services/tereceros-relacionados-feb.service';


@NgModule({
  declarations: [PasoUnoPagesComponent,ModificacionPermisoSanitarioLaSaludComponent],
  imports: [ 
    WizardComponent,
      BtnContinuarComponent,
      CommonModule,
      FormsModule,
      SolicitanteComponent,
      DatosDeLaSolicitudComponent,
      DatosDelSolicitudModificacionComponent,
      TramitesAsociadosSeccionComponent,
      PagoDeDerechosEntradaComponent,
      AlertComponent,
      TercerosRelacionadosComponent,
      TercerosRelacionadosFabSeccionComponent,
      ModificacionPermisoSanitarioLaSaludRoutingModule],
       providers: [provideHttpClient(), ToastrService,TercerosRelacionadosFebService]
})
export class ModificacionPermisoSanitarioLaSaludModule {}
