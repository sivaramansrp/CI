import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule,TituloComponent,TablaDinamicaComponent],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',
})
export class BitacoraComponent {}
