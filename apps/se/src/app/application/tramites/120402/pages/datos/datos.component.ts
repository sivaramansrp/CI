/**
 * @fileoverview Componente Angular para la interfaz de toma de muestras de mercancías.
 * Gestiona la navegación por pestañas y sincroniza el estado con el store de forma reactiva.
 * Asegura una suscripción segura a observables y limpia los recursos al destruirse.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

import { RepresentacionFederalService } from '@ng-mf/data-access-user';
import { Solocitud120402Service } from '../../services/service120402.service';

/**
 * Componente que gestiona los datos de una solicitud de toma de muestras,
 * implementando navegación por pestañas y consumo de servicios asincrónicos.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

  /**
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Índice actual de la pestaña seleccionada (comienza en 1).
   */
  public indice: number = 1;

  /**
   * Total de pestañas disponibles en el formulario.
   */
  public totalPestanas: number = 5;

  /**
   * Constructor del componente.
   *
   * @param pantallasSvc Servicio para lógica relacionada con la pantalla actual.
   * @param solocitud120402Service Servicio para interactuar con los datos de la solicitud.
   * @param consultaQuery Query para obtener el estado del store reactivo.
   */
  constructor(
    public pantallasSvc: RepresentacionFederalService,
    private solocitud120402Service: Solocitud120402Service,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente y se suscribe al estado del store.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Solicita los datos del formulario al servicio y actualiza el store si la respuesta es válida.
   */
  guardarDatosFormulario(): void {
    this.solocitud120402Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud120402Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Indica si la pestaña actual es la primera.
   * Útil para desactivar botones de navegación hacia atrás.
   */
  get esPrimeraPestana(): boolean {
    return this.indice === 1;
  }

  /**
   * Indica si la pestaña actual es la última.
   * Útil para controlar la navegación hacia adelante.
   */
  get esUltimaPestana(): boolean {
    return this.indice === this.totalPestanas;
  }

  /**
   * Cambia a la pestaña con el índice especificado.
   *
   * @param i Índice de la pestaña a seleccionar (base 1).
   */
  seleccionaTab(i: number): void {
    if (i >= 1 && i <= this.totalPestanas) {
      this.indice = i;
    }
  }

  /**
   * Avanza a la siguiente pestaña si no es la última.
   */
  avanzarTab(): void {
    if (!this.esUltimaPestana) {
      this.indice++;
    }
  }

  /**
   * Retrocede a la pestaña anterior si no es la primera.
   */
  retrocederTab(): void {
    if (!this.esPrimeraPestana) {
      this.indice--;
    }
  }

  /**
   * Reinicia la navegación de pestañas al valor inicial.
   */
  resetTabs(): void {
    this.indice = 1;
  }

  /**
   * Hook del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Libera recursos cancelando todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
