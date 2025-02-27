import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RenovacionesComponent } from './pages/renovaciones/renovaciones.component';
import { RenovacionesMuestrasMercanciasRoutingModule } from './renovaciones-muestras-mercancias-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RenovacionesMuestrasMercanciasRoutingModule,
    RenovacionesComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    ToastrModule.forRoot()
  ]
})
export class RenovacionesMuestrasMercanciasModule { }
