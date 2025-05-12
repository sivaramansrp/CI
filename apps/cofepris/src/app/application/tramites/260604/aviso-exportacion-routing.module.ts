import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const routes: Routes = [
  {
    path: 'pantallas',
    component: PantallasComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pantallas',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoExportacionRoutingModule { 


}
