import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';
import { IniciarTramiteResolver } from '@libs/shared/data-access-user/src';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'action',
  },
  {
    canActivate: [IniciarTramiteResolver],
    resolve: { iniciarResolverData: IniciarTramiteResolver },
    data: {
      iniciarConfig: {
        procedureId: '80105'
      }
    },
    path: 'action',
    component: PasoCapturarSolicitudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModalidadTerciarizaciónRoutingModule { }
