import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { PagoDeDerechoComponent } from './components/pagodederechos/pago-de-derecho.component'; 
const routes: Routes = [

  {
    path: 'registro',
    component: RegistroPageComponent,
    children: [
      // { path: 'pagodederechos', component: PagoDeDerechoComponent }, // Correct child route

      { path: 'registro',
        component: RegistroPageComponent
      },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'pagodederechos', // Redirect to pagodederechos by default
        },
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarSolicitudMCPRoutingModule { }
