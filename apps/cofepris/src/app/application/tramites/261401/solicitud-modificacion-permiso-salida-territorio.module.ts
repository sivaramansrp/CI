import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizaion-nacional/datos-para-movilizacion-nacional.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudModificacionPermisoSalidaTerritorioComponent } from './pages/solicitud-modificacion-permiso-salida-territorio/solicitud-modificacion-permiso-salida-territorio.component';
import { SolicitudModificacionPermisoSalidaTerritorioRoutingModule } from './solicitud-modificacion-permiso-salida-territorio-routing.module';
import { WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [
    SolicitudModificacionPermisoSalidaTerritorioComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    SolicitudModificacionPermisoSalidaTerritorioRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    // PasoDosComponent,
    // PasoTresComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent
  ],
})
export class SolicitudModificacionPermisoSalidaTerritorioModule {}
