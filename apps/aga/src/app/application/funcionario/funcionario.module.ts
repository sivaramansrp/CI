import { CrosslistComponent,
         InputFechaComponent,
         SharedModule,
         TableComponent,
         WizardComponent } from "@ng-mf/data-access-user";
import { BandejaTareasPendientesComponent } from "./bandeja-tareas-pendientes/bandeja-tareas-pendientes.component";
import { CommonModule } from "@angular/common";
import { FuncionarioRoutingModule } from "./funcionario-rounting.module";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

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
