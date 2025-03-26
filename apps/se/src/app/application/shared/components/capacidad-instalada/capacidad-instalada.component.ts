import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { CAPACIDAD_INSTALADA } from '../../constantes/capacidad-instalada.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para la capacidad instalada
 * @export CapacidadInstaladaComponent
 * */
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
  /**
   * Constructor de la clase CapacidadInstaladaComponent
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador
   */
  constructor(private ubicaccion: Location) {
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }
  /**
   * Tipo de selección para la tabla de capacidad instalada
   * @property {TablaSeleccion} constructorapacidadInstaladaTablaSeleccion
   */
  constructorapacidadInstaladaTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Encabezados de la tabla de capacidad instalada
   * @property {any} capacidadInstaladaEncabezado
   */
  capacidadInstaladaEncabezado = CAPACIDAD_INSTALADA;

  /**
   * Datos de la tabla de capacidad instalada
   * @property {any[]} capacidadInstaladaDatos
   */
  capacidadInstaladaDatos = [];

  /**
   * Catálogo de fracciones arancelarias de producto terminado
   * @property {any[]} fraccionArancelariaProductoTerminadoCatlogo
   */
  fraccionArancelariaProductoTerminadoCatlogo!: [];

  /**
   * Vuelve a la ubicación anterior en el historial del navegador
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
}
