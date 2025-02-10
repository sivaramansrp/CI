import { BandejaTareasPendientesComponent } from './bandeja-tareas-pendientes/bandeja-tareas-pendientes.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '../shared/components/crosslist/crosslist.component';
import { FuncionarioRoutingModule } from './funcionario-rounting.module';
import { InputFechaComponent } from '../shared/components/input-fecha/input-fecha.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from '../shared/components/table/table.component';
import { WizardComponent } from '../shared/components/wizard/wizard.component';

@NgModule({
  declarations: [
    BandejaTareasPendientesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    WizardComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    CrosslistComponent,
    FuncionarioRoutingModule,
    TableComponent,
  ],
  exports: [
  ]
})
export class FuncionarioModule { }
