import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitudeComponent } from './pages/solicitude/solicitude.component';

const ROUTES: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'SolicitudePage' },
   {
     path: 'SolicitudePage',
     component: SolicitudeComponent
   },
  ];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoDeImportacionRoutingModule { }
