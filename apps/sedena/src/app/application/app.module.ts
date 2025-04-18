import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
  FooterComponent,
  SolicitanteService,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { HeaderComponent } from '@ng-mf/data-access-user';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrModule, ToastrService } from 'ngx-toastr';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

@NgModule({
  declarations: [AppComponent, SeleccionTramiteComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    TituloComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
    ToastrService,
    SolicitanteService,
  ],
  bootstrap: [AppComponent],
})
export class AppSedenaModule {}
