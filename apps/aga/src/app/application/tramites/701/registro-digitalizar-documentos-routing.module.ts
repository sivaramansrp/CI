
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const routes: Routes = [
  {
      path: 'solicitud',
      component: SolicitudPageComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroDigitalizarDocumentosRoutingModule { }
