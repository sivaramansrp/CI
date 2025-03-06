import { ToastrModule, provideToastr } from 'ngx-toastr';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbComponent, FooterComponent, HeaderComponent, InformacionUsuarioComponent, NavComponent, SolicitanteService, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { BandejaTareasPendientesComponent } from './bandejaPendientes/bandeja-tareas-pendientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    SeleccionModuloComponent,
  ],
  imports: [
    AkitaNgDevtools,
    AppRoutingModule,
    CommonModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    TituloComponent,
    ToastrModule.forRoot(),
    BandejaTareasPendientesComponent,
    BrowserAnimationsModule, // Requerido por Angular Material
    MatRadioModule
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppFuncionarioModule {}
