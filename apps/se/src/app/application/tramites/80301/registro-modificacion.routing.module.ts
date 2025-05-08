import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistroModificacionPageComponent } from './pages/registro-modificacion-page/registro-modificacion-page.component';

const ROUTES_CONTENEDOR: Routes = [
    {
        path: 'registro-modificacion',
        component: RegistroModificacionPageComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'registro-modificacion',
      },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES_CONTENEDOR)],
    exports: [RouterModule],
})
export class RegistroModificacionRoutingModule {}