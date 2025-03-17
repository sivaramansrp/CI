import { RouterModule, Routes } from '@angular/router';
import { ContenedorComplementarPlantasComponent } from './components/contenedor-complementar-plantas/contenedor-complementar-plantas.component';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { producerUpdatesAllowed } from '@angular/core/primitives/signals';

const ROUTES: Routes = [
   {
      path: 'solicitud',
      component: SolicitudPageComponent,
    },
    {
      path: 'complementar-plantas',
      component: ContenedorComplementarPlantasComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'solicitud',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AutorizacionProgrmaNuevoRoutingModule { }


