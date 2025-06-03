import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { Tramite220103State } from '../../estados/tramites/tramites220103.store';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone:false,
})
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
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  
public indicePestana: number = 1;

  /**
   * Constructor del componente.
   * @param {ExportadorAutorizadoService} servicioExportador - Servicio para gestionar datos de exportadores autorizados.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de la consulta.
   */
  constructor(
    private servicio: SanidadAcuicolaImportacionService,
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
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
     /**
   * Obtiene los datos de la bandeja de solicitudes desde el servidor.
   */
  obtenerDatosBandejaSolicitudes(): void {
    this.servicio.getDatos()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((respuesta: Tramite220103State) => {
        if (respuesta) {
          this.datosRespuestaDisponibles = true;
          this.servicio.updateState(respuesta);
        }
      });
  }
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
