import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-aviso-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './aviso-terceros-relacionados.component.html',
  styleUrl: './aviso-terceros-relacionados.component.scss',
})
export class AvisoTercerosRelacionadosComponent {}
