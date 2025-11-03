import { CommonModule } from '@angular/common';

import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';

import { ContenedorDeDatosSolicitudComponent } from './components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { Datos260212Component } from './pages/datos-260212/datos-260212.component';

import { PagoDeDerechosContenedoraComponent } from './components/pago-de-derechos-contenedora/pago-de-derechos.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { SolicitudService } from './services/solicitud.service';

import { PagoDeDerechosService } from './services/pago-de-derechos.service';
import { PermisoMaquilaRoutingModule } from './permiso-maquila-routing.module';

import { TercerosService } from './services/terceros.service';

import { NgModule } from '@angular/core';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';

import { TercerosRelacionadosVistaComponent } from './components/terceros-relacionados-vista/terceros-relacionados-vista.component';


@NgModule({
  declarations: [PermisoMaquilaComponent,
    Datos260212Component
  ],
  imports: [
    CommonModule,
    PermisoMaquilaRoutingModule,
    WizardComponent,
    TituloComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    AlertComponent
  ],
  providers: [provideHttpClient(), ToastrService,SolicitudService,PagoDeDerechosService,TercerosService,InicioSesionService,SubirDocumentoService ],
})
export class PermisoMaquilaModule { }
