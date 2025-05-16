import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud30505State, Solicitud30505Store } from '../../../../core/estados/tramites/tramites30505.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud30505Query } from '../../../../core/queries/tramites30505.query';

/**
 * Componente encargado de gestionar el primer paso del trámite 30505.
 * 
 * Este componente permite controlar el avance entre pestañas, manejar la selección de checkboxes
 * y suscribirse al estado de la solicitud para mantener la información actualizada.
 * 
 * @remarks
 * Utiliza un store y un query para la gestión y consulta del estado de la solicitud 30505.
 * Implementa mecanismos para evitar fugas de memoria al destruir el componente.
 * 
 * @example
 * <app-paso-uno></app-paso-uno>
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})

export class PasoUnoComponent implements OnDestroy,OnInit{

  /**
   * Índice actual utilizado para controlar el paso o la etapa activa en el componente.
   * 
   * @default 1 - El valor inicial del índice es 1.
   */
  indice: number = 1;

  /**
   * Notificador utilizado para destruir suscripciones y evitar fugas de memoria.
   * Se debe emitir un valor y completar este Subject cuando el componente se destruya.
   * 
   * @type {Subject<void>}
   */
   public destroyNotifier$: Subject<void> = new Subject();
   
  /**
   * Arreglo que almacena los identificadores de los checkboxes seleccionados por el usuario.
   * Cada elemento del arreglo representa el valor asociado a un checkbox marcado.
   */
  selectedCheckboxes: string[] = []; 

  /**
   * Representa el estado actual de la solicitud 30505 en el componente.
   * 
   * @type {Solicitud30505State}
   * @public
   */
  public AvisoState!: Solicitud30505State;
  
/**
 * Constructor de la clase PasoUnoComponent.
 * 
 * @param tramiteStore - Instancia del store para gestionar el estado de la solicitud 30505.
 * @param tramiteQuery - Instancia del query para consultar el estado de la solicitud 30505.
 */
 constructor(public tramiteStore:Solicitud30505Store,public tramiteQuery:Solicitud30505Query
  ) {

  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe al observable `selectSolicitud$` para obtener el estado de la sección y actualizar `AvisoState`.
   * - Asigna los checkboxes seleccionados desde `AvisoState` a la propiedad `selectedCheckboxes`.
   * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruya.
   *
   * @returns {void} No retorna ningún valor.
   */
   ngOnInit(): void {

    this.tramiteQuery.selectSolicitud$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState) => {
                this.AvisoState = seccionState;
              })
            )
            .subscribe()

   this.selectedCheckboxes = this.AvisoState?.selectedCheckbox;
  }
  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i:number): void {
    this.indice = i;
  }

  /**
   * Alterna la visibilidad de los datos seleccionados.
   * 
   * @param datos - Un arreglo de cadenas que representa los datos seleccionados por el usuario.
   */
  toggleDataVisibility(datos: string[]): void {
    this.selectedCheckboxes = datos;
  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Notifica a los suscriptores para limpiar recursos y completa el observable `destroyNotifier$`.
   * Es útil para evitar fugas de memoria al cancelar suscripciones activas.
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
