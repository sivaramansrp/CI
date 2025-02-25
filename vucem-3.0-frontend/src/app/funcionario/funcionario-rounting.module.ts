import { RouterModule, Routes } from "@angular/router";
import { BandejaTareasPendientesComponent } from "./bandeja-tareas-pendientes/bandeja-tareas-pendientes.component";
import { NgModule } from "@angular/core";

export const ROUTES_SOLICITUDES: Routes = [
    {
        path: '',
        component: BandejaTareasPendientesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
    exports: [RouterModule]
})

export class FuncionarioRoutingModule { }
