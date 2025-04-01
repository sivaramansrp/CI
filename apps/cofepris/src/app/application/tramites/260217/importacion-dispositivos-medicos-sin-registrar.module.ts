import { CommonModule } from '@angular/common';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { ImportacionDispositivosMedicosSinRegistrarRoutingModule } from './importacion-dispositivos-medicos-sin-registrar-routing.module';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportacionDispositivosMedicosSinRegistrarRoutingModule,
    ContenedorDePasosComponent,
  ],
  providers: [
    ToastrService
  ],
})
export class ImportacionDispositivosMedicosSinRegistrarModule {}
