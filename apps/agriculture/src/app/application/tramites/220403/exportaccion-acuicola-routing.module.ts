import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcuicolaComponent } from './pages/acuicola/acuicola.component';

const routes: Routes = [
  {
      path: 'acuicola',
      component: AcuicolaComponent
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'acuicola',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportaccionAcuicolaRoutingModule { }
