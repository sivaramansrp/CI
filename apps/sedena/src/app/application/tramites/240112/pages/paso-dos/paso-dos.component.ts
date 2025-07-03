import { CATALOGOS_ID, Catalogo, CatalogosService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/agregar-destinatario.enum';

/**
 * Componente encargado de gestionar el segundo paso del formulario de trámites.
 * Permite la selección de documentos requeridos por el usuario, obteniendo el catálogo
 * correspondiente desde un servicio y gestionando la selección y visualización de los mismos.
 *
 * @component
 *
 * @remarks
 * Utiliza servicios para obtener catálogos y maneja la suscripción a observables
 * para evitar fugas de memoria mediante un notificador de destrucción.
 *
 * @example
 * ```html
 * <app-paso-dos></app-paso-dos>
 * ```
 */
@Component({
  /**
   * Selector HTML para usar el componente dentro de otras plantillas.
   */
  selector: 'app-paso-dos',

  /**
   * Ruta al archivo HTML que define la estructura visual del componente.
   */
  templateUrl: './paso-dos.component.html',

  /**
   * Ruta al archivo SCSS que contiene los estilos del componente.
   */
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Textos estáticos usados en este paso del formulario,
   * importados desde una enumeración de constantes.
   */
  public TEXTOS = TEXTOS_REQUISITOS;

  /**
   * Lista temporal para gestionar tipos de documentos requeridos.
   * Puede ser usada para control de selección o filtros locales.
   */
  public tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS para mostrar alertas informativas dentro del componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Catálogo de tipos de documentos obtenidos desde el servicio API,
   * que se muestra para selección por parte del usuario.
   */
  public catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos que el usuario ha seleccionado durante este paso.
   */
  public documentosSeleccionados: Catalogo[] = [];

  /**
   * Notificador para cancelar suscripciones y evitar fugas de memoria.
   * Se utiliza en combinación con `takeUntil` en las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor que inyecta el servicio de catálogos para obtener datos.
   *
   * @param catalogosServices Servicio para obtener catálogos desde API.
   */
  constructor(private catalogosServices: CatalogosService) {
    // No se requiere lógica adicional en el constructor.
  }

  /**
   * Hook de inicialización de Angular.
   * Se ejecuta al crear el componente e inicia la carga de datos.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de tipos de documentos desde el servicio.
   * Al obtener la respuesta, actualiza la propiedad `catalogoDocumentos`.
   * Usa `takeUntil` para limpiar la suscripción cuando se destruya el componente.
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
   * Hook de destrucción de Angular.
   * Se ejecuta antes de eliminar el componente para limpiar suscripciones
   * y liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
