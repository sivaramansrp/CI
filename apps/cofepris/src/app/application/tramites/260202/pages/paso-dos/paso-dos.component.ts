import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/importacion-materias-primas.enum'


/**
 * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
 * 
 * Este método realiza una solicitud al servicio `CatalogosService` para obtener 
 * los datos del catálogo correspondiente al identificador `CATALOGOS_ID.CAT_TIPO_DOCUMENTO`. 
 * Utiliza el operador `takeUntil` para gestionar la suscripción y asegurarse de que 
 * se limpie cuando el componente sea destruido. Los datos obtenidos se asignan a la 
 * propiedad `catalogoDocumentos` si la respuesta contiene elementos.
 * 
 * @returns {void} No retorna ningún valor.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Texto utilizado en el componente.
   * @type {typeof TEXTOS}
   */
  TEXTOS = TEXTOS_REQUISITOS;
  /**
   * Texto utilizado para mostrar el mensaje de requisitos.
   * @type {string}
   */
  tiposDocumentos: Catalogo[] = [];
  /**
   * Tipo de alerta utilizada.
   * @type {string}
   */
  infoAlert = 'alert-info';
  /**
   * Texto utilizado para mostrar el mensaje de requisitos.
   * @type {string}
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase PasoDosComponent.
   * 
   * Este constructor se utiliza para inicializar la instancia del componente 
   * y para inyectar las dependencias necesarias, en este caso el servicio `CatalogosService`.
   * 
   * @param catalogosServices - Servicio que proporciona acceso a los catálogos necesarios 
   *                            para el funcionamiento del componente.
   */
  constructor(private catalogosServices: CatalogosService) {
    // Necesito inyectar los servicios a través del constructor, de modo que el constructor esté vacío.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
   * 
   * En este método, se realiza la llamada al método `getTiposDocumentos` para obtener 
   * los tipos de documentos necesarios para el funcionamiento del componente.
   * 
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }


  /**
   * Obtiene los tipos de documentos desde el catálogo correspondiente.
   * 
   * Este método utiliza el servicio `catalogosServices` para recuperar los datos 
   * del catálogo identificado por `CATALOGOS_ID.CAT_TIPO_DOCUMENTO`. Los datos 
   * obtenidos se almacenan en la propiedad `catalogoDocumentos` si la respuesta 
   * contiene elementos.
   * 
   * La operación está vinculada al observable `destroyNotifier$` para garantizar 
   * que se detenga cuando el componente se destruya, evitando fugas de memoria.
   * 
   * @returns {void} Este método no devuelve ningún valor.
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
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
