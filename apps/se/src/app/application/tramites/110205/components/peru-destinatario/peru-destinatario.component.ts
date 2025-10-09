/**
 * @component PeruDestinatarioComponent
 * @description
 * Componente responsable de manejar los datos de los formularios del destinatario y exportador
 * dentro del trámite zoosanitario para Perú. Permite la sincronización con el estado global,
 * incluyendo modo solo lectura, y guarda los valores ingresados en el store.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SeccionLibQuery, SeccionLibState } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../../estados/tramite110205.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Tramite110205Query } from '../../estados/tramite110205.query';

/**
 * @interface FormValues
 * @description
 * Interfaz que representa los valores del formulario de forma dinámica.
 */
interface FormValues {
  [key: string]: unknown;
}

@Component({
  selector: 'app-peru-destinatario',
  templateUrl: './peru-destinatario.component.html',
  styleUrl: './peru-destinatario.component.scss',
})
export class PeruDestinatarioComponent implements OnInit, OnDestroy {

  /**
   * @property formDestinatarioValues
   * @description Almacena los valores actuales del formulario de destinatario.
   */
  formDestinatarioValues!: FormValues;

  /**
   * @property formDatosDelDestinatarioValues
   * @description Almacena los valores del subformulario de datos del destinatario.
   */
  formDatosDelDestinatarioValues!: FormValues;

  /**
   * @property formExportadorValues
   * @description Almacena los valores del formulario de exportador.
   */
  formExportadorValues!: FormValues;

  /**
   * @property ocultarLada
   * @description Determina si el campo LADA debe ser visible.
   * @default true
   */
  ocultarLada: boolean = true;

  /**
   * @property ocultarFax
   * @description Determina si el campo Fax debe ser visible.
   * @default true
   */
  ocultarFax: boolean = true;

  /**
   * @property esFormularioSoloLectura
   * @description Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property destroyNotifier$
   * @description Notificador utilizado para limpiar suscripciones al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property exportadoState
   * @description Estado actual del formulario exportador.
   * @private
   */
  public exportadoState!: Tramite110205State;

  /**
   * @property seccionState
   * @description Estado actual de la sección visual.
   * @private
   */
  private seccionState!: SeccionLibState;

    /**
   * @property {string} idProcedimiento
   * @description Identificador del procedimiento, utilizado para la gestión del trámite.
   */
   public idProcedimiento = 110205;

  /**
   * @constructor
   * @description
   * Constructor que inicializa servicios y suscripciones necesarias para sincronizar el estado del formulario.
   * 
   * @param fb FormBuilder para creación de formularios reactivos.
   * @param store Store de la sección de trámite 110205.
   * @param query Query de la sección de trámite 110205.
   * @param seccionQuery Consulta del estado de la sección visual.
   * @param consultaQuery Consulta del estado de solo lectura general.
   */
  constructor(
    private readonly fb: FormBuilder,
    private store: Tramite110205Store,
    private query: Tramite110205Query,
    private seccionQuery: SeccionLibQuery,
    private consultaQuery: ConsultaioQuery
  ) {
    this.query.selectFormDatosDelDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDatosDelDestinatarioValues = estado;
      });

    this.query.selectFormDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDestinatarioValues = estado;
      });

  }

  /**
   * @method ngOnInit
   * @description
   * Hook de inicialización del componente. Establece suscripciones al estado del formulario y sección.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    this.query.selectPeru$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.exportadoState = state as Tramite110205State;
        })
      )
      .subscribe();
  }

  /**
   * @method setValoresStoreDatos
   * @description
   * Actualiza el estado del store con los datos del formulario de datos del destinatario.
   * @param event Evento con el campo y valor a actualizar.
   */
  setValoresStoreDatos(event: { formGroupName: string; campo: string; valor: undefined; storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDatosDelDestinatario({ [CAMPO]: VALOR });
  }
   /**
   * @description
   * Actualiza el store utilizando un método dinámico con el valor de un campo específico.
   * @param event Evento con el campo y valor a actualizar.
   * @returns {void}
   */
  setValoresStore1(event: {formGroupName: string; campo: string; valor: undefined; metodoNombre: string;}): void {
    const { valor, metodoNombre } = event;
    (this.store as unknown as Record<string, (value: unknown) => void>)[metodoNombre]?.(valor);
  }

  /**
   * @method setValoresStoreDe
   * @description
   * Actualiza el estado del store con los datos del formulario de destinatario.
   * @param event Evento con el campo y valor a actualizar.
   */
  setValoresStoreDe(event: { formGroupName: string; campo: string; valor: undefined; storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDestinatario({ [CAMPO]: VALOR });
  }

  /**
   * @method setFormValida
   * @description
   * Marca como válido o inválido el formulario de destinatario en el store.
   * @param valida Valor booleano indicando validez.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  /**
   * @method setFormValidaExportador
   * @description
   * Marca como válido o inválido el formulario de exportador en el store.
   * @param valida Valor booleano indicando validez.
   */
  setFormValidaExportador(valida: boolean): void {
    this.store.setFormValida({ exportador: valida });
  }

  /**
   * @method setFormValidaDestinatario
   * @description
   * Marca como válido o inválido el subformulario de datos del destinatario en el store.
   * @param valida Valor booleano indicando validez.
   */
  setFormValidaDestinatario(valida: boolean): void {
    this.store.setFormValida({ datosDestinatario: valida });
  }

  /**
   * @method setValoresStore
   * @description
   * Actualiza el store utilizando un método dinámico con el valor de un campo específico.
   * @param form Formulario del cual se extraerá el valor.
   * @param campo Nombre del campo a leer del formulario.
   * @param metodoNombre Método del store que se invocará.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110205Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: Tramite110205Store) => void)(VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de destrucción del componente. Finaliza las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
