import { CATALOGOS_ID, Catalogo, CatalogosService } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/solicitud-de-prorroga-importacion-material-explosivo.enum';

/**
 * @component PasoDosComponent
 * @description
 * Componente correspondiente al segundo paso del flujo de un trámite,
 * destinado a la gestión y anexado de documentos requeridos.
 * Consulta el catálogo de tipos de documentos disponibles mediante un servicio.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  
  /**
   * Textos estáticos que se utilizan en la interfaz de este paso.
   * 
   * @type {typeof TEXTOS_REQUISITOS}
   */
  public TEXTOS = TEXTOS_REQUISITOS;

  /**
   * Tipos de documentos definidos por el catálogo (local).
   * 
   * @type {Catalogo[]}
   */
  public tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS de alerta informativa (usualmente de Bootstrap).
   * 
   * @default 'alert-info'
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Catálogo de documentos obtenidos desde la API.
   * 
   * @type {Catalogo[]}
   */
  public catalogoDocumentos: Catalogo[] = [];

  /**
   * Documentos que el usuario ha seleccionado en este paso.
   * 
   * @type {Catalogo[]}
   */
  public documentosSeleccionados: Catalogo[] = [];

  /**
   * Notificador para cancelar las suscripciones activas al destruir el componente.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * Constructor que inyecta el servicio de catálogos.
   * 
   * @param catalogosServices Servicio para recuperar datos de catálogos necesarios en el formulario.
   */
  constructor(private catalogosServices: CatalogosService) {}

  /**
   * @method ngOnInit
   * @description
   * Hook de ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Inicia la carga de los tipos de documentos requeridos.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * @method getTiposDocumentos
   * @description
   * Recupera el catálogo de tipos de documentos necesarios para este paso.
   * El resultado se almacena en `catalogoDocumentos`.
   */
  public getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (resp: Catalogo[]): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * Cancela las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}