/**
 * Componente que gestiona los datos de la mercancía para el trámite 630303.
 * Este componente permite inicializar formularios, obtener datos del estado y manejar el estado del formulario.
 * También se encarga de gestionar los cambios en el estado del trámite y liberar recursos al destruirse.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ModeloDeFormaDinamica} from "@ng-mf/data-access-user";

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component'; // Adjust the path as needed

import { FormBuilder, FormGroup} from '@angular/forms';
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Subject, takeUntil } from 'rxjs';
import { FORMULARIO_DATOS_MERCANCIA } from '../../enums/retorno-importacion-temporal.enum';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TituloComponent],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630104State;

  /**
   * Formulario reactivo para gestionar los datos de la mercancía.
   */
  datosMercancia!: FormGroup;

  /**
   * Formulario dinámico que define la estructura del formulario de datos de mercancía.
   */
  formularioDatosMercancia: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_MERCANCIA;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - Constructor de formularios reactivos.
   * @param tramite630303Store - Store para manejar el estado del trámite.
   * @param tramite630303Query - Query para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene el estado del trámite.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datosMercancia = this.formBuilder.group({
      // Define los controles del formulario aquí
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Suscribe al estado del trámite y actualiza la propiedad `estadoSeleccionado`.
   */
  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Establece un cambio de valor en el store basado en un evento.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   *                 `campo` es el nombre del campo a modificar.
   *                 `valor` es el nuevo valor que se asignará al campo.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   * Emite un valor en el Subject `destroyed$` y lo completa.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}