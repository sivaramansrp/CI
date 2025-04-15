import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspensionPermisoRoutingModule } from './suspension-permiso-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { BusquedaPermisosComponent } from './components/busqueda-permisos/busqueda-permisos.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    SuspensionPermisoRoutingModule,
    BusquedaPermisosComponent,
    WizardComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    TituloComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
    CatalogosService
  ],
})
export class SuspensionPermisoModule { }
