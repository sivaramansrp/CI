import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolicitudPageComponent } from "./pages/solicitud-page/solicitud-page.component";

export const ROUTES_SOLICITUDES: Routes = [
    {
        path: 'solicitud',
        component: SolicitudPageComponent
    },
    { path: '**', redirectTo: 'solicitud'}
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
    exports: [RouterModule]
})

export class ServiciosExtraordinariosRoutingModule { }
