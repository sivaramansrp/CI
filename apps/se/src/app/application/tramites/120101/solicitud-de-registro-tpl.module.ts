import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { BienFinalComponent } from './components/bien-final/bien-final.component';
import { CommonModule } from '@angular/common';
import { ConsultarCupoComponent } from './components/consultar-cupo/consultar-cupo.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { DescripcionDelCupoComponent } from './components/descripcion-del-cupo/descripcion-del-cupo.component';
import { DomicilioFiscalComponent } from './components/domicilio-fiscal/domicilio-fiscal.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentacionFederalComponent } from './components/representacion-federal/representacion-federal.component';
import { SolicitudDeRegistroTplRoutingModule } from './solicitud-de-registro-tpl-routing.module';


@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    SolicitudDeRegistroTplRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    DatosGeneralesComponent,
    DomicilioFiscalComponent,
    ConsultarCupoComponent,
    AlertComponent,
    DescripcionDelCupoComponent,
    RepresentacionFederalComponent,
    BienFinalComponent
  ]
})
export class SolicitudDeRegistroTplModule { }
