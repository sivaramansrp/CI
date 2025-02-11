import { ToastrModule, provideToastr } from 'ngx-toastr';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { InformacionUsuarioComponent } from "./shared/components/informacion-usuario/informacion-usuario.component";
import { NavComponent } from './shared/components/nav/nav.component';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { TituloComponent } from "./shared/components/titulo/titulo.component";
import { SolicitanteService } from './core/services/shared/solicitante/solicitante.service';

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
    InformacionUsuarioComponent,
    NavComponent,
    TituloComponent,
    ToastrModule.forRoot(),
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    SolicitanteService
  ],
  bootstrap: [AppComponent],
})
export class App5701Module {}
