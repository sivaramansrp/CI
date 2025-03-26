import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from '@ng-mf/data-access-user';
import { HeaderComponent } from '@ng-mf/data-access-user';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
  ],
  providers: [
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppInbalModule { }
