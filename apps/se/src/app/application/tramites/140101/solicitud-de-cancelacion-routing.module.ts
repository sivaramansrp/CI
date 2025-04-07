import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

// Definición de las rutas para el módulo
const ROUTES: Routes = [
  {
    path: 'solicitante', // Ruta para la página del solicitante
    component: SolicitantePageComponent, // Componente asociado a la ruta
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)], // Importa las rutas definidas
  exports: [RouterModule] // Exporta el módulo de enrutamiento
})
export class SolicitudDeCancelacionRoutingModule { }
