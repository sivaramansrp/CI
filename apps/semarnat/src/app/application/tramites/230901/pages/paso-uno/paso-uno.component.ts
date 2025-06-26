import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 * Este componente gestiona la selección de pestañas y el estado de habilitación
 * de las mismas basado en el estado del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Indica si la tabla está deshabilitada.
   * Se actualiza en función del estado del trámite.
   */
  isTablDisabled: boolean = false;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

   /* Estado actual de la consulta cargado desde el store.
  * Contiene datos como modo de solo lectura y valores del formulario.
  */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * {Tramite230901Query} tramite230901Query - Servicio de consulta para el estado del trámite "230901".
   */
  constructor(
    private tramite230901Query: Tramite230901Query, 
    private consultaQuery: ConsultaioQuery, 
    private autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService
  ) {
    // No se realiza ninguna acción aquí.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado del trámite para actualizar el estado de habilitación de la tabla.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.isTablDisabled = state.tipoDeMovimiento ? false : true;
      });
  }

  /**
  * Obtiene los datos de la solicitud desde un servicio y actualiza el estado del formulario.  
  * Si la respuesta es válida, activa el indicador de datos cargados.
  */
  guardarDatosFormulario(): void {
    this.autorizacionesDeVidaSilvestreService
      .getAutorizacionesDeVidaSilvestre().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.autorizacionesDeVidaSilvestreService.actualizarEstadoFormulario(resp);
        } else {
          this.esDatosRespuesta = false;
        }
      });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}