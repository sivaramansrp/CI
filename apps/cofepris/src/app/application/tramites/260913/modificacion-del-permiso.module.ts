import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
//import { InicioSesionService } from '@libs/shared/data-access-user/src';
import { ModificacionDelPermisoRoutingModule } from './modificacion-del-permiso-routing.module';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    
  ],
  imports: [
    CommonModule,
    ModificacionDelPermisoRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitanteComponent
  ],
  providers: [
    //InicioSesionService,
    //SubirDocumentoService,
    ToastrService
  ],
})
export class ModificacionDelPermisoModule { }
