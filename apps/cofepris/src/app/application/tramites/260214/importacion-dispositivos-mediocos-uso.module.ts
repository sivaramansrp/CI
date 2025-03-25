import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { ImportacionDispositivosMedicosUsoRoutingModule } from './importacion-dispositivos-mediocos-uso-routing.module';
import { ToastrService } from 'ngx-toastr';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportacionDispositivosMedicosUsoRoutingModule,
    ContenedorDePasosComponent
  ],
  providers: [ToastrService,SubirDocumentoService,InicioSesionService],
})
export class ImportacionDispositivosMedicosUsoModule { }
