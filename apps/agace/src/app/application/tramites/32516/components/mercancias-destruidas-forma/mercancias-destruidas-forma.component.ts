/**
 * Importaciones de librerías y módulos necesarios para el componente de mercancías destruidas.
 *
 * Este archivo contiene todas las dependencias externas e internas requeridas para el funcionamiento
 * del componente de formulario de mercancías destruidas del trámite 32516.
 */
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { MercanciaForm } from '../../modelos/acta-de-hechos.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_IMPORTE_PAGO } from '@libs/shared/data-access-user/src';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TramiteState } from '../../estados/tramite32516Store.store';
import { TramiteStore } from '../../estados/tramite32516Store.store';
import { TramiteStoreQuery } from '../../estados/tramite32516Query.query';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { Validators } from '@angular/forms';

/**
 * Componente para manejar el formulario de mercancías destruidas del trámite 32516.
 * 
 * Este componente proporciona funcionalidad completa para gestionar formularios reactivos
 * y datos relacionados con el acta de hechos de mercancías destruidas. Incluye validaciones,
 * manejo de estado, integración con catálogos y navegación entre pestañas.
 * 
 * Características principales:
 * - Formulario reactivo con validaciones
 * - Modo solo lectura configurable
 * - Integración con stores de estado (Akita)
 * - Carga dinámica de catálogos
 * - Navegación condicional según la URL
 * 
 * @export
 * @class MercanciasDestruidasFormaComponent
 * @implements {OnInit} - Inicialización del componente
 * @implements {OnDestroy} - Limpieza de recursos al destruir el componente
 * 
 * @example
 * ```html
 * <app-mercancias-destruidas-forma 
 *   [esFormularioSoloLectura]="true">
 * </app-mercancias-destruidas-forma>
 * ```
 */
@Component({
  /**
   * Selector del componente para su uso en plantillas HTML.
   * @property {string} selector
   */
  selector: 'app-mercancias-destruidas-forma',
  
  /**
   * Indica que el componente es independiente y no requiere un módulo Angular.
   * @property {boolean} standalone
   */
  standalone: true,
  
  /**
   * Módulos y componentes importados para el funcionamiento del componente.
   * @property {Array} imports - Lista de dependencias importadas
   */
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  
  /**
   * Ruta al archivo de plantilla HTML del componente.
   * @property {string} templateUrl
   */
  templateUrl: './mercancias-destruidas-forma.component.html',
  
  /**
   * Ruta al archivo de estilos SCSS del componente.
   * @property {string} styleUrl
   */
  styleUrl: './mercancias-destruidas-forma.component.scss',
})
export class MercanciasDestruidasFormaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para manejar los datos de las mercancías destruidas.
   * 
   * Contiene los siguientes campos con sus respectivas validaciones:
   * - consecutivo: Número consecutivo (máximo 3 dígitos)
   * - descripcion: Descripción de la mercancía (máximo 250 caracteres)
   * - cantidad: Cantidad de mercancía (máximo 16 dígitos)
   * - unidadMedida: Unidad de medida seleccionada del catálogo
   * - peso: Peso de la mercancía (máximo 16 dígitos)
   * 
   * @type {FormGroup}
   * @memberof MercanciasDestruidasFormaComponent
   */
  mercanciaForm!: FormGroup;

  /**
   * Estado actual de la mercancía basado en el modelo `MercanciaForm`.
   * 
   * Contiene la información manejada dentro del componente y se sincroniza
   * con el store global del trámite para mantener la consistencia de datos.
   * 
   * @type {MercanciaForm}
   * @memberof MercanciasDestruidasFormaComponent
   */
  mercanciaState!: MercanciaForm;

  /**
   * Propiedad de entrada que indica si el formulario debe mostrarse solo en modo de lectura.
   * 
   * Cuando es `true`, todos los campos del formulario se deshabilitan y no permiten edición.
   * Cuando es `false`, el formulario permite la edición completa de todos los campos.
   * 
   * @type {boolean}
   * @memberof MercanciasDestruidasFormaComponent
   * @input
   */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * Configuración para el select de unidad de medida.
   * 
   * Contiene las opciones disponibles cargadas desde el catálogo de unidades de medida.
   * Se obtiene dinámicamente del archivo 'unidad-de-medida.json' a través del servicio de catálogos.
   * 
   * @type {Catalogo[]}
   * @memberof MercanciasDestruidasFormaComponent
   */
  unidadMedida: Catalogo[] = [];

  /**
   * Subject para notificar la destrucción del componente.
   * 
   * Utilizado para gestionar la limpieza de recursos y cancelar todas las suscripciones
   * activas cuando el componente es destruido, evitando memory leaks.
   * 
   * @type {Subject<void>}
   * @private
   * @memberof MercanciasDestruidasFormaComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la sección actual del formulario.
   * 
   * Contiene información sobre el estado de la sección del trámite,
   * incluyendo datos de navegación y configuración específica.
   * 
   * @type {SeccionLibState}
   * @private
   * @memberof MercanciasDestruidasFormaComponent
   */
  private seccion!: SeccionLibState;

  /**
   * Constructor del componente MercanciasDestruidasFormaComponent.
   * 
   * Inicializa todas las dependencias necesarias para el funcionamiento del componente,
   * incluyendo servicios para formularios, navegación, catálogos y manejo de estado.
   * También configura la suscripción inicial para el manejo del modo solo lectura.
   *
   * @param {FormBuilder} fb - Constructor para formularios reactivos de Angular
   * @param {Router} router - Servicio de navegación de Angular Router
   * @param {CatalogosService} catalogosService - Servicio personalizado para obtener catálogos
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query de Akita para consultar el estado del trámite
   * @param {TramiteStore} tramiteStore - Store de Akita para manejar el estado del trámite
   * @param {SeccionLibQuery} seccionQuery - Query de Akita para consultar el estado de la sección
   * @param {ConsultaioQuery} consultaioQuery - Query de Akita para manejar y actualizar el estado de consulta
   * 
   * @memberof MercanciasDestruidasFormaComponent
   */
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private router: Router,
    private readonly catalogosService: CatalogosService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Suscripción al estado de solo lectura del formulario.
     * 
     * Cuando cambia el estado de readonly en consultaioQuery, se ejecuta la inicialización
     * del formulario en modo lectura o edición según corresponda.
     * 
     * @memberof MercanciasDestruidasFormaComponent
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario según el estado de solo lectura.
   * 
   * Este método actúa como un dispatcher que determina qué acción tomar basándose en
   * el valor de `esFormularioSoloLectura`. Centraliza la lógica de inicialización
   * del formulario para mantener consistencia en el comportamiento.
   * 
   * Flujo de decisión:
   * - Si `esFormularioSoloLectura` es true: Ejecuta `guardarDatosFormulario()`
   * - Si `esFormularioSoloLectura` es false: Ejecuta `inicializarFormulario()`
   *
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Configura el formulario y ajusta su estado de habilitación según el modo de operación.
   * 
   * Este método inicializa el formulario reactivo y luego determina si debe estar
   * habilitado o deshabilitado basándose en la propiedad `esFormularioSoloLectura`.
   * Proporciona una transición suave entre los modos de solo lectura y edición.
   * 
   * Estados del formulario:
   * - Solo lectura (true): Formulario deshabilitado
   * - Edición (false): Formulario habilitado
   * - Otro caso: Sin cambios en el estado del formulario
   *
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.mercanciaForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.mercanciaForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo con los campos requeridos y sus validaciones.
   * 
   * Este método configura el formulario principal del componente con todas las validaciones
   * necesarias y establece la suscripción al estado de la mercancía desde el store.
   * 
   * Campos del formulario y sus validaciones:
   * - **consecutivo**: Número consecutivo (requerido, máx. 3 caracteres, solo dígitos)
   * - **descripcion**: Descripción de mercancía (requerido, máx. 250 caracteres, patrón de importes)
   * - **cantidad**: Cantidad (requerido, máx. 16 caracteres, solo dígitos)
   * - **unidadMedida**: Unidad de medida del catálogo (requerido)
   * - **peso**: Peso en la unidad especificada (requerido, máx. 16 caracteres, solo dígitos)
   * 
   * Patrones de validación utilizados:
   * - `REGEX_SOLO_DIGITOS`: Acepta únicamente números enteros
   * - `REGEX_IMPORTE_PAGO`: Acepta números decimales para importes
   *
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  inicializarFormulario(): void {
    /**
     * Suscripción al estado de la solicitud del trámite para obtener datos de mercancía.
     * Actualiza `mercanciaState` cuando hay cambios en el store.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.mercanciaState = seccionState.MercanciaState;
        })
      )
      .subscribe();

    /**
     * Configuración del formulario reactivo con validaciones específicas.
     * 
     * Cada campo tiene validaciones de:
     * - Obligatoriedad (Validators.required)
     * - Longitud máxima (Validators.maxLength)
     * - Patrón específico (Validators.pattern)
     * 
     * @type {FormGroup}
     */
    this.mercanciaForm = this.fb.group({
      /**
       * Campo consecutivo: Número secuencial de la mercancía.
       * @property {FormControl} consecutivo
       */
      consecutivo: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(REGEX_SOLO_DIGITOS),
        ],
      ],
      
      /**
       * Campo descripción: Descripción detallada de la mercancía.
       * @property {FormControl} descripcion
       */
      descripcion: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern(REGEX_IMPORTE_PAGO),
        ],
      ],
      
      /**
       * Campo cantidad: Cantidad numérica de la mercancía.
       * @property {FormControl} cantidad
       */
      cantidad: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern(REGEX_SOLO_DIGITOS),
        ],
      ],
      
      /**
       * Campo unidadMedida: Unidad de medida seleccionada del catálogo.
       * @property {FormControl} unidadMedida
       */
      unidadMedida: ['', Validators.required],
      
      /**
       * Campo peso: Peso de la mercancía en la unidad especificada.
       * @property {FormControl} peso
       */
      peso: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern(REGEX_SOLO_DIGITOS),
        ],
      ],
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * Coordina la inicialización completa del componente realizando las siguientes acciones:
   * 1. Inicializa el estado del formulario
   * 2. Configura suscripciones a los stores de estado
   * 3. Carga catálogos necesarios
   * 4. Establece listeners para cambios en el formulario
   * 
   * Suscripciones establecidas:
   * - Estado de solicitud del trámite: Para sincronizar datos del formulario
   * - Cambios de estado del formulario: Para actualizar el store automáticamente
   * - Estado de la sección: Para mantener contexto de navegación
   *
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   * @implements {OnInit}
   */
  ngOnInit(): void {
    // Inicialización del estado del formulario
    this.inicializarEstadoFormulario();
    
    /**
     * Primera suscripción al estado del trámite para inicializar mercanciaState.
     * Esta suscripción asegura que el estado esté disponible antes de otras operaciones.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.mercanciaState = seccionState.MercanciaState;
        })
      )
      .subscribe();

    // Carga de catálogos desplegables
    this.obtenerUnidadDesplegable();

    /**
     * Suscripción principal al estado de la solicitud de trámite.
     * 
     * Se ejecuta cuando hay cambios en el estado global y actualiza:
     * - El estado local de mercancía (`mercanciaState`)
     * - Los valores del formulario mediante `patchValue`
     * 
     * Utiliza verificación de existencia para evitar errores de referencia nula.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.mercanciaState = seccionState?.MercanciaState;
            this.mercanciaForm.patchValue(this.mercanciaState);
          }
        })
      )
      .subscribe();

    /**
     * Suscripción a los cambios de estado del formulario.
     * 
     * Escucha cambios en el formulario y actualiza automáticamente el store
     * con un pequeño delay para evitar actualizaciones excesivas.
     * 
     * Flujo:
     * 1. Detecta cambio en el formulario
     * 2. Aplica delay de 10ms para optimización
     * 3. Crea copia del estado actual del formulario
     * 4. Actualiza el store con los nuevos datos
     */
    this.mercanciaForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.mercanciaForm.value };
          this.tramiteStore.setMercanciaTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    /**
     * Suscripción al estado de la sección para contexto de navegación.
     * 
     * Mantiene actualizada la información de la sección actual,
     * útil para navegación y contexto del trámite.
     */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Coordina la obtención de todas las listas desplegables necesarias para el formulario.
   * 
   * Este método actúa como un dispatcher centralizado para cargar todos los catálogos
   * requeridos por el componente. Actualmente gestiona la carga de unidades de medida,
   * pero puede extenderse para incluir otros catálogos en el futuro.
   * 
   * Catálogos gestionados:
   * - Unidades de medida
   * 
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  obtenerUnidadDesplegable(): void {
    this.obtenerUnidadMedidaSelectList();
  }

  /**
   * Obtiene la lista de opciones para el select de unidad de medida.
   * 
   * Realiza una llamada al servicio de catálogos para cargar las opciones de unidades de medida
   * desde el archivo 'unidad-de-medida.json'. Los datos se almacenan en la propiedad
   * `unidadMedida` para su uso en el template.
   * 
   * Manejo de la respuesta:
   * - **next**: Almacena los datos del catálogo en `unidadMedida`
   * - **error**: Se maneja implícitamente por el observable (sin manejo explícito)
   * 
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   * 
   * @example
   * ```typescript
   * // El método se ejecuta automáticamente en ngOnInit
   * // Los datos se almacenan en this.unidadMedida para uso en template
   * ```
   */
  obtenerUnidadMedidaSelectList(): void {
    this.catalogosService
      .obtenerUnidadDesplegable('unidad-de-medida.json')
      .subscribe({
        /**
         * Callback ejecutado cuando la petición es exitosa.
         * @param {Catalogo[]} data - Array de opciones del catálogo
         */
        next: (data: Catalogo[]) => {
          this.unidadMedida = data;
        },
      });
  }

  /**
   * Cambia la pestaña activa en la interfaz de usuario y navega a la ruta correspondiente.
   * 
   * Este método maneja la navegación condicional basada en la URL actual, determinando
   * si el usuario está en el contexto de 'pago' o 'agace' y dirigiendo la navegación
   * a la ruta apropiada con el parámetro de consulta de la pestaña seleccionada.
   * 
   * Rutas de navegación:
   * - **Contexto 'pago'**: `/pago/acta-de-hechos/solicitud?tab={index}`
   * - **Contexto 'agace'**: `/agace/acta-de-hechos/solicitud?tab={index}`
   * 
   * La navegación mantiene el estado de la pestaña activa mediante query parameters,
   * permitiendo que el usuario pueda refrescar la página o navegar hacia atrás
   * manteniendo la pestaña seleccionada.
   *
   * @param {number} index - Índice de la pestaña a seleccionar (base 0)
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   * 
   * @example
   * ```typescript
   * // Navegar a la segunda pestaña (índice 1)
   * this.seleccionaTab(1);
   * 
   * // Si la URL actual es '/pago/acta-de-hechos/solicitud'
   * // Navegará a '/pago/acta-de-hechos/solicitud?tab=1'
   * 
   * // Si la URL actual es '/agace/acta-de-hechos/solicitud'
   * // Navegará a '/agace/acta-de-hechos/solicitud?tab=1'
   * ```
   */
  seleccionaTab(index: number): void {
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate(['/pago/acta-de-hechos/solicitud'], {
        queryParams: { tab: index },
      });
    } else {
      this.router.navigate(['/agace/acta-de-hechos/solicitud'], {
        queryParams: { tab: index },
      });
    }
  }

  /**
   * Resetea completamente el formulario de mercancías destruidas.
   * 
   * Este método limpia todos los campos del formulario reactivo, devolviendo
   * cada control a su estado inicial (vacío). Es útil para permitir al usuario
   * comenzar una nueva captura de datos sin necesidad de limpiar manualmente
   * cada campo.
   * 
   * Efectos del reset:
   * - Todos los campos vuelven a su valor inicial ('')
   * - Se eliminan las validaciones pendientes
   * - El formulario vuelve al estado 'pristine' y 'untouched'
   * - Se disparan los listeners de cambios de estado
   *
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   * 
   * @example
   * ```typescript
   * // Limpiar el formulario después de guardar exitosamente
   * this.guardarMercancia().then(() => {
   *   this.cancelarMercancia();
   * });
   * 
   * // Limpiar por acción del usuario
   * onCancelarClick() {
   *   this.cancelarMercancia();
   * }
   * ```
   */
  cancelarMercancia(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * 
   * Realiza la limpieza necesaria de recursos para prevenir memory leaks y
   * comportamientos inesperados. Este método es crítico para la gestión
   * adecuada de memoria en aplicaciones Angular que utilizan observables.
   * 
   * Tareas de limpieza realizadas:
   * 1. **Notifica destrucción**: Emite señal a través de `destroyNotifier$`
   * 2. **Completa el Subject**: Cierra el stream para liberar memoria
   * 3. **Cancela suscripciones**: Todas las suscripciones que usan `takeUntil(this.destroyNotifier$)` se cancelan automáticamente
   * 
   * Suscripciones que se cancelan automáticamente:
   * - consultaioQuery.selectConsultaioState$
   * - tramiteStoreQuery.selectSolicitudTramite$ (múltiples suscripciones)
   * - mercanciaForm.statusChanges
   * - seccionQuery.selectSeccionState$
   * 
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   * @implements {OnDestroy}
   * 
   * @example
   * ```typescript
   * // Este método es llamado automáticamente por Angular
   * // cuando el componente es destruido (navegación, etc.)
   * 
   * // No es necesario llamarlo manualmente:
   * // this.ngOnDestroy(); // INCORRECTO
   * 
   * // Angular lo gestiona automáticamente:
   * // Destrucción automática al navegar o cerrar componente
   * ```
   */
  ngOnDestroy(): void {
    /**
     * Emite señal de destrucción para notificar a todas las suscripciones
     * que usan el operador takeUntil(this.destroyNotifier$).
     */
    this.destroyNotifier$.next();
    
    /**
     * Completa el Subject para liberar completamente los recursos
     * y permitir que el garbage collector limpie la memoria.
     */
    this.destroyNotifier$.complete();
  }
}
