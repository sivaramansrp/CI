import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Tramite230501State, Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';

@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
/**
 * Componente Angular que gestiona la lógica y el estado relacionado con los datos de la solicitud
 * en el trámite 230501. Este componente interactúa con el estado global de la aplicación a través
 * de `Tramite230501Store` y `SeccionLibStore`, y maneja eventos relacionados con la selección de datos
 * en tablas y la validación de formularios.
 * 
 * @implements {OnInit} - Implementa el ciclo de vida `OnInit` para inicializar el estado del componente.
 * @implements {OnDestroy} - Implementa el ciclo de vida `OnDestroy` para limpiar recursos al destruir el componente.
 * 
 * @class
 */
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy{
  /**
   * @private
   * Sujeto utilizado como notificador para la destrucción del componente.
   * Se emite un valor cuando el componente se destruye, permitiendo la limpieza de suscripciones
   * y otros recursos para evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @public
   * @type {Tramite230501State}
   * @description Representa el estado actual del trámite 230501.
   */
  public tramiteState!: Tramite230501State;
   /* @property {SeccionLibState} seccion
  * @description Representa el estado de la sección en el componente. 
  * Se utiliza para manejar y almacenar datos relacionados con la sección específica.
  */
   private seccion!: SeccionLibState;

  constructor(private tramite230501Query: Tramite230501Query,
    private tramite230501Store: Tramite230501Store,
    private seccionStore: SeccionLibStore, private seccionQuery: SeccionLibQuery
  ) { }

  ngOnInit(): void {
    this.tramite230501Query.selectTramiteState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.tramiteState = seccionState;
      })
    ).subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }



 

  /**
   * Actualiza el estado del formulario de datos de la solicitud en el store.
   *
   */
  datasolicituActualizar(): void {
    const SECCION: number = 1;
    const FORMAS_VALIDADAS = this.seccion.formaValida;
    const ES_VALIDO_EL_FORM = this.esFormValido();
    if (ES_VALIDO_EL_FORM) {
      FORMAS_VALIDADAS[SECCION] = true;
      this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
    } else {
      FORMAS_VALIDADAS[SECCION] = false;
      this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
    }
  }

  /**
 * Verifica si el formulario es válido.
 * 
 * Recorre todos los controles del formulario y verifica si alguno de ellos
 * está habilitado e inválido. Si encuentra un control que cumple con estas
 * condiciones, retorna `false`. Si todos los controles habilitados son válidos,
 * retorna `true`.
 * 
 * @returns {boolean} `true` si todos los controles habilitados son válidos, 
 *                    `false` si al menos uno de los controles habilitados es inválido.
 */
  esFormValido(): boolean {
    if (this.tramiteState) {
      return true;
    }
    return false;
  }

    /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }

}
