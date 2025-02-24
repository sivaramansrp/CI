import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProsecModificacionComponent } from './pages/prosec-modificacion.component';

import { ProsecModificacionRoutingModule } from './prosec-modificacion-routing.module';

import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

@NgModule({
  declarations: [ProsecModificacionComponent],
  imports: [CommonModule, ProsecModificacionRoutingModule, WizardComponent],
})
export class ProsecModificacionModule {}
