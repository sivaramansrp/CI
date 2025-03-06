import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent,RouterModule],
  selector: 'app-agriculture-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
