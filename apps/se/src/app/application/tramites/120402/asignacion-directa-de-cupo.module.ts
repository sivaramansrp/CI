import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsignacionComponent } from './pages/asignacion/asignacion.component';
import { AsignacionDirectaDeCupoComponent } from './pages/asignacion-directa-de-cupo/asignacion-directa-de-cupo.component';
import { AsignacionDirectaDeCupoRoutingModule } from './asignacion-directa-de-cupo-routing.module';
import { CantidadSolicitadaComponent } from './components/cantidad-solicitada/cantidad-solicitada.component';
import { DescripcionDelCupoComponent } from './components/descripcion-del-cupo/descripcion-del-cupo.component';
import { provideHttpClient } from '@angular/common/http';

import { RepresentacionFederalComponent } from './components/representacion-federal/representacion-federal.component';
import { SeleccionDelCupoComponent } from './components/seleccion-del-cupo/seleccion-del-cupo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotificacionesComponent, WizardComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';

import {
  BtnContinuarComponent,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { DatosComponent } from './pages/datos/datos.component';
import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AsignacionDirectaDeCupoComponent,
    AsignacionComponent,
    DatosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AsignacionDirectaDeCupoRoutingModule,
    NotificacionesComponent,
    WizardComponent,
    RepresentacionFederalComponent,
    SeleccionDelCupoComponent,
    DescripcionDelCupoComponent,
    CantidadSolicitadaComponent,
    AlertComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  providers: [provideHttpClient(), ToastrService],
})
export class AsignacionDirectaDeCupoModule {}
