import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { InformacionUsuarioComponent } from "./shared/components/informacion-usuario/informacion-usuario.component";
import { NavComponent } from './shared/components/nav/nav.component';
import { TituloComponent } from "./shared/components/titulo/titulo.component";

@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavComponent,
    HttpClientModule,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    InformacionUsuarioComponent,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    InformacionUsuarioComponent,
    TituloComponent
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
