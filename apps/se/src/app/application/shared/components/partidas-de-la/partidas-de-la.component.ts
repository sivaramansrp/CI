/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { UppercaseDirective } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    TableComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
export class PartidasDeLaComponent {
  @Input() form!: FormGroup;
  @Input() formForTotalCount!: FormGroup;
  @Input() tableHeaderData: ConfiguracionColumna<any>[] = [];
  @Input() tableBodyData: any[] = [];
  @Input() mostrarTabla = false;
  @Output() filaSeleccionadaChange = new EventEmitter<any[]>();
  @Output() validarYEnviarFormularioEvent = new EventEmitter<void>();
  @Output() navegarParaModificarPartidaEvent = new EventEmitter<void>();
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>(); // Keep as string for reusability

  CHECKBOX = TablaSeleccion.CHECKBOX;

  constructor(private fb: FormBuilder) {
    //Constructor necesario para la inyección de dependencias
  }

  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionadaChange.emit(filasSeleccionadas);
  }

  validarYEnviarFormulario(): void {
    this.validarYEnviarFormularioEvent.emit();
  }

  navegarParaModificarPartida(): void {
    this.navegarParaModificarPartidaEvent.emit();
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStoreEvent.emit({ form, campo, metodoNombre });
  }
}