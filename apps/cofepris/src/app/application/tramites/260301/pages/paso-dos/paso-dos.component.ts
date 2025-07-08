import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/estupefacientes.enum';

/**
 * Componente PasoDos para el manejo del segundo paso del trámite 260301.
 * Este componente se encarga de la gestión de documentos y tipos de documentos
 * necesarios para completar el trámite de estupefacientes.
 * 
 * @class PasoDosComponent
 * @implements {OnInit, OnDestroy}
 */
@Component({
  selector: 'app-paso-dos',

  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.css',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Constante que contiene todos los textos utilizados en el componente.
   * Almacena las etiquetas, mensajes y textos de la interfaz para el paso dos del trámite.
   * 
   * @type {typeof TEXTOS_REQUISITOS}
   * @memberof PasoDosComponent
   * @readonly
   */
  TEXTOS = TEXTOS_REQUISITOS;
  
  /**
   * Array que contiene los tipos de documentos disponibles para el trámite.
   * Esta propiedad almacena la información de los diferentes tipos de documentos
   * que pueden ser utilizados en el proceso de tramitación.
   * 
   * @type {Catalogo[]}
   * @memberof PasoDosComponent
   * @default []
   */
  tiposDocumentos: Catalogo[] = [];
  
  /**
   * Tipo de alerta utilizada para mostrar mensajes informativos al usuario.
   * Define el estilo CSS de la alerta que se mostrará en la interfaz.
   * 
   * @type {string}
   * @memberof PasoDosComponent
   * @default 'alert-info'
   */
  infoAlert = 'alert-info';
  
  /**
   * Array que contiene el catálogo completo de documentos disponibles.
   * Almacena la información obtenida del servicio de catálogos para
   * los tipos de documentos que pueden ser utilizados en el trámite.
   * 
   * @type {Catalogo[]}
   * @memberof PasoDosComponent
   * @default []
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido,
   * evitando memory leaks y comportamientos inesperados.
   *
   * @type {Subject<void>}
   * @memberof PasoDosComponent
   * @private
   * @readonly
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoDosComponent.
   * Inyecta las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param {CatalogosService} catalogosServices - Servicio para obtener catálogos del sistema
   * @memberof PasoDosComponent
   */
  constructor(private catalogosServices: CatalogosService) {
    // Constructor vacío - Las dependencias se inyectan automáticamente
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
   * Se encarga de cargar los datos iniciales necesarios para el funcionamiento del componente.
   * 
   * @method ngOnInit
   * @memberof PasoDosComponent
   * @returns {void}
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   * Realiza una petición al servicio de catálogos para obtener la información
   * de los tipos de documentos que pueden ser utilizados en el proceso.
   * 
   * @method getTiposDocumentos
   * @memberof PasoDosComponent
   * @returns {void}
   * @since 1.0.0
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
   * Limpia las suscripciones activas para prevenir memory leaks y comportamientos inesperados.
   * Emite una señal de finalización y completa el Subject destructor.
   * 
   * @method ngOnDestroy
   * @memberof PasoDosComponent
   * @returns {void}
   * @since 1.0.0
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
