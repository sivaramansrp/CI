import { AlertComponent, BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudModificacionPermisoSalidaTerritorioComponent } from './pages/solicitud-modificacion-permiso-salida-territorio/solicitud-modificacion-permiso-salida-territorio.component';
import { SolicitudModificacionPermisoSalidaTerritorioRoutingModule } from './solicitud-modificacion-permiso-salida-territorio-routing.module';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';
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
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    AlertComponent,
    TercerosRelacionadosComponent,
    TramiteAsociadosComponent,
    PagoDeDerechosComponent
  ],
})
export class SolicitudModificacionPermisoSalidaTerritorioModule {}
