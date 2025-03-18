import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CAPACIDAD_INSTALADA } from '../../constantes/capacidad-instalada.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-capacidad-instalada',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './capacidad-instalada.component.html',
  styleUrl: './capacidad-instalada.component.css',
})
export class CapacidadInstaladaComponent {
  constructorapacidadInstaladaTablaSeleccion = TablaSeleccion.CHECKBOX;
  capacidadInstaladaEncabezado = CAPACIDAD_INSTALADA;
  capacidadInstaladaDatos = [];
  fraccionArancelariaProductoTerminadoCatlogo!: [];
}
