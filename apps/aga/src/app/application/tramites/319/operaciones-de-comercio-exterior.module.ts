import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OperacionesDeComercioExteriorRoutingModule } from './operaciones-de-comercio-exterior-routing.module';
import { PasoDocComponent } from './pages/paso-doc/paso-doc.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [
    PasoDocComponent,
    PasoUnoComponent,
    SolicitudPageComponent
  ],
  imports: [
    CommonModule,
    OperacionesDeComercioExteriorRoutingModule
  ]
})
export class OperacionesDeComercioExteriorModule { }
