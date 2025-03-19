import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css',
})
export class PropietarioComponent {}
