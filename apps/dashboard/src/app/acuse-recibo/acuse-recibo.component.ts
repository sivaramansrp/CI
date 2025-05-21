import { ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA } from '../constants/confirmar-notificacion.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmarNotificacionService } from '../services/confirmar-notificacion.service';
import { Documento } from '../models/confirmar-notificacion.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TablaAcciones } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';

/**
 * @component AcuseReciboComponent
 * @description
 * Componente encargado de mostrar los documentos correspondientes al Acuse de Recibo en una tabla dinámica.
 * Permite acciones como ver y descargar documentos.
 *
 * @example
 * <app-acuse-recibo></app-acuse-recibo>
 */
@Component({
  selector: 'app-acuse-recibo',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './acuse-recibo.component.html',
  styleUrl: './acuse-recibo.component.scss',
})
export class AcuseReciboComponent implements OnInit, OnDestroy {
  /**
   * @property unsubscribe$
   * @description
   * Subject utilizado para gestionar la desuscripción de observables y prevenir fugas de memoria.
   * Se completa en `ngOnDestroy()`.
   *
   * @private
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property acciones
   * @description
   * Acciones permitidas en la tabla del Acuse de Recibo (Ver, Descargar).
   *
   * @type {TablaAcciones[]}
   */
  public acciones: TablaAcciones[] = [
    TablaAcciones.VER,
    TablaAcciones.DESCARGAR,
  ];

  /**
   * @property acuseReciboTablaDatos
   * @description
   * Arreglo que almacena los datos del Acuse de Recibo obtenidos desde el servicio.
   *
   * @type {Documento[]}
   */
  public acuseReciboTablaDatos: Documento[] = [];

  /**
   * @property acuseReciboTablaConfiguracion
   * @description
   * Configuración de la tabla dinámica que muestra los documentos de Acuse de Recibo.
   * Define encabezados y acciones disponibles.
   */
  public acuseReciboTablaConfiguracion = {
    configuracionTabla: ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA,
    acciones: this.acciones,
  };

  /**
   * @constructor
   * @param {ConfirmarNotificacionService} confirmarNotificacionService - Servicio para obtener datos de Acuse de Recibo.
   */
  constructor(
    private confirmarNotificacionService: ConfirmarNotificacionService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Hook de inicialización del componente.
   * Obtiene los datos de Acuse de Recibo al inicializar el componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.confirmarNotificacionService
      .getAcuseReciboDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.acuseReciboTablaDatos = data;
      });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de destrucción del componente.
   * Libera recursos completando el observable `unsubscribe$`.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
