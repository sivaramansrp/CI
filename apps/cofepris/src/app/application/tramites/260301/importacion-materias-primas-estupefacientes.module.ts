import { CommonModule } from '@angular/common';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { ImportacionMateriasPrimasEstupefacientesRoutingModule } from './importacion-materias-primas-estupefacientes-routing.module';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportacionMateriasPrimasEstupefacientesRoutingModule,
    ContenedorDePasosComponent,
  ],
  providers: [
    ToastrService
  ],
})
export class ImportacionMateriasPrimasEstupefacientesModule {}
