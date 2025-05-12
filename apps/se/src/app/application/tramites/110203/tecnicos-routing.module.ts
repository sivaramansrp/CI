import { RouterModule, Routes } from '@angular/router';
import { DatosBusquedaComponent } from './components/datos-busqueda/datos-busqueda.component';
import { NgModule } from '@angular/core';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: DatosBusquedaComponent,
      
    },
    {
      path: 'tecnicosdatos',
      component: TecnicosComponent,
      
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class TecnicosRoutingModule { }
