import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspeccionFisicaComponent } from './pages/inspeccion-fisica/inspeccion-fisica.component';

const routes: Routes = [
  {
    path: 'inspeccionfisica',
    component: InspeccionFisicaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionFisicaRoutingModule { }