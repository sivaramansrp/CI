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

import { HECHOS_TABLA_COLUMNAS, HechosDatosTabla } from '../../modelos/acta-de-hechos.model';
import { TramiteState, TramiteStore } from '../../estados/tramite32516Store.store';
import { ALFANUMERICO_ESPACIO } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '../../servicios/catalogo.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { Input } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteStoreQuery } from '../../estados/tramite32516Query.query';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

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
   * Estado actual de la solicitud basado en el modelo `SolicitudForm`.
   * 
   * Contiene la información manejada dentro del componente y se sincroniza
   * con el store de Akita para mantener consistencia del estado.
   * 
   * @type {SolicitudForm}
   * @memberof TipoDeAvisoComponent
   */
  solicitudState!: TramiteState;

  datosTabla: HechosDatosTabla[] = [];

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
   * @type {ConfiguracionColumna<HechosDatosTabla>[]}
   * @memberof TipoDeAvisoComponent
   */
  hechosTabla: ConfiguracionColumna<HechosDatosTabla>[] = HECHOS_TABLA_COLUMNAS;

  /**
   * Datos procesados para la tabla de hechos.
   * 
   * Contiene la información de los hechos asociados al trámite,
   * listos para su visualización en la interfaz de usuario.
   * Se actualiza mediante llamadas al servicio `HechosTablaServicios`.
   * 
   * @type {HechosDatosTabla[]}
   * @memberof TipoDeAvisoComponent
   */
  hechosTableDatos: HechosDatosTabla[] = [];
  
  /**
   * Array que contiene las filas seleccionadas de la tabla de hechos.
   * 
   * Se actualiza cuando el usuario selecciona o deselecciona checkboxes en la tabla.
   * Utilizado para controlar la visibilidad del botón "Eliminar" y para realizar
   * operaciones sobre las filas seleccionadas.
   * 
   * @type {HechosDatosTabla[]}
   * @memberof TipoDeAvisoComponent
   */
  filasSeleccionadas: HechosDatosTabla[] = [];

  /**
   * Referencia al botón de cerrar modal.
   * 
   * Utilizada para cerrar automáticamente el modal después de agregar una mercancía.
   * 
   * @type {ElementRef}
   * @memberof TipoDeAvisoComponent
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

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
    private consultaioQuery: ConsultaioQuery,
    private ubicaccion: Location,
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
    this.solicitudForm = this.fb.group({
      descripcionGenerica1: [this.solicitudState?.descripcionGenerica1, [Validators.required]],
      descripcionGenerica2: [this.solicitudState?.descripcionGenerica2, [Validators.required, Validators.maxLength(250), Validators.pattern(ALFANUMERICO_ESPACIO)],],
      descripcionGenerica3: [this.solicitudState?.descripcionGenerica3, [Validators.required]],
      capacidadAlmacenamiento: [this.solicitudState?.capacidadAlmacenamiento, [Validators.required]],
      cantidadBienes: [this.solicitudState?.cantidadBienes, [Validators.required]],
    });

    this.mercanciaForm = this.fb.group({
      consecutivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      peso: ['', [Validators.required]],
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
     this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.datosTabla = this.solicitudState?.tableDatos || [];
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.obtenerHechosSelectList();
    this.obtenerLevantarActaDesplegables();
    this.radioOpcion = this.catalogosService.RadioOpcion;
    this.obtenerUnidadDesplegable();
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
   * Maneja la selección de filas en la tabla de hechos.
   * 
   * Este método se ejecuta cuando el usuario selecciona o deselecciona checkboxes
   * en la tabla. Actualiza el array de filas seleccionadas que se utiliza para
   * controlar las operaciones de eliminación.
   * 
   * @param {HechosDatosTabla[]} filasSeleccionadas - Array de filas seleccionadas por el usuario
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  onSeleccionChange(filasSeleccionadas: HechosDatosTabla[]): void {
    this.filasSeleccionadas = filasSeleccionadas;
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

  /**
   * Coordina la obtención de todas las listas desplegables necesarias para el formulario.
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  obtenerUnidadDesplegable(): void {
    this.obtenerUnidadMedidaSelectList();
  }

  /**
   * Obtiene la lista de opciones para el select de unidad de medida.
   * @returns {void}
   * @memberof MercanciasDestruidasFormaComponent
   */
  obtenerUnidadMedidaSelectList(): void {
    this.catalogosService
      .obtenerUnidadDesplegable('unidad-de-medida.json')
      .subscribe({
        next: (data: Catalogo[]) => {
          this.unidadMedida = data;
        },
      });
  }

  /**
 * Resetea completamente el formulario de mercancías destruidas.
 * @returns {void}
 * @memberof MercanciasDestruidasFormaComponent
 */
  cancelarMercancia(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Agrega una nueva mercancía a la tabla de datos.
   * Valida el formulario, crea un nuevo registro y lo añade a la tabla.
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  agregarMercancia(): void {
    if (this.mercanciaForm.valid) {
      // Obtener la unidad de medida seleccionada
      const UNIDAD_SELECCIONADA = this.unidadMedida.find(
        unidad => unidad.id === parseInt(this.mercanciaForm.value.unidadMedida, 10)
      );

      // Crear nuevo objeto de datos para la tabla
      const NUEVA_MERCANCIA: HechosDatosTabla = {
        consecutivo: this.mercanciaForm.value.consecutivo,
        descripcion: this.mercanciaForm.value.descripcion,
        descripcionDeMercancia: this.mercanciaForm.value.cantidad,
        cantidad: this.mercanciaForm.value.cantidad,
        unidadMedida: UNIDAD_SELECCIONADA?.descripcion || this.mercanciaForm.value.unidadMedida,
        peso: this.mercanciaForm.value.peso,
      };

      // Agregar a la tabla de datos
      this.datosTabla = [...this.datosTabla, NUEVA_MERCANCIA];
      
      // Actualizar el store con los nuevos datos
      this.actualizarDatosEnStore();
      
      // Resetear el formulario
      this.mercanciaForm.reset();
      
      // Cerrar el modal
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores de validación
      Object.keys(this.mercanciaForm.controls).forEach(key => {
        this.mercanciaForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Elimina las filas seleccionadas de la tabla de datos.
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  eliminarFilasSeleccionadas(): void {
    if (this.filasSeleccionadas.length > 0) {
      // Filtrar los datos eliminando las filas seleccionadas
      this.datosTabla = this.datosTabla.filter(item => 
        !this.filasSeleccionadas.some(selected => 
          selected.consecutivo === item.consecutivo && 
          selected.descripcion === item.descripcion
        )
      );
      
      // Limpiar la selección
      this.filasSeleccionadas = [];
      
      // Actualizar el store con los nuevos datos
      this.actualizarDatosEnStore();
    }
  }

  /**
   * Actualiza los datos en el store de la aplicación.
   * @private
   * @returns {void}
   * @memberof TipoDeAvisoComponent
   */
  private actualizarDatosEnStore(): void {
    this.tramiteStore.setHechosTablaDatos(this.datosTabla);
  }

}
