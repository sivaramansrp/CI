import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { APP_ROUTES } from '../app.routes';
import { provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RemoteEntryComponent
  ],
  providers: [
    provideRouter(APP_ROUTES),
  ],
  bootstrap: []
})
export class RemoteEntryModule { }