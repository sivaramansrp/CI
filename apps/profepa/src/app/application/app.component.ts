import { Component, NgZone } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';
import { APP_VERSION } from 'src/environments/version'; // <-- Add this import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vucem-3.0-frontend';
  appVersion = APP_VERSION; // <-- Add this property

  constructor(
    private ngZone: NgZone,
  ) {
    akitaDevtools(ngZone, {});
  }
}
