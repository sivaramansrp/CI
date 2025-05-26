/**
 * datos-mercancia.component.ts
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Tramite110102State } from '../../estados/store/tramite110102.store';

import { ExportadorAutorizadoService } from '../../service/exportador-autorizado.service';

/**
 * Este componente representa la sección de datos de la mercancía.
 * Gestiona la interacción con el estado global y la obtención de datos del servidor.
 */
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Indica si los datos de respuesta del servidor están disponibles.
   */
  public datosRespuestaDisponibles: boolean = false;

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
  public indicePestana: number = 1;

  /**
   * Constructor del componente.
   * @param {ExportadorAutorizadoService} servicioExportador - Servicio para gestionar datos de exportadores autorizados.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de la consulta.
   */
  constructor(
    private servicioExportador: ExportadorAutorizadoService,
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
    this.servicioExportador.getRegistro()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((respuesta: Tramite110102State) => {
        if (respuesta) {
          this.datosRespuestaDisponibles = true;
          this.servicioExportador.setRegistro(respuesta);
        }
      });
  }

  /**
   * Selecciona una pestaña específica.
   * @param {number} indice - El índice de la pestaña a seleccionar.
   */
  seleccionarPestana(indice: number): void {
    this.indicePestana = indice;
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject `notificadorDestruccion$` para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}