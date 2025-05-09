import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnexoVeintiochoRoutingModule } from './anexo-veintiocho-routing.module';
import { FormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AnexoVeintiochoRoutingModule,
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
  ],
})
export class AnexoVeintiochoModule { }
