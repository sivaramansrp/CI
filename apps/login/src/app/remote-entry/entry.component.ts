import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@ng-mf/data-access-user';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent,RouterModule],
  selector: 'app-agriculture-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
