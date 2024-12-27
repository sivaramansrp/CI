import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MESES, SEMANA } from '../../constantes/servicios-extraordinarios.enum';

import moment from 'moment';
import { InputFecha } from '../../../core/models/shared/components.model';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'input-fecha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  templateUrl: './input-fecha.component.html',
  styleUrl: './input-fecha.component.scss',
})
export class InputFechaComponent {
  @Output() valorCambiado: EventEmitter<string> = new EventEmitter();
  @Input() setFecha!: string;
  @Input({required: true}) datos!: InputFecha;


  meses = MESES;
  semana = SEMANA;

  anios: number[] = [];
  mountSelect!: any[];
  mostrar: boolean = false;
  Formulario!: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
    moment.locale('es');
    // this.generaanios();
    const fechaActual = moment().format('DD/MM/YYYY');
    const fecha = fechaActual.split('/');
    const ObjectDate = moment.utc(`${fecha[2]}-${fecha[1]}-${fecha[0]}`);
    this.generarFormulario(ObjectDate);
  }

  ngOnChanges() {
    if (this.setFecha != '' && this.setFecha != null) {
      const fecha = this.setFecha.split('/');
      const ObjectDate = moment.utc(`${fecha[2]}-${fecha[1]}-${fecha[0]}`);
      this.generarFormulario(ObjectDate);
      this.Formulario.controls['fecha_string'].enable();
      this.Formulario.get('fecha_string')?.setValue(
        moment.utc(ObjectDate).format('DD/MM/YYYY'),
      );
      this.Formulario.controls['fecha_string'].disable();
    }
  }

  get fecha_string() {
    return this.Formulario.get('fecha_string')?.value;
  }

  generarFormulario(fechaActual: moment.Moment) {
    this.Formulario = this.fb.group({
      dia: [fechaActual.date()],
      mes: [fechaActual.month() + 1],
      anio: [fechaActual.year()],
      fecha_string: [],
      fecha_seleccionada: [fechaActual],
    });
    this.Formulario.controls['fecha_string'].disable();
    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  cambioAnio(event: Event) {
    this.Formulario.get('anio')?.setValue(
      (event.target as HTMLInputElement).value,
    );
    const ObjectDate = moment.utc(
      `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`,
    );
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  cambioMes(event: Event) {
    this.Formulario.get('mes')?.setValue(
      (event.target as HTMLInputElement).value,
    );
    const ObjectDate = moment.utc(
      `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`,
    );
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  generaanios() {
    const year = moment().year();
    const inicio = year - 100;
    const final = year + 100;
    let contador = inicio;
    do {
      contador++;
      this.anios.push(contador);
    } while (contador != final);
  }

  getDayFromDate(mount: number, year: number) {
    const startDate = moment.utc(
      `${year}-${mount.toString().padStart(2, '0')}-01`,
    );
    const endDate = startDate.clone().endOf('month');
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const diaFormato = a > 9 ? a : '0' + a;
      const dayObject = moment(
        `${year}-${mount.toString().padStart(2, '0')}-${diaFormato}`,
      );
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });
    this.mountSelect = arrayDays;
  }

  changeMount(flag: any) {
    if (flag < 0) {
      const prevDate = this.Formulario.get('fecha_seleccionada')
        ?.value.clone()
        .subtract(1, 'month');
      this.Formulario.get('mes')?.setValue(prevDate.format('M'));
      this.Formulario.get('anio')?.setValue(prevDate.format('YYYY'));
      const ObjectDate = moment.utc(
        `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`,
      );
      this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

      this.getDayFromDate(
        this.Formulario.get('mes')?.value,
        this.Formulario.get('anio')?.value,
      );
    } else {
      const nextDate = this.Formulario.get('fecha_seleccionada')
        ?.value.clone()
        .add(1, 'month');
      this.Formulario.get('mes')?.setValue(nextDate.format('M'));
      this.Formulario.get('anio')?.setValue(nextDate.format('YYYY'));
      const ObjectDate = moment.utc(
        `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`,
      );
      this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

      this.getDayFromDate(
        this.Formulario.get('mes')?.value,
        this.Formulario.get('anio')?.value,
      );
    }
  }

  clickDay(day: any) {
    const mountYear =
      this.Formulario.get('fecha_seleccionada')?.value.format('YYYY-MM');
    const dia = day.value > 9 ? day.value : '0' + day.value;
    const parse = `${mountYear}-${dia}`;
    const ObjectDate = moment(parse);
    this.Formulario.get('dia')?.setValue(day.value);
    this.Formulario.controls['fecha_string'].enable();
    this.Formulario.get('fecha_string')?.setValue(
      moment.utc(ObjectDate).format('DD/MM/YYYY'),
    );
    this.Formulario.controls['fecha_string'].disable();
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);
    this.mostrar = false;

    this.valorCambiado.emit(this.Formulario.get('fecha_string')?.value);
  }

  mostrarCalendario() {
    if (this.datos.habilitado) {
      this.mostrar = true;
    }
  }

}
