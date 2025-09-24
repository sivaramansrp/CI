import { IniciarTramiteResolver } from '@libs/shared/data-access-user/src';
import { NgModule } from '@angular/core';
import { RegistroExpansionComponent } from './pages/registro-expansion/registro-expansion.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'modalidad-ampliacion-terciarizadoras',
    component: RegistroExpansionComponent,
       canActivate: [IniciarTramiteResolver],
        resolve: { iniciarResolverData: IniciarTramiteResolver },
        data: {
          iniciarConfig: {
            procedureId: '80211'
          }
        }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'modalidad-ampliacion-terciarizadoras',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class RegistroExpansionRoutingModule {}
