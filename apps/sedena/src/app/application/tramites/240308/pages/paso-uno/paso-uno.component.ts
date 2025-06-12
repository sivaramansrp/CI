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
    * Selecciona una pestaña específica.
    * @param i - El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i:number): void {
     this.indice = i;
   }

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

  constructor(
    private servicio: SolicitudeDeArtificiosPirotecnicosService,
    private consultaQuery: ConsultaioQuery
  ) {}

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

    ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
