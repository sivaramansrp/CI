import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { DatosMercanciaComponent } from './components/datos-mercancia/datos-mercancia.component';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoUnoComponent,
    PasoTresComponent,
    DatosMercanciaComponent
  ],
  imports: [
    CommonModule,
    FitosanitarioRoutingModule
  ]
})
export class FitosanitarioModule { }
