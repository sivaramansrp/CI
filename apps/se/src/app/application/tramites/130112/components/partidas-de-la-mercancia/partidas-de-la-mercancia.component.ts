/* eslint-disable @typescript-eslint/no-explicit-any */
import { Catalogo, ConfiguracionColumna } from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
/**
 * PartidasDeLaMercanciaComponent
 * Este componente es responsable de gestionar las partidas de la mercancía.
 * Proporciona un formulario para capturar datos, una tabla dinámica para mostrar información
 * y eventos para interactuar con otros componentes o servicios.
 */
@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent implements OnChanges{
  /**
   * @description Indica si el formulario debe mostrarse en modo solo lectura.
   */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * form
   * Formulario reactivo principal para capturar los datos de las partidas.
   */
  @Input() partidasDelaMercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  @Input() formForTotalCount!: FormGroup;

  /**
   * Configuración de las columnas de la tabla dinámica.
   * Este campo define las columnas que se mostrarán en la tabla, incluyendo encabezados y claves.
   */
  @Input() tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] =
    PARTIDASDELAMERCANCIA_TABLA;

  /**
   * Datos que se mostrarán en la tabla dinámica.
   * Este campo contiene las filas de datos que se renderizarán en el cuerpo de la tabla.
   */
  @Input() tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  @Input() mostrarTabla = false;

  
  /**
   * Lista de elementos del catálogo de fracciones arancelarias.
   */
  @Input() fraccionDescripcionPartidasDeLaMercancia: Catalogo[] = [];

  /**
  * Bandera para deshabilitar la tabla dinámica.
  * Si está configurada como `true`, la tabla estará deshabilitada.
  */
  @Input() disabled: boolean = false;

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
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; }>();

  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * Constructor para inicializar el componente e inyectar dependencias.
   * FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    //  Constructor del componente
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
   *
   * Si la propiedad `esFormularioSoloLectura` cambia, habilita o deshabilita el formulario según su valor.
   * Esto permite que el formulario se muestre en modo solo lectura o editable dinámicamente.
   *
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
  */
    ngOnChanges(changes: SimpleChanges): void {
      // Verifica si el formulario ha cambiado y actualiza su estado
      if (changes['esFormularioSoloLectura']) {
        if (this.esFormularioSoloLectura) {
        this.partidasDelaMercanciaForm.disable();
    }else {
       this.partidasDelaMercanciaForm.enable();
     }
  }
}

  /**
   * Verifica si un control del formulario es inválido.
   * Nombre del control en el formulario.
   * boolean Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.partidasDelaMercanciaForm.get(nombreControl);
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
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo});
  }
}