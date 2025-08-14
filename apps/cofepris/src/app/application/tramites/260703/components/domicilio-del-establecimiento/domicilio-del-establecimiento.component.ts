import {
  Catalogo,
  ConfiguracionColumna,
  Notificacion,
  TablaSeleccion
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MERCANCIAS_DATA, NOTIFICION_INPUT } from '../../enum/solicitud-permiso.enum';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Mercancia } from '../../model/solicitud-permiso.model';
import { SCIAN_DATA } from '../../../../shared/constantes/datos-scian.enum';
import { ScianData } from '../../../../shared/models/datos-modificacion.model';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

/**
 * Componente que representa la sección de domicilio del establecimiento.
 * Permite capturar y gestionar información relacionada con el domicilio del establecimiento,
 * incluyendo datos de ubicación, contacto, funcionamiento y clasificación SCIAN.
 * 
 * Este componente maneja:
 * - Formularios reactivos para captura de datos del domicilio
 * - Tablas dinámicas para datos SCIAN y mercancías
 * - Integración con el store para persistencia de datos
 * - Modo solo lectura basado en el estado de consulta
 * 
 * @example
 * ```html
 * <app-domicilio-del-establecimiento></app-domicilio-del-establecimiento>
 * ```
 * 
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos del domicilio del establecimiento.
   * Incluye validaciones para campos obligatorios como código postal, estado, municipio, etc.
   * 
   * Campos del formulario:
   * - codigoPostal: Código postal del establecimiento (requerido)
   * - estado: Estado donde se ubica el establecimiento (requerido)
   * - descripcionMunicipio: Descripción del municipio (requerido)
   * - informacionExtra: Información adicional del domicilio (opcional)
   * - descripcionColonia: Descripción de la colonia (opcional)
   * - calle: Nombre de la calle (requerido)
   * - lada: Código de área telefónico (opcional)
   * - telefono: Número de teléfono (requerido)
   * - funcionamiento: Descripción del funcionamiento (opcional)
   * - licencia: Número de licencia (requerido)
   * - regimen: Régimen del establecimiento (requerido)
   * - aduana: Aduana asociada (requerido)
   * 
   * @type {FormGroup}
   * @see {@link inicializarFormularioDomicilioDelEstablecimiento}
   * @example
   * ```typescript
   * // Obtener el valor de un campo específico
   * const codigoPostal = this.domicilloDelEstablecimientoForm.get('codigoPostal')?.value;
   * 
   * // Validar el formulario completo
   * if (this.domicilloDelEstablecimientoForm.valid) {
   *   // Procesar datos válidos
   * }
   * ```
   */
  domicilloDelEstablecimientoForm!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   * Contiene toda la información del proceso de solicitud, incluyendo el estado
   * del formulario de domicilio del establecimiento.
   * 
   * @type {SolicitudPermisoState}
   * @see {@link SolicitudPermisoState}
   * @example
   * ```typescript
   * // Acceder a los datos del domicilio desde el estado
   * const domicilioData = this.solicitudPermisoState.domicilloDelEstablecimientoFormState;
   * ```
   */
  solicitudPermisoState!: SolicitudPermisoState;

  /**
   * Configuración de las columnas de la tabla SCIAN.
   * Define la estructura, encabezados y formato de visualización
   * para los datos del Sistema de Clasificación Industrial de América del Norte.
   * 
   * @type {ConfiguracionColumna<ScianData>[]}
   * @default SCIAN_DATA
   * @see {@link SCIAN_DATA}
   * @see {@link ConfiguracionColumna}
   * @see {@link ScianData}
   * @example
   * ```typescript
   * // Acceder a la configuración de una columna específica
   * const primeraColumna = this.configuracionTabla[0];
   * console.log(primeraColumna.encabezado); // Muestra el encabezado de la primera columna
   * ```
   */
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  /**
   * Datos de la tabla SCIAN (Sistema de Clasificación Industrial de América del Norte).
   * Contiene la información de clasificación industrial que se muestra en la tabla.
   * Se obtiene a través del servicio y se actualiza dinámicamente.
   * 
   * @type {ScianData[]}
   * @see {@link ScianData}
   * @see {@link obtenerScianData}
   * @example
   * ```typescript
   * // Verificar si hay datos SCIAN disponibles
   * if (this.scianDatos && this.scianDatos.length > 0) {
   *   console.log(`Se encontraron ${this.scianDatos.length} registros SCIAN`);
   * }
   * ```
   */
  scianDatos!: ScianData[];

  /**
   * Datos de la tabla de mercancías.
   * Contiene la información sobre las mercancías asociadas al establecimiento.
   * Incluye detalles como clasificación, denominación, marca y fracción arancelaria.
   * 
   * @type {Mercancia[]}
   * @see {@link Mercancia}
   * @see {@link obternerMercanciaData}
   * @example
   * ```typescript
   * // Iterar sobre las mercancías
   * this.mercanciaDatos.forEach(mercancia => {
   *   console.log(`Mercancía: ${mercancia.denomiacionEspecifica}`);
   * });
   * ```
   */
  mercanciaDatos!: Mercancia[];

  /**
   * Configuración de las columnas de la tabla de mercancías.
   * Define la estructura de visualización para los datos de mercancías,
   * incluyendo encabezados, tipos de datos y formateo.
   * 
   * @type {ConfiguracionColumna<Mercancia>[]}
   * @default MERCANCIAS_DATA
   * @see {@link MERCANCIAS_DATA}
   * @see {@link ConfiguracionColumna}
   * @see {@link Mercancia}
   * @example
   * ```typescript
   * // Obtener la configuración de una columna específica
   * const columnaDescripcion = this.configuracionTablaMercancia.find(col => 
   *   col.encabezado === 'Descripción'
   * );
   * ```
   */
  configuracionTablaMercancia: ConfiguracionColumna<Mercancia>[] = MERCANCIAS_DATA;

  /**
   * Lista de estados disponibles para selección en el formulario.
   * Se obtiene del catálogo del servicio y se usa para poblar 
   * el campo de selección de estado en el formulario.
   * 
   * @type {Catalogo[]}
   * @see {@link Catalogo}
   * @see {@link SolicitudPermisoService.obtenerDomicilioCatalogo}
   * @example
   * ```typescript
   * // Buscar un estado específico
   * const estadoSeleccionado = this.estado.find(estado => 
   *   estado.clave === 'CDMX'
   * );
   * ```
   */
  estado: Catalogo[] = [{ id: 1, descripcion: 'VERACRUZ' }];

  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   * Define el comportamiento de selección en las tablas dinámicas del componente.
   * 
   * @type {TablaSeleccion}
   * @default TablaSeleccion.CHECKBOX
   * @see {@link TablaSeleccion}
   * @example
   * ```typescript
   * // Cambiar el tipo de selección a radio buttons
   * this.tipoSeleccionTabla = TablaSeleccion.RADIO;
   * ```
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la notificación de entrada.
   * Define los parámetros iniciales para las notificaciones del componente,
   * incluyendo tipo, mensaje, duración y comportamiento de las alertas.
   * 
   * @type {Notificacion}
   * @default NOTIFICION_INPUT
   * @see {@link NOTIFICION_INPUT}
   * @see {@link Notificacion}
   * @example
   * ```typescript
   * // Modificar la configuración de notificación
   * this.notificacionInput.tipo = 'success';
   * this.notificacionInput.mensaje = 'Datos guardados correctamente';
   * ```
   */
  notificacionInput: Notificacion = NOTIFICION_INPUT;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria mediante el patrón takeUntil.
   * Se completa en el método ngOnDestroy para cancelar todas las suscripciones activas.
   * 
   * @private
   * @type {Subject<void>}
   * @see {@link ngOnDestroy}
   * @example
   * ```typescript
   * // Usar en una suscripción para evitar fugas de memoria
   * this.someObservable.pipe(
   *   takeUntil(this.destruirNotificacion$)
   * ).subscribe(data => {
   *   // Procesar datos
   * });
   * ```
   */
  destruirNotificacion$: Subject<void> = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   * Se actualiza automáticamente basado en el estado de consulta.
   * 
   * @type {boolean}
   * @default false
   * @see {@link guardarDatosFormulario}
   * @example
   * ```typescript
   * // Verificar modo de solo lectura
   * if (this.esFormularioSoloLectura) {
   *   // Deshabilitar controles adicionales
   *   this.disableCustomControls();
   * }
   * ```
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para gestionar el formulario y el estado.
   * Configura la suscripción al estado de consulta para determinar el modo de solo lectura.
   * 
   * @param {FormBuilder} formBuilder - Servicio para construir formularios reactivos
   * @param {SolicitudPermisoService} solicitudPermisoService - Servicio para obtener datos relacionados con el domicilio
   * @param {Tramite260703Store} tramite260703Store - Servicio para gestionar el estado del trámite
   * @param {Tramite260703Query} tramite2606703Query - Servicio para consultar el estado del trámite
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de consulta y modo de solo lectura
   * 
   * @example
   * ```typescript
   * // El constructor se ejecuta automáticamente al instanciar el componente
   * const component = new DomicilioDelEstablecimientoComponent(
   *   formBuilder,
   *   solicitudPermisoService,
   *   tramite260703Store,
   *   tramite260703Query,
   *   consultaioQuery
   * );
   * ```
   */
  constructor(
    private formBuilder: FormBuilder,
    public solicitudPermisoService: SolicitudPermisoService,
    private tramite260703Store: Tramite260703Store,
    private tramite2606703Query: Tramite260703Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destruirNotificacion$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       this.guardarDatosFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Guarda los datos del formulario de domicilio del establecimiento.
   * Habilita o deshabilita los campos del formulario según el modo de solo lectura.
   * 
   * Este método:
   * - Deshabilita todos los controles si está en modo solo lectura
   * - Habilita todos los controles si está en modo edición
   * - Mantiene la integridad de los datos según el estado de consulta
   * 
   * @returns {void}
   * @see {@link esFormularioSoloLectura}
   * @see {@link domicilloDelEstablecimientoForm}
   * @example
   * ```typescript
   * // Llamar después de cambiar el modo de solo lectura
   * this.esFormularioSoloLectura = true;
   * this.guardarDatosFormulario(); // Deshabilita el formulario
   * ```
   */
  guardarDatosFormulario(): void {
    if(!this.domicilloDelEstablecimientoForm){
      return;
    }
    if (this.esFormularioSoloLectura) {
      this.domicilloDelEstablecimientoForm.disable()
    } else{
      this.domicilloDelEstablecimientoForm.enable()
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias, obtiene los datos iniciales y crea el formulario.
   * 
   * Realiza las siguientes operaciones en orden:
   * 1. Suscribe al estado de la solicitud de permiso
   * 2. Obtiene el catálogo de domicilios (estados, municipios, etc.)
   * 3. Carga los datos SCIAN
   * 4. Carga los datos de mercancías
   * 5. Inicializa el formulario de domicilio
   * 6. Aplica la configuración de solo lectura
   * 
   * @returns {void}
   * @see {@link inicializarFormularioDomicilioDelEstablecimiento}
   * @see {@link obtenerScianData}
   * @see {@link obternerMercanciaData}
   * @see {@link guardarDatosFormulario}
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al inicializar el componente
   * component.ngOnInit();
   * ```
   */
  ngOnInit(): void {
    this.tramite2606703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((solicitudPermisoState: SolicitudPermisoState) => {
        this.solicitudPermisoState = solicitudPermisoState;
      });
    this.solicitudPermisoService.obtenerDomicilioCatalogo();
    this.obtenerScianData();
    this.obternerMercanciaData();
    this.inicializarFormularioDomicilioDelEstablecimiento();
    this.guardarDatosFormulario();
  }

  /**
   * Inicializa el formulario reactivo para capturar los datos del domicilio del establecimiento.
   * Los valores iniciales se obtienen del estado actual de la solicitud.
   * Configura las validaciones necesarias para cada campo.
   * 
   * Campos configurados:
   * - codigoPostal: Campo requerido para el código postal
   * - estado: Campo requerido para seleccionar el estado
   * - descripcionMunicipio: Campo requerido para el municipio
   * - informacionExtra: Campo opcional para información adicional
   * - descripcionColonia: Campo opcional para la colonia
   * - calle: Campo requerido para el nombre de la calle
   * - lada: Campo opcional para el código de área
   * - telefono: Campo requerido para el número telefónico
   * - funcionamiento: Campo opcional para descripción del funcionamiento
   * - licencia: Campo requerido para el número de licencia
   * - regimen: Campo requerido para el régimen del establecimiento
   * - aduana: Campo requerido para la aduana asociada
   * 
   * @returns {void}
   * @see {@link FormBuilder.group}
   * @see {@link Validators.required}
   * @see {@link solicitudPermisoState}
   * @example
   * ```typescript
   * // El formulario se inicializa con valores del estado
   * this.inicializarFormularioDomicilioDelEstablecimiento();
   * 
   * // Verificar si un campo es válido
   * const codigoPostalValido = this.domicilloDelEstablecimientoForm.get('codigoPostal')?.valid;
   * ```
   */
  inicializarFormularioDomicilioDelEstablecimiento(): void {
    this.domicilloDelEstablecimientoForm = this.formBuilder.group({
      codigoPostal: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.codigoPostal,
        [Validators.required],
      ],
      estado: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.estado,
        [Validators.required],
      ],
      descripcionMunicipio: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.descripcionMunicipio,
        [Validators.required],
      ],
      informacionExtra: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.informacionExtra,
      ],
      descripcionColonia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.descripcionColonia,
      ],
      calle: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.calle,
        [Validators.required],
      ],
      lada: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.lada,
      ],
      telefono: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.telefono,
        [Validators.required],
      ],
      funcionamiento: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.funcionamiento,
      ],
      licencia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.licencia,
        [Validators.required],
      ],
      regimen: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.regimen,
        [Validators.required],
      ],
      aduana: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.aduana,
        [Validators.required],
      ],
    });
  }

  /**
   * Obtiene los datos de SCIAN (Sistema de Clasificación Industrial de América del Norte) desde el servicio.
   * Actualiza la propiedad 'scianDatos' con los datos obtenidos del servidor.
   * Utiliza el patrón takeUntil para evitar fugas de memoria al destruir el componente.
   * 
   * @returns {void}
   * @see {@link SolicitudPermisoService.obtenerScianData}
   * @see {@link scianDatos}
   * @see {@link destruirNotificacion$}
   * @example
   * ```typescript
   * // Llamar para actualizar los datos SCIAN
   * this.obtenerScianData();
   * 
   * // Verificar después de la carga
   * setTimeout(() => {
   *   console.log(`Datos SCIAN cargados: ${this.scianDatos.length} registros`);
   * }, 1000);
   * ```
   */
  obtenerScianData(): void {
    this.solicitudPermisoService
      .obtenerScianData()
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((data) => {
        this.scianDatos = data;
      });
  }

  /**
   * Obtiene los datos de la mercancía desde el servicio de solicitud de permiso.
   * Los datos obtenidos se asignan a la propiedad `mercanciaDatos`.
   * 
   * Este método utiliza un observable que se completa automáticamente al destruir el componente,
   * evitando posibles fugas de memoria mediante el patrón takeUntil.
   * 
   * Los datos incluyen información sobre:
   * - Clasificación de productos
   * - Denominaciones específicas
   * - Marcas comerciales
   * - Fracciones arancelarias
   * - Descripciones detalladas
   * 
   * @returns {void}
   * @see {@link SolicitudPermisoService.obtenerMercanciaData}
   * @see {@link mercanciaDatos}
   * @see {@link Mercancia}
   * @see {@link destruirNotificacion$}
   * @example
   * ```typescript
   * // Llamar para cargar datos de mercancías
   * this.obternerMercanciaData();
   * 
   * // Usar los datos después de la carga
   * setTimeout(() => {
   *   if (this.mercanciaDatos.length > 0) {
   *     console.log('Primera mercancía:', this.mercanciaDatos[0].denomiacionEspecifica);
   *   }
   * }, 500);
   * ```
   */
  obternerMercanciaData(): void {
    this.solicitudPermisoService
      .obtenerMercanciaData()
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((data) => {
        this.mercanciaDatos = data;
      });
  }

  /**
   * Actualiza el estado del formulario de domicilio del establecimiento en el store.
   * Obtiene el valor actual del campo especificado y lo persiste en el estado global.
   * 
   * Este método:
   * 1. Extrae el valor del campo del formulario
   * 2. Crea un objeto con la clave del campo y su valor
   * 3. Actualiza el store con el nuevo valor
   * 4. Mantiene la sincronización entre el formulario y el estado global
   * 
   * @param {string} campo - Nombre del campo del formulario a actualizar
   * @returns {void}
   * @see {@link Tramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento}
   * @see {@link domicilloDelEstablecimientoForm}
   * @example
   * ```typescript
   * // Actualizar el campo código postal en el store
   * this.setValoresStore('codigoPostal');
   * 
   * // Actualizar múltiples campos
   * ['estado', 'municipio', 'calle'].forEach(campo => {
   *   this.setValoresStore(campo);
   * });
   * ```
   */
  setValoresStore(campo: string): void {
    if (!this.domicilloDelEstablecimientoForm) {
      return;
    }
    const VALOR = this.domicilloDelEstablecimientoForm.get(campo)?.value;
    this.tramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento({
      [campo]: VALOR,
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   * 
   * Realiza las siguientes operaciones de limpieza:
   * 1. Emite una señal de finalización a todas las suscripciones activas
   * 2. Completa el subject destruirNotificacion$
   * 3. Libera los recursos utilizados por las suscripciones
   * 4. Previene fugas de memoria en la aplicación
   * 
   * @returns {void}
   * @see {@link destruirNotificacion$}
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al destruir el componente
   * component.ngOnDestroy();
   * 
   * // También se puede llamar manualmente si es necesario
   * this.ngOnDestroy();
   * ```
   */
  ngOnDestroy(): void {
    this.destruirNotificacion$.next();
    this.destruirNotificacion$.complete();
  }
}