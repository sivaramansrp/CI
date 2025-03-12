import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoMaquilaRoutingModule } from './permiso-maquila-routing.module';
import { TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';
import { Datos260212Component } from './pages/datos-260212/datos-260212.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';

import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { SolicitudService } from './services/solicitud.service';

@NgModule({
  declarations: [PermisoMaquilaComponent,
    Datos260212Component
  ],
  imports: [
    CommonModule,
    PermisoMaquilaRoutingModule,
    WizardComponent,
    TituloComponent,
    DatosDeLaSolicitudComponent
  ],
  providers: [provideHttpClient(), ToastrService,SolicitudService],
})
export class PermisoMaquilaModule { }
