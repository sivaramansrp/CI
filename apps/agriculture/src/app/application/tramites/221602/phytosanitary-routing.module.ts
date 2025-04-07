import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PhytosanitaryComponent } from './pages/phytosanitary/phytosanitary.component';





const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: PhytosanitaryComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class PhytosanitaryRoutingModule { }
