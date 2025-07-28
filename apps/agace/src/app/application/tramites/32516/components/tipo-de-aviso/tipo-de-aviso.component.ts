/**
 * Componente Angular para el manejo del tipo de aviso en el trámite 32516.
 * 
 * Este archivo contiene la implementación de un componente standalone de Angular que gestiona
 * formularios reactivos, tablas dinámicas y validaciones relacionadas con actas de hechos.
 * Proporciona funcionalidades para capturar, visualizar y administrar información de solicitudes
 * dentro del sistema VUCEM 3.0.
 * 
 * @fileoverview Componente principal para el manejo de avisos y formularios de actas de hechos
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 */

import { ALFANUMERICO_ESPACIO } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HECHOS_SERVICIO } from '../../modelos/acta-de-hechos.model';
import { HechosInfo } from '../../modelos/acta-de-hechos.model';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { Input } from '@angular/core';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { SolicitudForm } from '../../modelos/acta-de-hechos.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
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
 * Componente Angular standalone para el manejo del tipo de aviso en el trámite 32516.
 * 
 * Este componente proporciona funcionalidad completa para gestionar formularios reactivos,
 * tablas dinámicas y validaciones relacionadas con actas de hechos. Incluye manejo de
 * estado mediante Akita stores, validaciones condicionales y integración con servicios
 * de catálogos.
 * 
 * Características principales:
 * - Formularios reactivos con validaciones dinámicas
 * - Integración con tablas de datos dinámicas
 * - Manejo de estado centralizado mediante Akita
 * - Soporte para modo solo lectura
 * - Gestión automática de suscripciones para prevenir memory leaks
 * 
 * @export
 * @class TipoDeAvisoComponent
 * @implements {OnInit} - Para inicialización del componente
 * @implements {OnDestroy} - Para limpieza de recursos y suscripciones
 */
@Component({
  /**
   * Selector del componente utilizado en templates HTML.
   * 
   * @property {string} selector - Nombre del elemento HTML personalizado
   */
  selector: 'tipo-de-aviso',
  
  /**
   * Indica que este es un componente standalone que no requiere módulo padre.
   * 
   * @property {boolean} standalone - Configuración de componente independiente
   */
  standalone: true,
  
  /**
   * Módulos y componentes importados para uso dentro de este componente.
   * 
   * Incluye:
   * - `CommonModule`: Directivas básicas de Angular (ngIf, ngFor, etc.)
   * - `ReactiveFormsModule`: Para formularios reactivos
   * - `TituloComponent`: Componente para mostrar títulos
   * - `CatalogoSelectComponent`: Componente select para catálogos
   * - `TablaDinamicaComponent`: Componente de tabla dinámica
   * - `InputRadioComponent`: Componente de radio buttons
   * 
   * @property {Array} imports - Array de módulos y componentes importados
   */
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  
  /**
   * Ruta al archivo de template HTML del componente.
   * 
   * @property {string} templateUrl - Ruta relativa al archivo HTML
   */
  templateUrl: './tipo-de-aviso.component.html',
  
  /**
   * Rutas a los archivos de estilos CSS/SCSS del componente.
   * 
   * @property {string[]} styleUrls - Array de rutas a archivos de estilos
   */
  styleUrls: ['./tipo-de-aviso.component.scss'],
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  
  // ========================================
  // PROPIEDADES DEL FORMULARIO
  // ========================================
  
  /**
   * Formulario reactivo para manejar los datos de la solicitud.
   * 
   * Contiene los controles para:
   * - `cantidadBienes`: Cantidad de bienes a reportar
   * - `descripcionGenerica1`: Primera descripción genérica
   * - `descripcionGenerica2`: Segunda descripción genérica  
   * - `descripcionGenerica3`: Tercera descripción genérica (condicional)
   * - `capacidadAlmacenamiento`: Capacidad de almacenamiento
   * 
   * @type {FormGroup}
   * @memberof TipoDeAvisoComponent
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud basado en el modelo `SolicitudForm`.
   * 
   * Contiene la información manejada dentro del componente y se sincroniza
   * con el store de Akita para mantener consistencia del estado.
   * 
   * @type {SolicitudForm}
   * @memberof TipoDeAvisoComponent
   */
  solicitudState!: SolicitudForm;

  // ========================================
  // PROPIEDADES DE CONFIGURACIÓN
  // ========================================

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * 
   * Cuando es `true`, todos los controles del formulario se deshabilitan
   * y no permiten edición por parte del usuario.
   * 
   * @type {boolean}
   * @memberof TipoDeAvisoComponent
   */
  @Input() esFormularioSoloLectura!: boolean;

  // ========================================
  // PROPIEDADES PRIVADAS DE GESTIÓN
  // ========================================

  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * 
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria mediante
   * el operador `takeUntil()` en todas las suscripciones del componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof TipoDeAvisoComponent
   */
  private destroyNotifier$ = new Subject<void>();

  // ========================================
  // PROPIEDADES DE CATÁLOGOS
  // ========================================

  /**
   * Configuración para el select de acta de hechos.
   * 
   * Contiene el listado de opciones disponibles obtenidas desde el servicio
   * de catálogos para el componente de selección de acta de hechos.
   * 
   * @type {Catalogo[]}
   * @memberof TipoDeAvisoComponent
   */
  actaDeHechos: Catalogo[] = [];

  /**
   * Configuración para el select de levantar acta.
   * 
   * Contiene el listado de opciones disponibles obtenidas desde el servicio
   * de catálogos para el componente de selección de levantar acta.
   * 
   * @type {Catalogo[]}
   * @memberof TipoDeAvisoComponent
   */
  levantarActa: Catalogo[] = [];

  // ========================================
  // PROPIEDADES DE TABLA
  // ========================================

  /**
   * Tipo de selección de la tabla utilizando checkbox.
   * 
   * Define el comportamiento de selección para la tabla dinámica,
   * permitiendo selección múltiple mediante checkboxes.
   * 
   * @type {TablaSeleccion}
   * @memberof TipoDeAvisoComponent
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla para la lista de hechos.
   * 
   * Define las propiedades y formato de las columnas en la tabla de hechos,
   * incluyendo nombres, tipos de datos, filtros y ordenamiento.
   * Utiliza la configuración importada desde `HECHOS_SERVICIO`.
   * 
   * @type {ConfiguracionColumna<HechosInfo>[]}
   * @memberof TipoDeAvisoComponent
   */
  hechosTabla: ConfiguracionColumna<HechosInfo>[] = HECHOS_SERVICIO;

  /**
   * Datos procesados para la tabla de hechos.
   * 
   * Contiene la información de los hechos asociados al trámite,
   * listos para su visualización en la interfaz de usuario.
   * Se actualiza mediante llamadas al servicio `HechosTablaServicios`.
   * 
   * @type {HechosInfo[]}
   * @memberof TipoDeAvisoComponent
   */
  hechosTableDatos: HechosInfo[] = [];

  // ========================================
  // PROPIEDADES DE ESTADO
  // ========================================

  /**
   * Estado de la sección actual.
   * 
   * Contiene información sobre el estado de la sección obtenida
   * desde el query de Akita `SeccionLibQuery`.
   * 
   * @private
   * @type {SeccionLibState}
   * @memberof TipoDeAvisoComponent
   */
  private seccion!: SeccionLibState;

  /**
   * Opciones para el componente de radio buttons.
   * 
   * Contiene un arreglo de objetos con etiquetas y valores para las opciones
   * de selección única. Se obtiene desde el servicio de catálogos.
   * 
   * Estructura esperada:
   * ```typescript
   * [
   *   { label: 'Opción 1', value: 'valor1' },
   *   { label: 'Opción 2', value: 'valor2' }
   * ]
   * ```
   * 
   * @type {Array<{ label: string; value: string }>}
   * @memberof TipoDeAvisoComponent
   */
  radioOpcion: { label: string; value: string }[] = [];

  // ========================================
  // CONSTRUCTOR Y DEPENDENCIAS
  // ========================================

  /**
   * Constructor del componente TipoDeAvisoComponent.
   * 
   * Inicializa todas las dependencias necesarias para el funcionamiento del componente
   * y establece la suscripción inicial para el manejo del estado de solo lectura.
   * 
   * @param {FormBuilder} fb - Constructor para formularios reactivos de Angular
   * @param {CatalogosService} catalogosService - Servicio para obtener catálogos y listas desplegables
   * @param {HechosTablaServicios} hechosTablaServicios - Servicio para obtener datos de la tabla de hechos
   * @param {Router} router - Servicio de Angular para navegación entre rutas
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query de Akita para consultar el estado del trámite
   * @param {TramiteStore} tramiteStore - Store de Akita para manejar el estado del trámite
   * @param {SeccionLibQuery} seccionQuery - Query de Akita para consultar el estado de la sección
   * @param {ChangeDetectorRef} cdr - Servicio de Angular para detectar y optimizar cambios en la vista
   * @param {ConsultaioQuery} consultaioQuery - Query de Akita para manejar y actualizar el estado de consultas
   * 
   * @memberof TipoDeAvisoComponent
   */
  constructor(
    private fb: FormBuilder,
    private readonly catalogosService: CatalogosService,
    private readonly hechosTablaServicios: HechosTablaServicios,
    private router: Router,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private cdr: ChangeDetectorRef,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Suscripción al estado de solo lectura del formulario.
     * 
     * Observa los cambios en el estado de consulta para determinar si el formulario
     * debe mostrarse en modo solo lectura y actualiza la configuración correspondiente.
     * 
     * @memberof TipoDeAvisoComponent
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

  // ========================================
  // MÉTODOS DE INICIALIZACIÓN
  // ========================================

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario según el modo actual.
   * 
   * Determina la estrategia de inicialización basándose en si el formulario está
   * en modo solo lectura o en modo edición, ejecutando el método correspondiente.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde el store y configura el formulario según el modo de operación.
   * 
   * Inicializa el formulario y luego determina si debe habilitarlo o deshabilitarlo
   * según el estado de `esFormularioSoloLectura`. Este método se encarga de la
   * gestión del estado del formulario después de la inicialización.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.solicitudForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.solicitudForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo con los campos requeridos y sus validaciones.
   * 
   * Crea un FormGroup con todos los controles necesarios para el formulario,
   * aplicando las validaciones correspondientes a cada campo. También establece
   * la suscripción para obtener el estado actual de la solicitud desde el store.
   * 
   * Campos del formulario:
   * - `cantidadBienes`: Campo requerido para cantidad de bienes
   * - `descripcionGenerica1`: Campo requerido para primera descripción
   * - `descripcionGenerica2`: Campo requerido para segunda descripción
   * - `descripcionGenerica3`: Campo con validación condicional
   * - `capacidadAlmacenamiento`: Campo requerido para capacidad
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  inicializarFormulario(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState.SolicitudState;
        })
      )
      .subscribe();

    this.solicitudForm = this.fb.group({
      cantidadBienes: ['', [Validators.required]],
      descripcionGenerica1: ['', [Validators.required]],
      descripcionGenerica2: ['', [Validators.required]],
      descripcionGenerica3: ['', [ Validators.required, Validators.maxLength(250), Validators.pattern(ALFANUMERICO_ESPACIO)],],
      capacidadAlmacenamiento: ['', [Validators.required]],
    });
  }

  // ========================================
  // MÉTODOS DE NAVEGACIÓN
  // ========================================

  /**
   * Navega a la página de agregar según el contexto de la URL actual.
   * 
   * Determina la ruta de destino basándose en si la URL actual contiene 'pago'
   * y redirige a la página correspondiente para agregar mercancías destruidas.
   * 
   * Rutas posibles:
   * - Si contiene 'pago': `/pago/acta-de-hechos/mercancias-destruidas-forma`
   * - Caso contrario: `/agace/acta-de-hechos/mercancias-destruidas-forma`
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  irAPaginaAgregar(): void {
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate([
        '/pago/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    } else {
      this.router.navigate([
        '/agace/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    }
  }

  // ========================================
  // MÉTODOS DEL CICLO DE VIDA DEL COMPONENTE
  // ========================================

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Configura todas las suscripciones necesarias, inicializa el formulario,
   * obtiene los catálogos requeridos y establece el comportamiento reactivo
   * del formulario. Este método es el punto de entrada principal para la
   * configuración inicial del componente.
   * 
   * Acciones realizadas:
   * 1. Inicializa el estado del formulario
   * 2. Configura suscripciones a cambios de estado
   * 3. Establece validaciones condicionales
   * 4. Obtiene listas desplegables de catálogos
   * 5. Configura opciones de radio buttons
   * 6. Busca datos para tablas
   * 7. Establece suscripción para cambios del formulario
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState.SolicitudState;
        })
      )
      .subscribe();

    this.handleConditionalValidation();
    this.obtenerListasDesplegables();
    this.obtenerLevantarActaDesplegables();
    this.radioOpcion = this.catalogosService.RadioOpcion;

    /**
     * Suscripción a cambios en el estado de la solicitud de trámite.
     * 
     * Observa los cambios en el store del trámite y actualiza el formulario
     * con los nuevos datos cuando el estado cambia.
     * 
     * @memberof TipoDeAvisoComponent
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.solicitudState = seccionState?.SolicitudState;
            this.solicitudForm.patchValue(this.solicitudState);
          }
        })
      )
      .subscribe();

    /**
     * Suscripción a cambios en el estado del formulario.
     * 
     * Observa los cambios en el estado de validación del formulario y,
     * después de un breve retraso, actualiza el estado en el store.
     * El retraso previene actualizaciones excesivas durante la escritura.
     * 
     * @memberof TipoDeAvisoComponent
     */
    this.solicitudForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.solicitudForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.buscarDatos();

    /**
     * Suscripción a cambios en el estado de la sección.
     * 
     * Observa los cambios en el estado de la sección y almacena
     * la información actualizada en la propiedad local.
     * 
     * @memberof TipoDeAvisoComponent
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

  // ========================================
  // MÉTODOS DE VALIDACIÓN
  // ========================================

  /**
   * Configura la validación condicional para el campo descripcionGenerica3.
   * 
   * Establece un observable que observa los cambios en el campo `cantidadBienes`
   * y dinámicamente agrega o remueve validadores del campo `descripcionGenerica3`
   * según el valor seleccionado.
   * 
   * Lógica de validación:
   * - Si `cantidadBienes` es '1': Se agrega validador `required` a `descripcionGenerica3`
   * - Si `cantidadBienes` es diferente de '1': Se remueven todos los validadores
   * 
   * @private
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  private handleConditionalValidation(): void {
    this.solicitudForm
      .get('cantidadBienes')
      ?.valueChanges.subscribe((value) => {
        const DESCRIPCION_GENERICA_3 = this.solicitudForm.get(
          'descripcionGenerica3'
        );
        if (value === '1') {
          DESCRIPCION_GENERICA_3?.setValidators([Validators.required]);
        } else {
          DESCRIPCION_GENERICA_3?.clearValidators();
        }
        DESCRIPCION_GENERICA_3?.updateValueAndValidity();
      });
  }

  // ========================================
  // MÉTODOS DE CATÁLOGOS Y LISTAS DESPLEGABLES
  // ========================================

  /**
   * Método principal para obtener todas las listas desplegables necesarias.
   * 
   * Actúa como coordinador para la carga de todos los catálogos requeridos
   * por el componente. Actualmente gestiona la obtención de la lista de
   * acta de hechos.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  obtenerListasDesplegables(): void {
    this.obtenerHechosSelectList();
  }

  /**
   * Obtiene la lista de opciones para el select de acta de hechos.
   * 
   * Realiza una llamada al servicio de catálogos para obtener los datos
   * del archivo 'acta-de-hechos.json' y actualiza la propiedad `actaDeHechos`
   * con las opciones disponibles.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  obtenerHechosSelectList(): void {
    this.catalogosService
      .obtenerMenuDesplegable('acta-de-hechos.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data: Catalogo[]) => {
          this.actaDeHechos = data;
        },
      });
  }

  /**
   * Método principal para obtener las listas desplegables de levantar acta.
   * 
   * Coordina la carga de los catálogos específicos para las opciones
   * de levantar acta en el componente.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  obtenerLevantarActaDesplegables(): void {
    this.obtenerLevantarActaSelectList();
  }

  /**
   * Obtiene la lista de opciones para el select de levantar acta.
   * 
   * Realiza una llamada al servicio de catálogos para obtener los datos
   * del archivo 'levantar.json' y actualiza la propiedad `levantarActa`
   * con las opciones disponibles.
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  obtenerLevantarActaSelectList(): void {
    this.catalogosService
      .obtenerLevantarActaDesplegable('levantar.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.levantarActa = data;
      });
  }

  // ========================================
  // MÉTODOS DE DATOS Y TABLAS
  // ========================================

  /**
   * Busca y carga los datos para la tabla de hechos.
   * 
   * Realiza una llamada al servicio `HechosTablaServicios` para obtener
   * los datos de hechos y actualiza la propiedad `hechosTableDatos` con
   * la información obtenida. Incluye validación para asegurar que la
   * respuesta contiene un array válido.
   * 
   * Estructura esperada de la respuesta:
   * ```typescript
   * {
   *   hechosApiDatos: HechosInfo[]
   * }
   * ```
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  buscarDatos(): void {
    this.hechosTablaServicios
      .obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response: { hechosApiDatos: HechosInfo[] }) => {
          if (response && Array.isArray(response.hechosApiDatos)) {
            this.hechosTableDatos = response.hechosApiDatos;
          }
        },
      });
  }

  // ========================================
  // MÉTODOS DE LIMPIEZA Y DESTRUCCIÓN
  // ========================================

  /**
   * Método del ciclo de vida que se ejecuta antes de destruir el componente.
   * 
   * Realiza la limpieza necesaria para prevenir fugas de memoria mediante
   * la finalización del Subject `destroyNotifier$`. Esto garantiza que todas
   * las suscripciones que utilizan `takeUntil(this.destroyNotifier$)` se
   * cancelen automáticamente.
   * 
   * Acciones realizadas:
   * 1. Emite un valor final al Subject `destroyNotifier$`
   * 2. Completa el Subject para cancelar todas las suscripciones activas
   * 
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
