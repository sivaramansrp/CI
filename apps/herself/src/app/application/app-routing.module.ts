import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const ROUTES: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'cerdificado' },
  {
     path:'cerdificado',
    loadChildren: () =>import('./tramites/110209/certificado-sgp.module').then((m)=>m.CertificadoSGPModule)
  },
  {  
    path:'certificado-tecnico-japon',
    loadChildren: () =>import('./tramites/110218/certificado-tecnico-japon.module').then((m)=>m.CertificadoTecnicoJaponModule)

  }

  
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
