import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';

import { SolicitudeDeArtificiosPirotecnicosService } from '../../services/solicitude-de-artificios-pirotecnicos.service';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Indica si los datos de respuesta del servidor están disponibles.
   * @type {boolean}
   */
  public datosRespuestaDisponibles: boolean = false;

  /**
   * Subject para notificar la destrucción del componente y desuscribirse de observables.
   * @type {Subject<void>}
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta.
   * @type {ConsultaioState}
   */
  public estadoConsulta!: ConsultaioState;

  /**
   * Constructor del componente. Inyecta los servicios necesarios.
   * @param servicio Servicio para obtener y establecer datos de la solicitud.
   * @param consultaQuery Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private servicio: SolicitudeDeArtificiosPirotecnicosService,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la consulta y obtiene los datos si es necesario.
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
   * Selecciona una pestaña específica.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene los datos de la bandeja de solicitudes desde el servicio y los establece.
   */
  obtenerDatosBandejaSolicitudes(): void {
    this.servicio.obtenerDatos()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((datos) => {
        if (datos) {
          this.servicio.establecerDatosDeLaSolicitud(datos);
          this.datosRespuestaDisponibles = true;
        }
      });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica a los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}

