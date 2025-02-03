import { AgriculturaComponent } from './pages/agricultura/agricultura.component';
import { CommonModule } from '@angular/common';
import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';
import { NgModule } from '@angular/core';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';


@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoCuatroComponent,
    AgriculturaComponent
  ],
  imports: [
    CommonModule,
    FitosanitarioRoutingModule
  ]
})
export class FitosanitarioModule { }
