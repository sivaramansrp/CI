import { AgregarAgenteComponent } from './components/agregar-agente/agregar-agente.component';
import { AgregarFusionEscisionComponent } from './components/agregar-fusion-escision/agregar-fusion-escision.component';
import { AvisoDeModificacionComponent } from './pages/aviso-de-modificacion/aviso-de-modificacion.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'aviso',
    component: AvisoDeModificacionComponent,
  },
  {
    path:'agregar-fusion-escision',
    component: AgregarFusionEscisionComponent
  },
  {
    path:'agregar-agente',
    component: AgregarAgenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AvisoDeModificationRoutingModule {}
