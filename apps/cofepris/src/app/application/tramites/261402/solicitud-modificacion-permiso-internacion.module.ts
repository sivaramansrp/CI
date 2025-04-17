import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudModificacionPermisoInternacionComponent } from './pages/solicitud-modificacion-permiso-internacion/solicitud-modificacion-permiso-internacion.component';
import { SolicitudModificacionPermisoInternacionRoutingModule } from './solicitud-modificacion-permiso-internacion-routing.module';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';

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
    DatosDeLaSolicitudComponent,
    ReactiveFormsModule,
    SolicitanteComponent,
    AlertComponent,
    PasoDosComponent,                                                                    
    PasoTresComponent,
    TramiteAsociadosComponent,
    PagoDeDerechosComponent,
    TercerosRelacionadosComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService
  ]
})
export class SolicitudModificacionPermisoInternacionModule { }
