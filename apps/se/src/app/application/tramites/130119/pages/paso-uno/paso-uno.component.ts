/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119State } from '../../estados/store/tramite130119.store';
/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: false,
  templateUrl: './paso-uno.component.html',
})
/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {


   /**
   * Indica si los datos de respuesta del servidor están disponibles.
   */
  public datosRespuestaDisponibles: boolean = false;

    /**
  /**
   * Subject para notificar la destrucción del componente y desuscribirse de observables.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta.
   */
  public estadoConsulta!: ConsultaioState;

  /**
   * Índice de la pestaña actualmente seleccionada.
   * Inicializado a 1 por defecto.
   */

  /**
   * El índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    private servicio: DatosDeLaSolicitudService,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Configura las suscripciones necesarias y verifica si se deben obtener datos del servidor.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSeccion) => {
        this.estadoConsulta = estadoSeccion;
      });

      if (this.estadoConsulta.update) {
      this.obtenerDatosBandejaSolicitudes();
    } else {
      this.datosRespuestaDisponibles = true;
    }
}

  /**
   * Obtiene los datos de la bandeja de solicitudes desde el servidor.
   */
  obtenerDatosBandejaSolicitudes(): void {
    this.servicio.obtenerDatosDeLaSolicitud()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((datos: Tramite130119State) => {
        if (datos) {
          this.datosRespuestaDisponibles = true;
          this.servicio.establecerDatosDeLaSolicitud(datos);
        }
      });
  }

    ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}