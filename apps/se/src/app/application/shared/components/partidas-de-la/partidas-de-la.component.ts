/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { UppercaseDirective } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';
/**
 * PartidasDeLaComponent
 * Este componente es responsable de gestionar las partidas de la mercancía.
 * Proporciona un formulario para capturar datos, una tabla dinámica para mostrar información
 * y eventos para interactuar con otros componentes o servicios.
 */
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
  /**
   * form
   * Formulario reactivo principal para capturar los datos de las partidas.
   */
  @Input() form!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  @Input() formForTotalCount!: FormGroup;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  @Input() tableHeaderData: ConfiguracionColumna<any>[] = [];

  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  @Input() tableBodyData: any[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  @Input() mostrarTabla = false;

  /**
   * filaSeleccionadaChange
   * Evento que emite las filas seleccionadas en la tabla dinámica.
   */
  @Output() filaSeleccionadaChange = new EventEmitter<any[]>();

  /**
   * validarYEnviarFormularioEvent
   * Evento que se emite cuando se valida y envía el formulario.
   */
  @Output() validarYEnviarFormularioEvent = new EventEmitter<void>();

  /**
   * navegarParaModificarPartidaEvent
   * Evento que se emite para navegar y modificar una partida específica.
   */
  @Output() navegarParaModificarPartidaEvent = new EventEmitter<void>();

  /**
   * setValoresStoreEvent
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * Formulario reactivo.
   * Nombre del campo que se está actualizando.
   * Nombre del método que realiza la actualización.
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>();

  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * Constructor para inicializar el componente e inyectar dependencias.
   * FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    //  Constructor de la
  }

  /**
   * Verifica si un control del formulario es inválido.
   * Nombre del control en el formulario.
   * boolean Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Maneja las filas seleccionadas en la tabla dinámica y emite un evento.
   * Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionadaChange.emit(filasSeleccionadas);
  }

  /**
   * Valida y envía el formulario, emitiendo un evento.
   */
  validarYEnviarFormulario(): void {
    this.validarYEnviarFormularioEvent.emit();
  }

  /**
   * Navega para modificar una partida específica, emitiendo un evento.
   */
  navegarParaModificarPartida(): void {
    this.navegarParaModificarPartidaEvent.emit();
  }

  /**
   * Emite un evento para almacenar valores en el store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStoreEvent.emit({ form, campo, metodoNombre });
  }
}