import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModificacionProgramaImmexBajaSubmanufactureraRoutingModule } from './modificacion-programa-immex-baja-submanufacturera-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    ModificacionProgramaImmexBajaSubmanufactureraRoutingModule,
  ],
})
export class ModificacionProgramaImmexBajaSubmanufactureraModule {}
