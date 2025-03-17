import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrosslistComponent, CrossListLable } from '@libs/shared/data-access-user/src';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pais-de-origin',
  standalone: true,
  imports: [CommonModule,CrosslistComponent],
  templateUrl: './pais-de-origin.component.html',
  styleUrl: './pais-de-origin.component.scss',
})
export class PaisDeOriginComponent {
  selectRangoDias: string[] = [];
  fechasSeleccionadas: string[] = [];
  fechasDatos: string[] = [];
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionados',
  };
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');

  colapsable = false;

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

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
  agregar(tipo: string) {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = '') {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const fechaValor = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas.splice(fechaValor, 1);
    }
  }

}
