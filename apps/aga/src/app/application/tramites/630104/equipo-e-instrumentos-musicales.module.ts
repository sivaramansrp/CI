import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { EquipoEInstrumentosMusicalesRoutingModule } from './equipo-e-instrumentos-musicales-routing.module'

import { EquipoEInstrumentosMusicalesComponent } from './pages/equipo-e-instrumentos-musicales/equipo-e-instrumentos-musicales.component';


import { BtnContinuarComponent, CrosslistComponent, InputRadioComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoDosComponent} from '../../tramites/630104/pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoTresComponent } from '../../tramites/630104/pages/paso-tres/paso-tres.component';




import { ReactiveFormsModule } from '@angular/forms';

import { SolicitudComponent } from './components/solicitud/solicitud.component';

@NgModule({
  declarations: [
    EquipoEInstrumentosMusicalesComponent,
    PasoUnoComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    EquipoEInstrumentosMusicalesRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    PasoTresComponent,
    PasoDosComponent,
    TituloComponent,
    InputRadioComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    CrosslistComponent
  ]
})
export class EquipoEInstrumentosMusicalesModule { }
