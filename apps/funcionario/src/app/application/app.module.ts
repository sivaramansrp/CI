import { BreadcrumbComponent, FooterComponent, HeaderComponent, NavComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BandejaTareasPendientesComponent } from './bandejaPendientes/bandeja-tareas-pendientes.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { provideHttpClient } from '@angular/common/http';



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
    FooterComponent
],
  providers: [
    ToastrService,
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
    ToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppFuncionarioModule {}
