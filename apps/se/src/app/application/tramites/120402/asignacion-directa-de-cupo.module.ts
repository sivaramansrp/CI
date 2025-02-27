import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsignacionComponent } from './pages/asignacion/asignacion.component';
import { AsignacionDirectaDeCupoComponent } from './pages/asignacion-directa-de-cupo/asignacion-directa-de-cupo.component';
import { AsignacionDirectaDeCupoRoutingModule } from './asignacion-directa-de-cupo-routing.module';
import { CantidadSolicitadaComponent } from './components/cantidad-solicitada/cantidad-solicitada.component';
import { CortinaALaItalianaComponent } from './pages/cortina-a-la-italiana/cortina-a-la-italiana.component';
import { DescripcionDelCupoComponent } from './components/descripcion-del-cupo/descripcion-del-cupo.component';
import { provideHttpClient } from '@angular/common/http';

import { RepresentacionFederalComponent } from './components/representacion-federal/representacion-federal.component';
import { SeleccionDelCupoComponent } from './components/seleccion-del-cupo/seleccion-del-cupo.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';

import { SolicitanteComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    AsignacionDirectaDeCupoComponent,
    AsignacionComponent,
    CortinaALaItalianaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AsignacionDirectaDeCupoRoutingModule,
    WizardComponent,
    RepresentacionFederalComponent,
    SeleccionDelCupoComponent,
    DescripcionDelCupoComponent,
    CantidadSolicitadaComponent,
    AlertComponent,
    SolicitanteComponent
  ],
  providers: [provideHttpClient()],
})
export class AsignacionDirectaDeCupoModule {}
