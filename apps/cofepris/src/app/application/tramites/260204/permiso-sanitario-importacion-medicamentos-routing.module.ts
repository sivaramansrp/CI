import { RouterModule, Routes } from '@angular/router';
import { DatosMercanciaComponent } from '../../shared/components/datos-mercancia/datos-mercancia.component';
import { NgModule } from '@angular/core';
import { ScianTablaContenedoraComponent } from './components/scian-tabla-contenedora/scian-tabla-contenedora.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
  {
    path: 'scian-selecion',
    component: ScianTablaContenedoraComponent,
  },
  {
    path: 'mercancia-datos',
    component: DatosMercanciaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PermisoSanitarioImportacionMedicamentosRoutingModule {}
