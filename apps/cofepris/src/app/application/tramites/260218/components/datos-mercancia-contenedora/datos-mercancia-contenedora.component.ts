/**
 * @fileoverview
 * El `DatosMercanciaContenedoraComponent` es un componente de Angular diseñado para gestionar y actualizar la información de una mercancía seleccionada.
 * Este componente observa el estado del trámite y permite al usuario seleccionar y modificar datos de mercancías en la tabla principal.
 * 
 * @module DatosMercanciaContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de mercancías en el flujo del trámite 260218.
 */

import { Component, OnInit } from '@angular/core';
import {
  Tramite260218State,
  Tramite260218Store,
} from '../../estados/tramite260218Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { Subject } from 'rxjs';
import { TablaMercanciasDatos } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260218Query } from '../../estados/tramite260218Query.query';

/**
 * @component
 * @name DatosMercanciaContenedoraComponent
 * @description
 * Componente encargado de gestionar y actualizar la información de una mercancía seleccionada.
 * Observa el estado del trámite y permite al usuario seleccionar y modificar datos de mercancías en la tabla principal.
 *
 * @selector app-datos-mercancia-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./datos-mercancia-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./datos-mercancia-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - DatosMercanciaComponent: Componente compartido para gestionar los datos de mercancías.
 */
@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
})
export class DatosMercanciaContenedoraComponent implements OnInit {
  /**
   * @property {TablaMercanciasDatos} SeleccionadoDatos
   * @description
   * Contiene los datos de la mercancía actualmente seleccionada en la tabla.
   */
  public SeleccionadoDatos!: TablaMercanciasDatos;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260218State} tramiteState
   * @description
   * Estado completo del trámite, que contiene información como la tabla de mercancías.
   */
  public tramiteState!: Tramite260218State;

  /**
   * @constructor
   * @description
   * Constructor que inyecta los servicios necesarios para consultar y modificar el estado del trámite.
   * 
   * @param {Tramite260218Query} tramite260218Query - Servicio para observar el estado actual del trámite.
   * @param {Tramite260218Store} tramite260218Store - Store que permite actualizar el estado del trámite.
   */
  constructor(
    private tramite260218Query: Tramite260218Query,
    private tramite260218Store: Tramite260218Store
  ) {
    // no realizar ninguna acción
  }

  /**
   * @method ngOnInit
   * @description
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Se suscribe al estado del trámite y guarda su valor localmente para uso posterior.
   * Utiliza `takeUntil` para limpiar la suscripción cuando el componente sea destruido.
   */
  ngOnInit(): void {
    this.tramite260218Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$), // Limpiar la suscripción cuando el componente sea destruido
        map((seccionState) => {
          this.tramiteState = seccionState; // Guarda el estado del trámite
        })
      )
      .subscribe();
  }

  /**
   * @method mercanciaSeleccionado
   * @description
   * Maneja la selección de una mercancía en la tabla de datos.
   * 
   * Este método:
   * - Asigna el objeto seleccionado a `SeleccionadoDatos`.
   * - Crea una versión simplificada de la mercancía.
   * - Verifica si ya existe en la tabla.
   * - La reemplaza o la agrega según sea el caso.
   * - Finalmente, actualiza el estado del store con los nuevos datos.
   * 
   * @param {TablaMercanciasDatos} event - Objeto de tipo `TablaMercanciasDatos` que representa la mercancía seleccionada.
   */
  mercanciaSeleccionado(event: TablaMercanciasDatos): void {
    this.SeleccionadoDatos = event; // Asigna la mercancía seleccionada

    // Crea una versión simplificada de la mercancía
    const SELECCIONADO_MERCANCIA = {
      clasificacionProducto: event.clasificacionProducto,
      especificarClasificacionProducto: event.especificarClasificacionProducto,
      denominacionEspecificaProducto: event.denominacionEspecificaProducto,
      denominacionDistintiva: event.denominacionComun,
      denominacionComun: event.denominacionComun,
      formaFarmaceutica: event.formaFarmaceutica,
      estadoFisico: event.estadoFisico,
      fraccionArancelaria: event.fraccionArancelaria,
      descripcionFraccion: event.descripcionFraccion,
      unidadMedidaComercializacion: event.unidadMedidaComercializacion,
      cantidadUMC: event.cantidadUMC,
      unidadMedidaTarifa: event.unidadMedidaTarifa,
      cantidadUMT: event.cantidadUMT,
      presentacion: event.presentacion,
      numeroRegistroSanitario: event.numeroRegistroSanitario,
      paisOrigen: event.paisOrigen,
      paisProcedencia: event.paisProcedencia,
      tipoProducto: event.tipoProducto,
      usoEspecifico: event.usoEspecifico,
    };

    // Verifica si la mercancía ya existe en la tabla
    const INDICES = this.tramiteState.tablaMercanciasConfigDatos.findIndex(
      (idx) =>
        idx.clasificacionProducto ===
        SELECCIONADO_MERCANCIA.clasificacionProducto.toString()
    );

    let datosActivos = [];

    // Si la mercancía existe, reemplaza la existente; si no, la agrega a la tabla
    if (INDICES !== -1) {
      const TABLE_MERCANCIA_DATA = this.tramiteState.tablaMercanciasConfigDatos;
      TABLE_MERCANCIA_DATA.splice(INDICES, 1, SELECCIONADO_MERCANCIA); // Reemplaza la mercancía existente
      datosActivos = TABLE_MERCANCIA_DATA;
    } else {
      datosActivos = [
        ...this.tramiteState.tablaMercanciasConfigDatos,
        SELECCIONADO_MERCANCIA, // Agrega la nueva mercancía
      ];
    }

    // Actualiza el estado del store con la nueva tabla de mercancías
    this.tramite260218Store.update((state) => ({
      ...state,
      seleccionadoTablaMercanciasDatos: [SELECCIONADO_MERCANCIA], // Actualiza la mercancía seleccionada
      tablaMercanciasConfigDatos: datosActivos, // Actualiza la lista de mercancías
    }));
  }
}