import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
const routes: Routes = [
    {
        path: 'Donación-Franja-Fronteriza',
        component: SolicitudPageComponent,
    },
    { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'Donación-Franja-Fronteriza',
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DonacionFranjaFronterizaRoutingModule {}