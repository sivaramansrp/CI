import { appRoutes } from '../app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RemoteEntryComponent
  ],
  providers: [
    provideRouter(appRoutes),
  ],
  bootstrap: []
})
export class RemoteEntryModule { }