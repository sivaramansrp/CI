import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
/**
 * Interfaz que representa las etiquetas de la lista cruzada.
 * 
 * @property {string} tituluDeLaIzquierda - El título de la izquierda.
 * @property {string} derecha - El valor de la derecha.
 */
export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
}
@Component({
  selector: 'crosslist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crosslist.component.html',
  styleUrl: './crosslist.component.scss',
  host: {}
})
export class CrosslistComponent implements OnInit ,OnChanges  {
  @Input({ required: true }) fechas!: string[];
  @Input() botonField: any;
  @Input() botones: any;
  @Input() label: CrossListLable | undefined;
  fechasDatos: string[] = [];
  fechasSeleccionadas: string[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  @Input() showSearchInput1: boolean = false;
  @Input() showSearchInput2: boolean = false;
  @Output() fechasSeleccionadasChange = new EventEmitter<string[]>();
  ngOnInit() {
    this.fechasDatos = [...this.fechas];
    if (!this.botones) {
      this.setButtonDefault();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fechas'].currentValue) {
      this.fechas = [...changes['fechas'].currentValue];
      this.fechasDatos = [...this.fechas]
    }
  }
  /**
   * Establece los botones predeterminados para la interfaz de usuario.
   * 
   * Este método configura un conjunto de botones con sus nombres, clases CSS y funciones asociadas.
   * Los botones incluyen opciones para agregar, agregar todas, quitar y quitar todas.
   * 
   * @returns {void}
   */
  setButtonDefault(): void {
    this.botones = [
      {
        btnNombre: 'Agregar',
        class: 'btn-primary',
        funcion: () => this.agregar(''),
      },
      {
        btnNombre: 'Agregar todas',
        class: 'btn-default',

        funcion: () => this.agregar('t'),
      },
      {
        btnNombre: 'Quitar',
        class: 'btn-danger',

        funcion: () => this.quitar(''),
      },
      {
        btnNombre: 'Quitar todas',
        class: 'btn-default',

        funcion: () => this.quitar('t'),
      },
    ];

  }


  agregar(type: string) {
    if (type === 't') {
      this.fechasSeleccionadas = [...this.fechas];
      this.fechasDatos = [];
    } else {
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
      this.fechasSeleccionadasChange.emit(this.fechasSeleccionadas);
    }
  }

  quitar(type: string = '') {
    if (type === 't') {
      this.fechasDatos = [...this.fechas];
      this.fechasSeleccionadas = [];
    } else {
      const fechaValor = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas.splice(fechaValor, 1);
      this.fechasSeleccionadasChange.emit(this.fechasSeleccionadas);
  }
  }
}
