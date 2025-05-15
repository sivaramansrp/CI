import {
  BITACORA_ENCABEZADO_DE_TABLA,
  Bitacora,
} from '../../models/modificacion-programa-immex-baja-submanufacturera.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Subject } from 'rxjs';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
})
export class BitacoraComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Arreglo que almacena los datos de la bitácora.
   * 
   * Este arreglo contiene objetos de tipo `Bitacora` que representan
   * los registros de la bitácora asociados a la aplicación.
   */
  bitacoraTablaDatos: Bitacora[] = [];
  /**
   * Configuración de la tabla para la bitácora.
   * 
   * Este objeto contiene la configuración necesaria para inicializar
   * y renderizar la tabla de la bitácora, utilizando un encabezado
   * predefinido.
   * 
   * Propiedades:
   * - `configuracionTabla`: Define el encabezado de la tabla basado en
   *   la constante `BITACORA_ENCABEZADO_DE_TABLA`.
   */
  bitacoraTablaConfiguracion = {
    configuracionTabla: BITACORA_ENCABEZADO_DE_TABLA,
  };

  /**
   * Constructor de la clase BitacoraComponent.
   * 
   * @param modificacionProgramaImmexBajaSubmanufactureraService - Servicio utilizado para gestionar las modificaciones del programa IMMEX en baja submanufacturera.
   * @param tramite80303Querry - Servicio para realizar consultas relacionadas con el trámite 80303.
   */
  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {}

  /**
   * Método de ciclo de vida Angular que se ejecuta al inicializar el componente.
   * 
   * - Obtiene los datos de la bitácora desde un servicio remoto utilizando la URL especificada.
   * - Se suscribe al estado del trámite para actualizar los datos de la tabla de bitácora
   *   cuando cambien en el estado global de la aplicación.
   * - Gestiona automáticamente la finalización de la suscripción al destruir el componente.
   */
  ngOnInit(): void {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'bitacoraTablaDatos',
      '/80303/bitacoraTablaDatos.json'
    );
    this.tramite80303Querry.selectTramiteState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.bitacoraTablaDatos = state.bitacoraTablaDatos;
      });
  }
  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
