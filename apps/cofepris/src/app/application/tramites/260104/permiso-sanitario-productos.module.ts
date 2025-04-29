import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioProductosRoutingModule } from './permiso-sanitario-productos-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';

@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    PermisoSanitarioProductosRoutingModule,
    SolicitanteComponent,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    DatosDeLaSolicitudComponent,
    RepresentanteLegalComponent
  ],
})
export class PermisoSanitarioProductosModule {}
