import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SustanciasQuimicasComponent } from './pages/sustancias-quimicas/sustancias-quimicas.component';

const ROUTES: Routes = [
  {
    path: 'sustancias-quimicas',
    component: SustanciasQuimicasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoImportacionSustanciasQuimicasRoutingModule { }
