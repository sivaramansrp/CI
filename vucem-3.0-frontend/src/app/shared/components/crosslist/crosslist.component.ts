import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'crosslist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crosslist.component.html',
  styleUrl: './crosslist.component.scss',
})
export class CrosslistComponent {
  @Input({ required: true }) fechas!: Array<string>;

  fs_datos: Array<string> = [];

  fs_seleccionadas: Array<string> = [];
  fecha: FormControl = new FormControl('');
  f_seleccionada: FormControl = new FormControl('');

  botones = [
    {
      btn_nombre: 'Agregar',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btn_nombre: 'Agregar todas',
      class: 'btn-default',

      funcion: () => this.agregar('t'),
    },
    {
      btn_nombre: 'Quitar',
      class: 'btn-danger',

      funcion: () => this.quitar(''),
    },
    {
      btn_nombre: 'Quitar todas',
      class: 'btn-default',

      funcion: () => this.quitar('t'),
    },
  ];

  ngOnInit() {
    this.fs_datos = [...this.fechas];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['fechas'].currentValue){
      this.fechas = [...changes['fechas'].currentValue];
      this.fs_datos = [...this.fechas]
    }
  }

  agregar(type: string) {
    if (type === 't') {
      this.fs_seleccionadas = [...this.fechas];
      this.fs_datos = [];
    } else {
      const fecha_valor = this.fecha.value.map(Number);
      this.fs_seleccionadas.push(this.fs_datos[fecha_valor]);
      this.fs_datos.splice(fecha_valor, 1);
    }
  }

  quitar(type: string = '') {
    if (type === 't') {
      this.fs_datos = [...this.fechas];
      this.fs_seleccionadas = [];
    } else {
      const fecha_valor = this.f_seleccionada.value.map(Number);
      this.fs_datos.push(this.fs_seleccionadas[fecha_valor]);
      this.fs_seleccionadas.splice(fecha_valor, 1);
    }
  }
}
