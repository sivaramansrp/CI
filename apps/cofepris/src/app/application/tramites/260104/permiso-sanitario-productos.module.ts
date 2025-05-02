import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioProductosRoutingModule } from './permiso-sanitario-productos-routing.module';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

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
