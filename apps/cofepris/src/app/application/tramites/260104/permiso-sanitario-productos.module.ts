import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioProductosRoutingModule } from './permiso-sanitario-productos-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';

@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    PermisoSanitarioProductosRoutingModule,
    SolicitanteComponent,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent
  ],
})
export class PermisoSanitarioProductosModule {}
