import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component'; 
const routes: Routes = [
  {
    path: 'registro',
    component: RegistroPageComponent,
    children: [
      { path: 'registro',
        component: RegistroPageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'registro',
      },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarSolicitudMCPRoutingModule { }
