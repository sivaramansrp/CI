import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarInicalmenteRoutingModule } from './validar-inicalmente-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [SolicitudPageComponent],
  imports: [
    CommonModule, 
    ValidarInicalmenteRoutingModule,
    BtnContinuarComponent,
    PasoUnoComponent
  ],
})
export class ValidarInicalmenteModule {}
