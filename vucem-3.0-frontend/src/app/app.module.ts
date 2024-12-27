import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavComponent,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
