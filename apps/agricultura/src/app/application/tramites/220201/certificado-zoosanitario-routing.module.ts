import { RouterModule, Routes } from '@angular/router';
import { AgregardestinatarioComponent } from './components/agregardestinatario/agregardestinatario.component';
import { NgModule } from '@angular/core';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';

export const ROUTES_ZOOSANITARIO: Routes = [
  {
    path: 'zoosanitario',
    component: ZoosanitarioPageComponent,
  },
  {
    path:'agregar-destinatario',
    component:AgregardestinatarioComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zoosanitario',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_ZOOSANITARIO)],
  exports: [RouterModule]
})
export class CertificadoZoosanitario { }
