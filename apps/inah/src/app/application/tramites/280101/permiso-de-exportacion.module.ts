import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent,FirmaElectronicaComponent, SolicitanteComponent,TituloComponent,WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DatosComponent } from './pages/datos/datos.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { PermisoDeExportacionComponent } from './pages/permiso-de-exportacion/permiso-de-exportacion.component';
import { PermisoDeExportacionRoutingModule } from './permiso-de-exportacion-routing.module';
import { DestinoComponent } from './component/destino/destino.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';

@NgModule({
  // Declaraciones de los componentes que pertenecen a este módulo
  declarations: [
    DatosComponent,
    FirmarSolicitudComponent,
    PermisoDeExportacionComponent,
  ],
  // Importaciones de otros módulos y componentes necesarios para este módulo
  imports: [
    AnexarDocumentosComponent, // Componente para anexar documentos
    SolicitudComponent,
    CommonModule, // Módulo común de Angular
    BtnContinuarComponent, // Componente de botón para continuar
    DestinoComponent,
    FirmaElectronicaComponent, // Componente para la firma electrónica
    ReactiveFormsModule, // Módulo para formularios reactivos
    PermisoDeExportacionRoutingModule, // Módulo de enrutamiento específico para este módulo
    SolicitanteComponent, // Componente del solicitante
    TituloComponent, // Componente para mostrar títulos
    AlertComponent, // Componente para mostrar alertas
    WizardComponent, // Componente para el asistente de pasos
  ],
  // Proveedores de servicios que estarán disponibles en este módulo
  providers: [
    ToastrService, // Servicio para mostrar notificaciones tipo toast
  ],
  exports:[PermisoDeExportacionComponent]
})
export class PermisoDeExportacionModule { }
