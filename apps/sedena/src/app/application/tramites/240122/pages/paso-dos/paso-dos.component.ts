import { AlertComponent, AnexarDocumentosComponent, CATALOGOS_ID, Catalogo, CatalogosService ,TituloComponent} from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TEXTOS_REQUISITOS } from '../../constantes/exportacion-explosivo-enum';

/**
 * @component
 * @name PasoDosComponent
 * @description Este componente representa el segundo paso de un formulario en el flujo de trámites.
 * Se encarga de manejar la lógica relacionada con los tipos de documentos requeridos y seleccionados
 * por el usuario, así como de interactuar con los servicios necesarios para obtener los datos del catálogo.
 * 
 * @example
 * <app-paso-dos></app-paso-dos>
 * 
 * @implements OnInit
 * @implements OnDestroy
 */
@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, AnexarDocumentosComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {

  /**
   * @property TEXTOS
   * @description Contiene textos estáticos utilizados en este paso del formulario.
   * @type {typeof TEXTOS_REQUISITOS}
   */
  public TEXTOS = TEXTOS_REQUISITOS;

  /**
   * @property tiposDocumentos
   * @description Espacio reservado localmente para los tipos de documentos utilizados en este paso.
   * @type {Catalogo[]}
   */
  public tiposDocumentos: Catalogo[] = [];

  /**
   * @property infoAlert
   * @description Tipo de alerta de Bootstrap utilizado para mensajes informativos.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * @property catalogoDocumentos
   * @description Contiene el catálogo de tipos de documentos obtenido desde la API.
   * @type {Catalogo[]}
   */
  public catalogoDocumentos: Catalogo[] = [];

  /**
   * @property documentosSeleccionados
   * @description Lista de documentos seleccionados por el usuario.
   * @type {Catalogo[]}
   */
  public documentosSeleccionados: Catalogo[] = [];

  /**
   * @property destroyNotifier$
   * @description Notificador utilizado para cancelar suscripciones activas al destruir el componente.
   * Previene fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @description Evento que almacena la información relacionada con la carga de archivos.
   * @type {string}
   *
   * @remarks
   * Esta propiedad se utiliza para gestionar el evento de carga de archivos en el componente.
   */
 @Output() reenviarEvento = new EventEmitter<void>();
  /**
   * @desc Evento que indica la sección a la que se debe regresar al cargar un documento.
   * @type {string}
   * @memberof PasoDosComponent
   */

 @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

  /**
   * @constructor
   * @description Constructor del componente. Inyecta las dependencias necesarias.
   * @param {CatalogosService} catalogosServices Servicio para obtener datos del catálogo necesarios en el formulario.
   */
  constructor(private catalogosServices: CatalogosService) {
    // Las dependencias se inyectan aquí. No se necesita lógica de inicialización.
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicia la obtención de los tipos de documentos.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * @method getTiposDocumentos
   * @description Obtiene el catálogo de tipos de documentos para el trámite.
   * Actualiza la lista `catalogoDocumentos` si la solicitud es exitosa.
   * @returns {void}
   */
  public getTiposDocumentos(): void {
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
   * @method ngOnDestroy
   * @description Hook del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * Limpia las suscripciones activas para prevenir fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
