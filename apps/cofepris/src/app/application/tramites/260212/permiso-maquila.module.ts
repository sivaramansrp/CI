import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoMaquilaRoutingModule } from './permiso-maquila-routing.module';
import { TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';
import { Datos260212Component } from './pages/datos-260212/datos-260212.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';


import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { SolicitudService } from './services/solicitud.service';
import { ClaveScianComponent } from './components/clave-scian/clave-scian.component';
import { FormularioOperacionComercialComponent } from './components/formulario-operacion-comercial/formulario-operacion-comercial.component';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';
import { PagoDeDerechosService } from './services/pago-de-derechos.service';
import { TercerosService } from './services/terceros.service';


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
    RepresentanteLegalComponent
  ],
  providers: [provideHttpClient(), ToastrService,SolicitudService, PagoDeDerechosService,TercerosService],
})
export class PermisoMaquilaModule { }
