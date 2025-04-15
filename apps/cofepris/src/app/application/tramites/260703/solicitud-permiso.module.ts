import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosSolitudeComponent } from './components/datos-solicitud/datos-solitude.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPermisoRoutingModule } from './solicitud-permiso-routing.module';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';



@NgModule({
  declarations: [PasoUnoComponent,DatosComponent, DatosSolitudeComponent, TercerosRelacionadosComponent],
  imports: [
    CommonModule, 
    SolicitudPermisoRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    PagoDeDerechosComponent,
    TramiteAsociadosComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService
  ]
})
export class SolicitudPermisoModule {}
