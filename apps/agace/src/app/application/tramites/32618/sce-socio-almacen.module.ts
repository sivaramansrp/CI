import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SceSocioAlmacenRoutingModule } from './sce-socio-almacen-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [CommonModule, SceSocioAlmacenRoutingModule, SolicitanteComponent, BtnContinuarComponent,WizardComponent],
})
export class SceSocioAlmacenModule {}
