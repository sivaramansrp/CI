import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RevisionDocumentalComponent } from './components/revision-documental/revision-documental.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const sagarpaRutes: Routes = [
  {
      path: 'datosdelasolicitud',
      component: SolicitudPageComponent,
    },
    {
      path: 'revisiondocumental',
      component: RevisionDocumentalComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'datosdelasolicitud',
    }
];

@NgModule({
  imports: [RouterModule.forChild(sagarpaRutes)],
  exports: [RouterModule]
})
export class SagarpaRoutingModule { }
