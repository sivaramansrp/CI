import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'app-501-entry',
  template: `<h1>Welcome to 501!</h1>`,
})
export class RemoteEntryComponent {}
