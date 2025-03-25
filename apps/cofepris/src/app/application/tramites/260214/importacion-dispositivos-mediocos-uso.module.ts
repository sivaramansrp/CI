import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CatalogosService,
  InicioSesionService,
  SubirDocumentoService,
} from '@libs/shared/data-access-user/src';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { ImportacionDispositivosMedicosUsoRoutingModule } from './importacion-dispositivos-mediocos-uso-routing.module';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportacionDispositivosMedicosUsoRoutingModule,
    ContenedorDePasosComponent,
  ],
  providers: [
    ToastrService,
    SubirDocumentoService,
    InicioSesionService,
    CatalogosService,
  ],
})
export class ImportacionDispositivosMedicosUsoModule {}
