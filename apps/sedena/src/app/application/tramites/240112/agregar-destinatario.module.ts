import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AgregarDestinatarioRoutingModule } from './agregar-destinatario-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    AgregarDestinatarioRoutingModule
  ]
})
export class AgregarDestinatarioModule { }
