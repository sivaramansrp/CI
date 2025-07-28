import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/exporticon-estupefacientes.enum';

/**
 * Componente para el paso dos del trámite 260302 de COFEPRIS.
 * Maneja la visualización y selección de tipos de documentos necesarios para el trámite.
 * 
 * @class PasoDosComponent
 * @implements {OnInit} Interfaz para la inicialización del componente
 * @implements {OnDestroy} Interfaz para la destrucción y limpieza del componente
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Constante que contiene todos los textos y etiquetas utilizados en el componente.
   * Importada desde el archivo de constantes de exportación de estupefacientes.
   * 
   * @type {typeof TEXTOS_REQUISITOS}
   * @readonly
   * @memberof PasoDosComponent
   */
  TEXTOS = TEXTOS_REQUISITOS;

  /**
   * Array que almacena los tipos de documentos disponibles para el trámite.
   * Se inicializa como array vacío y se llena mediante el servicio de catálogos.
   * 
   * @type {Catalogo[]}
   * @memberof PasoDosComponent
   * @default []
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Tipo de alerta CSS utilizada para mostrar mensajes informativos.
   * Define el estilo visual de las alertas en el componente.
   * 
   * @type {string}
   * @memberof PasoDosComponent
   * @default 'alert-info'
   */
  infoAlert = 'alert-info';

  /**
   * Array que contiene el catálogo de documentos obtenidos del servicio.
   * Almacena la información de los documentos disponibles para el trámite específico.
   * 
   * @type {Catalogo[]}
   * @memberof PasoDosComponent
   * @default []
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Subject utilizado como notificador para manejar la destrucción y desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido,
   * evitando memory leaks y comportamientos inesperados.
   * 
   * @type {Subject<void>}
   * @private
   * @memberof PasoDosComponent
   * @since 1.0.0
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoDosComponent.
   * Inyecta las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param {CatalogosService} catalogosServices - Servicio para obtener catálogos de datos
   * @memberof PasoDosComponent
   * @constructor
   */
  constructor(private catalogosServices: CatalogosService) {
    // Los servicios se inyectan a través del constructor para mantener la arquitectura de Angular
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
   * Se llama una vez después de que Angular haya inicializado todas las propiedades vinculadas a datos.
   * Inicia la carga de los tipos de documentos disponibles.
   * 
   * @method ngOnInit
   * @memberof PasoDosComponent
   * @implements {OnInit}
   * @returns {void}
   * @since 1.0.0
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   * Realiza una petición al servicio de catálogos para obtener la información
   * de los documentos requeridos en este paso del trámite.
   * 
   * @method getTiposDocumentos
   * @memberof PasoDosComponent
   * @returns {void}
   * @throws {Error} Si ocurre un error en la petición al servicio
   * @since 1.0.0
   * @example
   * ```typescript
   * this.getTiposDocumentos();
   * // Llena el array catalogoDocumentos con los datos obtenidos del servicio
   * ```
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia todas las suscripciones activas para prevenir memory leaks.
   * Se asegura de que todos los observables se desuscriban correctamente.
   * 
   * @method ngOnDestroy
   * @memberof PasoDosComponent
   * @implements {OnDestroy}
   * @returns {void}
   * @since 1.0.0
   * @example
   * ```typescript
   * // Este método se ejecuta automáticamente cuando Angular destruye el componente
   * // No necesita ser llamado manualmente
   * ```
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
