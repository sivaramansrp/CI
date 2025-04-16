import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspensionPermisoRoutingModule } from './suspension-permiso-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { BusquedaPermisosComponent } from './components/busqueda-permisos/busqueda-permisos.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { PasoDosComponent } from '../../shared/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../../shared/paso-tres/paso-tres.component';


@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent    
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
    FirmaElectronicaComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
    CatalogosService
  ],
})
export class SuspensionPermisoModule { }
