import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoMaquilaRoutingModule } from './permiso-maquila-routing.module';
import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';
import { Datos260212Component } from './pages/datos-260212/datos-260212.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { provideHttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [PermisoMaquilaComponent,
    Datos260212Component
  ],
  imports: [
    CommonModule,
    PermisoMaquilaRoutingModule,
    WizardComponent,
    TituloComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent
  ],
  providers: [provideHttpClient(), ToastrService],
})
export class PermisoMaquilaModule { }
