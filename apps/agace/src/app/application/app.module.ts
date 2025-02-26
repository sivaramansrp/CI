import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent, HeaderComponent, TituloComponent } from '@ng-mf/data-access-user';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';


@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TituloComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppAgaceModule { }
