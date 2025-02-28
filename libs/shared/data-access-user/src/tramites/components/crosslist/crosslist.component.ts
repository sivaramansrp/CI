import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'crosslist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crosslist.component.html',
  styleUrl: './crosslist.component.scss',
 host: { 'hostID': crypto.randomUUID().toString() }
})
export class CrosslistComponent implements OnInit ,OnChanges {
  @Input({ required: true }) fechas!: string[];
  @Input() botonField: any;
  fechasDatos: string[] = [];
  fechasSeleccionadas: string[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  @Input() showSearchInput1: boolean = false;
  @Input() showSearchInput2: boolean = false;
  botones = [
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

  ngOnInit() {
    this.fechasDatos = [...this.fechas];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['fechas'].currentValue){
      this.fechas = [...changes['fechas'].currentValue];
      this.fechasDatos = [...this.fechas]
    }
  }

  agregar(type: string) {
    if (type === 't') {
      this.fechasSeleccionadas = [...this.fechas];
      this.fechasDatos = [];
    } else {
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
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
    }
  }
}
