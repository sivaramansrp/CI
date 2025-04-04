import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvisoDeReciclajeRoutingModule } from './aviso-de-reciclaje-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

@NgModule({
  declarations: [PasoUnoComponent, PasoDosComponent],
  imports: [CommonModule, AvisoDeReciclajeRoutingModule],
})
export class AvisoDeReciclajeModule {}
