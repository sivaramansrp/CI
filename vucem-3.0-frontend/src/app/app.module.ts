import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { InformacionUsuarioComponent } from "./shared/components/informacion-usuario/informacion-usuario.component";

@NgModule({
  declarations: [AppComponent],
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
],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
