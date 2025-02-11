import { ToastrModule, provideToastr } from 'ngx-toastr';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { InformacionUsuarioComponent } from "./shared/components/informacion-usuario/informacion-usuario.component";
import { NavComponent } from './shared/components/nav/nav.component';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { TituloComponent } from "./shared/components/titulo/titulo.component";

@NgModule({
  declarations: [
    AppComponent,
    SeleccionTramiteComponent
  ],
  imports: [
    AkitaNgDevtools,
    AppRoutingModule,
    BreadcrumbComponent,
    BrowserAnimationsModule,
    BrowserModule,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    InformacionUsuarioComponent,
    InformacionUsuarioComponent,
    NavComponent,
    TituloComponent,
    PdfViewerModule,
    ToastrModule.forRoot(),
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
