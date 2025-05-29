import { ZoosanitarioParaImportacionComponent } from './pages/zoosanitario-para-importacion/zoosanitario-para-importacion.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: ZoosanitarioParaImportacionComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class ZoosanitarioParaImportacionRoutingModule { }
