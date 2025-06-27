import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Componente de entrada remoto para la aplicación Cofepris.
 * 
 * @export
 * @class RemoteEntryComponent
 */
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-cofepris-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}