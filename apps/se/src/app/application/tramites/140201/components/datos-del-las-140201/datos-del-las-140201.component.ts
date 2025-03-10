import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-las-140201',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './datos-del-las-140201.component.html',
  styleUrl: './datos-del-las-140201.component.css',
})
export class DatosDelLas140201Component {}
