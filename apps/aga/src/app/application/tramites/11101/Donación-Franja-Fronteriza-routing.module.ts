    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
    export const ROUTES_ATTENTION: Routes = [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'solicitud',
          },
          {
            path: 'solicitud',
            component: SolicitantePageComponent,
          },
    ];

    @NgModule({
        imports: [RouterModule.forChild(ROUTES_ATTENTION)],
        exports: [RouterModule],
    })
    export class DonacionFranjaFronterizaRoutingModule {}