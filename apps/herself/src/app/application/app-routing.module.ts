import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const ROUTES: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'cerdificado-sgp' },
  {
     path:'cerdificado-sgp',
    loadChildren: () =>import('./tramites/110209/certificado-sgp.module').then((m)=>m.CertificadoSGPModule)
  

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
