import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProsecModificacionRoutingModule } from './prosec-modificacion-routing.module';



import { Datoa90305Component } from './pages/datos-90305/datoa-90305.component';

import { FormsModule } from '@angular/forms';
import { ProsecModificacionComponent } from './pages/prosec-modificacion/prosec-modificacion.component';

import { Modification90305Component } from './component/modification-90305/modification-90305.component';

import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { ConsultadDomicilios90305Component } from './component/consultad-domicilios-90305/consultad-domicilios-90305.component';
import { Bitacora90305Component } from './component/bitacora-90305/bitacora-90305.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';


@NgModule({
  declarations: [ProsecModificacionComponent, Datoa90305Component],
  imports: [ CommonModule,FormsModule, ProsecModificacionRoutingModule ,Modification90305Component,WizardComponent,ConsultadDomicilios90305Component,Bitacora90305Component,SolicitanteComponent],
})
export class ProsecModificacionModule {}
