import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroSolicitudModalidadRoutingModule } from './registro-solicitud-modalidad-routing.module';
import { SolicitudModalidadPageComponent } from './pages/solicitud-modalidad-page/solicitud-modalidad-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { CambioDeModalidadComponent } from './component/cambio-de-modalidad/cambio-de-modalidad.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { WizardComponent } from "../../shared/components/wizard/wizard.component";
import { BtnContinuarComponent } from "../../shared/components/btn-continuar/btn-continuar.component";
import { AlertComponent } from "../../shared/components/alert/alert.component";


@NgModule({
  declarations: [
    SolicitudModalidadPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudComponent,
    CambioDeModalidadComponent,
    PasoCuatroComponent
  ],
  imports: [
    CommonModule,
    RegistroSolicitudModalidadRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent
]
})
export class RegistroSolicitudModalidadModule { }
