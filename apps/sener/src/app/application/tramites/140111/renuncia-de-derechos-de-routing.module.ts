import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenunciaDeDerechosDePermisosComponent } from './pages/renuncia-de-derechos-de-permisos/renuncia-de-derechos-de-permisos.component';

const routes: Routes = [
  {
    path: 'solicitante',
    component: RenunciaDeDerechosDePermisosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenunciaDeDerechosDeRoutingModule { }
