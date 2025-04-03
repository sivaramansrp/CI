import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { forwardRef, NgModule } from '@angular/core';

import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';

import { ModificacionPermisoSanitarioComponent } from './pages/modificacion-permiso-sanitario/modificacion-permiso-sanitario.component';
import { ModificacionPermisoSanitarioRoutingModule } from './modificacion-permiso-sanitario-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { DatosDeLaSolicitudComponent } from '../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';


@NgModule({
  declarations: [ModificacionPermisoSanitarioComponent, PasoUnoComponent],
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
    FormsModule,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    ModificacionPermisoSanitarioRoutingModule,
  ],
})
export class ModificacionPermisoSanitarioModule {}
