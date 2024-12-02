import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiciosExtraordinariosComponent } from "./servicios-extraordinarios/servicios-extraordinarios.component";

export const ROUTES_SOLICITUDES: Routes = [
    {
        path: 'servicios-extraordinarios',
        component: ServiciosExtraordinariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
    exports: [RouterModule]
})

export class SolicitudesRoutingModule { }