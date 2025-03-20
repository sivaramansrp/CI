import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CrossListLable,CrosslistComponent } from '@libs/shared/data-access-user/src';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pais-de-origin',
  standalone: true,
  imports: [CommonModule,
     CrosslistComponent
    ],
  templateUrl: './pais-de-origin.component.html',
  styleUrl: './pais-de-origin.component.scss',
})
export class PaisDeOriginComponent {
  /**
 * Arreglo para almacenar el rango de días seleccionables.
 */
  selectRangoDias: string[] = [];
  /**
 * Arreglo para almacenar las fechas seleccionadas por el usuario.
 */
  fechasSeleccionadas: string[] = [];
  /**
   * Arreglo para almacenar los datos relacionados con las fechas.
   */
  fechasDatos: string[] = [];

  /**
   * Constructor de la clase PaisDeOriginComponent.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor(){}

  /**
   * Etiquetas para el componente CrossList que representan el país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionados',
  };

  /**
 * Control de formulario para manejar una fecha individual.
 */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para manejar una fecha seleccionada por el usuario.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
 * Variable que controla la visibilidad de una sección plegable.
 */
  plegable = false;


  /**
   * Alterna la visibilidad de la sección plegable.
   */
  mostrar_plegable():void {
    this.plegable = !this.plegable;
  }


  /**
   * Configuración de los botones y sus respectivas funciones para manipular las selecciones.
   */
  botonField = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: () => this.agregar('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: () => this.quitar('t'),
    },
  ];


  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  agregar(tipo: string) {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo = '') {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const fechaValor = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas.splice(fechaValor, 1);
    }
  }

}
