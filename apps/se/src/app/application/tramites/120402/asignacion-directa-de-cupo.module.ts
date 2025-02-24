import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsignacionDirectaDeCupoComponent } from './pages/asignacion-directa-de-cupo/asignacion-directa-de-cupo.component';
import { AsignacionDirectaDeCupoRoutingModule } from './asignacion-directa-de-cupo-routing.module';
import { provideHttpClient } from '@angular/common/http';

import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

@NgModule({
  declarations: [AsignacionDirectaDeCupoComponent],
  imports: [CommonModule, AsignacionDirectaDeCupoRoutingModule, WizardComponent],
  providers: [provideHttpClient()],
})
export class AsignacionDirectaDeCupoModule {}
