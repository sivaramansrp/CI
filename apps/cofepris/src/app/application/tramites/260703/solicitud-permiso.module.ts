import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
  InputRadioComponent,
  NotificacionesComponent,
  SolicitanteComponent,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelEstablecimientoComponent } from './components/datos-del-establecimiento/datos-del-establecimiento.component';
import { DatosSolitudeComponent } from './components/datos-solicitud/datos-solicitude.component';
import { DomicilioDelEstablecimientoComponent } from './components/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { ManifiestosYDeclaracionesComponent } from './components/manifiestos-y-declaraciones/manifiestos-y-declaraciones.component';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';
import { SolicitudPermisoRoutingModule } from './solicitud-permiso-routing.module';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    DatosComponent,
    DatosSolitudeComponent,
    DatosDelEstablecimientoComponent,
    DomicilioDelEstablecimientoComponent,
    ManifiestosYDeclaracionesComponent,
    RepresentanteLegalComponent,
    TercerosRelacionadosComponent,
  ],
  imports: [
    CommonModule,
    SolicitudPermisoRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    AlertComponent,
    PagoDeDerechosComponent,
    TramiteAsociadosComponent,
    TableComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    NotificacionesComponent,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, InicioSesionService, SubirDocumentoService],
})
export class SolicitudPermisoModule {}
