import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CANCELACION_TABLA } from '../../constants/programa-seleccionado.enum';
import { CancelacionDeAutorizacionesService } from '../../services/cancelacion-de-autorizaciones.service';
import { CancelacionTabla } from '../../models/Cancelacion-de-autorizaciones';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ProgramaSeleccionadoComponent } from '../programa-seleccionado/programa-seleccionado.component';

/**
 * Componente que gestiona la funcionalidad de cancelación de autorizaciones.
 * Este componente incluye la lógica para manejar tablas dinámicas y datos relacionados con la cancelación de autorizaciones.
 * 
 */
@Component({
  selector: 'app-cancelacion-autorizaciones',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TablaDinamicaComponent, ProgramaSeleccionadoComponent],
  templateUrl: './cancelacion-autorizaciones.component.html',
  styleUrl: './cancelacion-autorizaciones.component.scss',
})
export class CancelacionDeAutorizacionesComponent implements OnInit, OnDestroy {
  /**
   *
   * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
   */
  @Input() consultaState!: ConsultaioState;
      
  /**
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Lista de datos que se mostrarán en la tabla de cancelación de autorizaciones.
   */
  CancelacionTabladatos: CancelacionTabla[] = [];

  /**
   * Tipo de selección para la tabla de cancelación de autorizaciones.
   * Por defecto, se utiliza la selección por radio.
   */
  public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Configuración de las columnas para la tabla de cancelación de autorizaciones.
   */
  public tableHeaderExtranjeros: ConfiguracionColumna<CancelacionTabla>[] = CANCELACION_TABLA;

  /**
   * Constructor del componente.
   * Inyecta el servicio necesario para manejar los datos de cancelación de autorizaciones.
   */
  constructor(
    private cancelacionDeAutorizacionesService: CancelacionDeAutorizacionesService,
  ) {
    // Constructor vacío
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.obtenerDatosCancelacionTabla();
  }

  /**
 * Método que obtiene los datos de la tabla de cancelación de autorizaciones desde el servicio.
 * Realiza una suscripción al servicio y asigna la respuesta a la propiedad `CancelacionTabladatos`.
 * Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye.
 */
  obtenerDatosCancelacionTabla(): void {
    this.cancelacionDeAutorizacionesService
      .getCancelacionTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: CancelacionTabla[]) => {
        this.CancelacionTabladatos = resp;
      });
  }

/**
 * Método que destruye las suscripciones para evitar fugas de memoria.
 * Llama a `next` y `complete` sobre el subject `destroy$`.
 */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
