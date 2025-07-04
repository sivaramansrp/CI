import { CommonModule } from '@angular/common';

import { AlertComponent, BtnContinuarComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';

import { Datos260212Component } from './pages/datos-260212/datos-260212.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';

import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { SolicitudService } from './services/solicitud.service';

import { ClaveScianComponent } from './components/clave-scian/clave-scian.component';
import { FormularioOperacionComercialComponent } from './components/formulario-operacion-comercial/formulario-operacion-comercial.component';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';

import { PagoDeDerechosService } from './services/pago-de-derechos.service';
import { PermisoMaquilaRoutingModule } from './permiso-maquila-routing.module';

import { TercerosService } from './services/terceros.service';

import { NgModule } from '@angular/core';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';


@NgModule({
  declarations: [PermisoMaquilaComponent,
    Datos260212Component
  ],
  imports: [
    CommonModule,
    PermisoMaquilaRoutingModule,
    WizardComponent,
    TituloComponent,
    DatosDeLaSolicitudComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent,
    ClaveScianComponent,
    FormularioOperacionComercialComponent,
    RepresentanteLegalComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    AlertComponent
  ],
  providers: [provideHttpClient(), ToastrService,SolicitudService,PagoDeDerechosService,TercerosService,InicioSesionService,SubirDocumentoService ],
})
export class PermisoMaquilaModule { }
