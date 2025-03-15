/* eslint-disable sort-imports */
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { SolicitanteService, BreadcrumbComponent, FooterComponent, HeaderComponent, InformacionUsuarioComponent, NavComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent
  ],
  imports: [
    AkitaNgDevtools,
    AppRoutingModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    InformacionUsuarioComponent,
    NavComponent,
    TituloComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
    SolicitanteService
  ],
  bootstrap: [AppComponent],
})
export class AppAgriculturaModule { }
