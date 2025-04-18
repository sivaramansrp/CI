import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';

const ROUTES: Routes = [
  {
    path: 'plaguicidas',
    component: PlaguicidasComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plaguicidas',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MuestrasPlaguicidasRoutingModule { }
