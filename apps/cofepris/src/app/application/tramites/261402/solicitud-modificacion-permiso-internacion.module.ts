import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudModificacionPermisoInternacionComponent } from './pages/solicitud-modificacion-permiso-internacion/solicitud-modificacion-permiso-internacion.component';
import { SolicitudModificacionPermisoInternacionRoutingModule } from './solicitud-modificacion-permiso-internacion-routing.module';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    SolicitudModificacionPermisoInternacionComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    SolicitudModificacionPermisoInternacionRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    SolicitanteComponent,
    AlertComponent,
    PasoDosComponent,                                                                    
    PasoTresComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService
  ]
})
export class SolicitudModificacionPermisoInternacionModule { }
