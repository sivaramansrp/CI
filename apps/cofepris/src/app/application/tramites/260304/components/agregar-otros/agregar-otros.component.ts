import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  REGEX_NOMBRE,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  TERCEROS_NACIONALIDAD_RADIO_OPCIONS,
  TERCEROS_PERSONA_RADIO_OPCIONS,
} from '../../constants/medicamentos-contengan.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ExportacionMedicamentosContenganService } from '../../service/exportacion-medicamentos-contengan.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Location } from '@angular/common';
import { Otros } from '../../models/medicamentos-contengan.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

/**
 * @component AgregarOtrosComponent
 * @description
 * Componente encargado de gestionar el formulario para agregar o editar registros de "Otros".
 * Permite la selección de tipo de persona, nacionalidad y captura de información personal y de contacto.
 * Utiliza servicios para obtener catálogos y datos del backend, y actualiza el estado global del trámite.
 * 
 * @implements {OnInit} - Implementa el hook de inicialización del componente
 * @implements {OnDestroy} - Implementa el hook de destrucción del componente para limpieza de recursos
 * 
 * @author Sistema VUCEM 3.0
 * @since 2025
 * @version 1.0.0
 */
@Component({
  selector: 'app-agregar-otros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './agregar-otros.component.html',
  styleUrl: './agregar-otros.component.scss',
})
export class AgregarOtrosComponent implements OnInit, OnDestroy {
  /**
   * @property {typeof TipoPersona} tipoPersona
   * @description 
   * Referencia al enum `TipoPersona` que contiene los tipos de persona disponibles:
   * - FISICA: Persona física
   * - MORAL: Persona moral
   * - NO_CONTRIBUYENTE: No contribuyente
   * 
   * Se utiliza en el template para comparaciones y validaciones de tipo de persona.
   * 
   * @public
   * @readonly
   * @example
   * ```typescript
   * if (this.agregarDatosForm.value.tipoPersona === this.tipoPersona.FISICA) {
   *   // Lógica para persona física
   * }
   * ```
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {Subject<void>} unsubscribe$
   * @description 
   * Subject utilizado para manejar la cancelación de suscripciones RxJS de forma centralizada.
   * Evita fugas de memoria al cancelar todas las suscripciones activas cuando el componente se destruye.
   * 
   * Se emite un valor en `ngOnDestroy()` para notificar a todas las suscripciones que deben completarse.
   * 
   * @private
   * @readonly
   * @example
   * ```typescript
   * this.servicio.obtenerDatos()
   *   .pipe(takeUntil(this.unsubscribe$))
   *   .subscribe(data => {
   *     // Procesamiento de datos
   *   });
   * ```
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Facturador[]} datos
   * @description 
   * Arreglo que almacena los registros de facturadores capturados en el formulario.
   * Contiene la información completa de cada facturador incluyendo datos personales,
   * de contacto y dirección.
   * 
   * @public
   * @default []
   * @example
   * ```typescript
   * this.datos.push(nuevoFacturador);
   * console.log(`Total de facturadores: ${this.datos.length}`);
   * ```
   */
  datos: Facturador[] = [];

  /**
   * @property {FormGroup} agregarDatosForm
   * @description 
   * Formulario reactivo principal del componente que contiene todos los campos necesarios
   * para capturar la información de "Otros" (terceros relacionados).
   * 
   * Incluye los siguientes campos:
   * - Información personal: nombres, apellidos, CURP, RFC
   * - Información de contacto: teléfono, correo electrónico
   * - Información de dirección: país, estado, ciudad, código postal, etc.
   * - Configuración: tipo de persona, nacionalidad
   * 
   * @public
   * @type {FormGroup}
   * @example
   * ```typescript
   * if (this.agregarDatosForm.valid) {
   *   const datosFormulario = this.agregarDatosForm.getRawValue();
   * }
   * ```
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * @description 
   * Lista de países obtenida del servicio de datos, utilizada para poblar
   * el selector de países en el formulario.
   * 
   * Cada elemento del catálogo contiene:
   * - id: Identificador único del país
   * - nombre: Nombre del país
   * - codigo: Código del país (opcional)
   * 
   * @public
   * @type {Catalogo[]}
   * @default []
   * @example
   * ```typescript
   * const paisSeleccionado = this.paisesDatos.find(pais => pais.id === paisId);
   * ```
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @property {any[]} radioOpcions
   * @description 
   * Opciones de radio button para seleccionar la nacionalidad del tercero.
   * Contiene las opciones disponibles como "Nacional" y "Extranjero".
   * 
   * Cada opción incluye:
   * - label: Etiqueta mostrada al usuario
   * - value: Valor asociado a la opción
   * - hint: Texto de ayuda (opcional)
   * 
   * @public
   * @type {any[]}
   * @readonly
   * @example
   * ```html
   * <app-input-radio 
   *   [opciones]="radioOpcions"
   *   formControlName="nacionalidad">
   * </app-input-radio>
   * ```
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {any[]} tipoPersonaRadioOpcions
   * @description 
   * Opciones de radio button para seleccionar el tipo de persona.
   * Las opciones disponibles varían según la nacionalidad:
   * - Para nacionales: Física, Moral, No Contribuyente
   * - Para extranjeros: Física, Moral
   * 
   * Se modifica dinámicamente agregando o removiendo la opción "No Contribuyente"
   * según corresponda.
   * 
   * @public
   * @type {any[]}
   * @example
   * ```typescript
   * // Agregar opción No Contribuyente
   * this.tipoPersonaRadioOpcions.push({
   *   label: 'No Contribuyente',
   *   value: TipoPersona.NO_CONTRIBUYENTE
   * });
   * ```
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @property {Otros} datoSeleccionado
   * @description 
   * Almacena el registro de "Otros" que ha sido seleccionado para edición.
   * Cuando se está editando un registro existente, este objeto contiene
   * todos los datos previamente capturados.
   * 
   * Se utiliza para:
   * - Pre-poblar el formulario en modo edición
   * - Mantener referencia al registro original
   * - Comparar cambios realizados
   * 
   * @public
   * @type {Otros}
   * @example
   * ```typescript
   * if (this.datoSeleccionado?.id) {
   *   // Modo edición
   *   this.agregarDatosForm.patchValue(this.datoSeleccionado);
   * }
   * ```
   */
  public datoSeleccionado!: Otros;

  /**
   * @constructor
   * @description
   * Constructor del componente que inicializa las dependencias necesarias y configura
   * el estado inicial del formulario.
   * 
   * Realiza las siguientes acciones durante la inicialización:
   * - Crea el formulario reactivo con sus validaciones
   * - Configura el comportamiento inicial de nacionalidad
   * - Inyecta todos los servicios necesarios para el funcionamiento del componente
   * 
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular para crear y gestionar FormGroups
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener catálogos y datos del backend
   * @param {Location} ubicaccion - Servicio de Angular para navegación y control del historial del navegador
   * @param {Tramite260304Store} tramiteStore - Store de estado que administra los datos del trámite 260304
   * @param {ExportacionMedicamentosContenganService} exportacionMateriasPrimasService - Servicio específico para operaciones de exportación de medicamentos
   * @param {Tramite260304Query} tramiteQuery - Servicio de consulta para acceder al estado del trámite de forma reactiva
   * 
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // El constructor se ejecuta automáticamente al crear una instancia del componente
   * const component = new AgregarOtrosComponent(fb, service, location, store, exportService, query);
   * ```
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private tramiteStore: Tramite260304Store,
    private exportacionMateriasPrimasService: ExportacionMedicamentosContenganService,
    private tramiteQuery: Tramite260304Query
  ) {
    this.crearFormulario();
    this.changeNacionalidad();
  }

  /**
   * @method crearFormulario
   * @description
   * Crea y configura el formulario reactivo con todos los campos necesarios para capturar
   * la información de terceros relacionados. Define las validaciones específicas para cada campo
   * y establece los valores iniciales basados en datos previamente seleccionados.
   * 
   * Campos del formulario:
   * - **Identificación**: CURP, RFC, nombre/descripción
   * - **Configuración**: nacionalidad, tipo de persona
   * - **Datos personales**: nombres, apellidos, razón social
   * - **Ubicación**: país, estado, código postal, colonia, calle, números
   * - **Contacto**: teléfono con lada, correo electrónico
   * - **Ubicación específica**: localidad, municipio/alcaldía
   * 
   * **Validaciones aplicadas:**
   * - Campos requeridos: RFC, nombre, tipo de persona, nombres, apellidos, país, etc.
   * - Patrones regex: RFC, nombres y apellidos (solo caracteres válidos)
   * - Formato de email: correo electrónico
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente en el constructor y al seleccionar datos
   * this.crearFormulario();
   * console.log(this.agregarDatosForm.valid); // Verifica si el formulario es válido
   * ```
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      curp: [this.obtenerValor('curp')],
      rfc: [this.obtenerValor('rfc'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      nombreDescripcion: [this.obtenerValor('nombreDescripcion'), [Validators.required]],
      nacionalidad: ['true'],
      tipoPersona: ['', Validators.required],
      nombres: [this.obtenerValor('nombres'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      primerApellido: [this.obtenerValor('primerApellido'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      segundoApellido: [this.obtenerValor('segundoApellido'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [this.obtenerValor('estadoLocalidad'), Validators.required],
      codigoPostal: [this.obtenerValor('codigoPostal'), Validators.required],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [this.obtenerValor('numeroExterior'), Validators.required],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [this.obtenerValor('telefono')],
      correoElectronico: [this.obtenerValor('correoElectronico'), [Validators.required, Validators.email]],
      localidad: [this.obtenerValor('localidad')],
      municipioAlcaldia: [this.obtenerValor('municipioAlcaldia')],
      razonSocial: [this.obtenerValor('razonSocial'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
    });
  }

  /**
   * @method ngOnInit
   * @description
   * Hook del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
   * Realiza la configuración inicial necesaria para el funcionamiento del componente.
   * 
   * **Acciones realizadas:**
   * 1. **Carga de datos**: Obtiene catálogos necesarios (países, estados, etc.)
   * 2. **Suscripción a datos seleccionados**: Escucha cambios en el store para datos de "Otros" seleccionados
   * 3. **Actualización de formulario**: Reconfigura el formulario cuando se seleccionan datos para edición
   * 4. **Configuración de nacionalidad**: Aplica las reglas de habilitación/deshabilitación de campos
   * 
   * **Gestión de suscripciones:**
   * Utiliza el operador `takeUntil` con `unsubscribe$` para evitar fugas de memoria
   * al cancelar automáticamente las suscripciones cuando el componente se destruye.
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @implements {OnInit}
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente por Angular
   * // No se debe llamar manualmente
   * ```
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.tramiteQuery.getOtrosSeleccionado$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.datoSeleccionado = seccionState?.[0] ?? ({} as Otros);
          this.crearFormulario();
          this.changeNacionalidad();
        })
      )
      .subscribe();
  }

  /**
   * @method obtenerValor
   * @description
   * Método utilitario que obtiene de forma segura el valor de un campo específico
   * desde el objeto `datoSeleccionado`. Se utiliza principalmente durante la inicialización
   * del formulario para pre-poblar los campos con datos existentes.
   * 
   * **Funcionalidad:**
   * - Acceso seguro a propiedades del objeto (evita errores de propiedades undefined)
   * - Retorna cadena vacía como valor por defecto si no existe el dato
   * - Soporte para diferentes tipos de datos (string, number, arrays)
   * 
   * **Casos de uso:**
   * - Modo edición: Carga datos existentes al formulario
   * - Modo creación: Retorna valores vacíos para campos nuevos
   * - Persistencia de datos: Mantiene valores durante la navegación
   * 
   * @param {keyof Otros} field - Nombre del campo/propiedad a obtener del objeto Otros
   * @returns {string | number | undefined | string[]} Valor del campo especificado o cadena vacía por defecto
   * 
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Obtener nombre para pre-poblar el formulario
   * const nombre = this.obtenerValor('nombres'); // "Juan" o ""
   * 
   * // Obtener RFC para validación
   * const rfc = this.obtenerValor('rfc'); // "ABC123456789" o ""
   * 
   * // Usar en la creación del formulario
   * nombres: [this.obtenerValor('nombres'), Validators.required]
   * ```
   */
  public obtenerValor(field: keyof Otros): string | number | undefined | string[] {
    return this.datoSeleccionado?.[field as keyof Otros] ?? '';
  }

  /**
   * @method cargarDatos
   * @description
   * Carga los catálogos necesarios para el funcionamiento del formulario, específicamente
   * la lista de países que se utiliza en el selector de país.
   * 
   * **Proceso de carga:**
   * 1. Realiza petición HTTP al servicio de datos de solicitud
   * 2. Obtiene el catálogo completo de países disponibles
   * 3. Almacena los datos en la propiedad `paisesDatos` para uso en el template
   * 4. Maneja automáticamente la cancelación de suscripción para evitar fugas de memoria
   * 
   * **Gestión de errores:**
   * Los errores se manejan automáticamente por el servicio de datos.
   * En caso de error, `paisesDatos` mantiene su valor inicial (arreglo vacío).
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente en ngOnInit
   * this.cargarDatos();
   * 
   * // Después de la carga exitosa
   * console.log(this.paisesDatos.length); // Número de países disponibles
   * ```
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  /**
   * @method limpiarFormulario
   * @description
   * Restaura el formulario a su estado inicial limpio, eliminando todos los valores
   * ingresados por el usuario y restableciendo las opciones de tipo de persona.
   * 
   * **Acciones realizadas:**
   * 1. **Filtrado de opciones**: Remueve la opción "No Contribuyente" del selector de tipo de persona
   * 2. **Reset del formulario**: Limpia todos los campos y restablece validaciones
   * 3. **Estado inicial**: Deja el formulario listo para nueva captura de datos
   * 
   * **Casos de uso:**
   * - Preparar formulario para nuevo registro
   * - Limpiar datos después de guardar exitosamente
   * - Resetear estado cuando se cambia el contexto de uso
   * 
   * **Nota importante:**
   * Este método no afecta las suscripciones activas ni los catálogos cargados,
   * solo limpia los datos del formulario y las opciones dinámicas.
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Limpiar después de guardar
   * this.guardarDatos();
   * this.limpiarFormulario();
   * 
   * // Verificar estado del formulario
   * console.log(this.agregarDatosForm.pristine); // true
   * ```
   */
  limpiarFormulario(): void {
    this.tipoPersonaRadioOpcions = this.tipoPersonaRadioOpcions.filter(
      (item) => item.value !== TipoPersona.NO_CONTRIBUYENTE
    );
    this.agregarDatosForm.reset();
  }

  /**
   * @method cancelar
   * @description
   * Maneja la acción de cancelación del usuario, navegando de regreso a la vista anterior
   * sin guardar los cambios realizados en el formulario.
   * 
   * **Funcionalidad:**
   * - Utiliza el servicio `Location` de Angular para navegar hacia atrás en el historial
   * - Equivale a presionar el botón "Atrás" del navegador
   * - No persiste ningún cambio realizado en el formulario
   * - Mantiene el estado de la aplicación anterior
   * 
   * **Casos de uso:**
   * - Usuario desea descartar cambios no guardados
   * - Navegación de regreso después de completar una acción
   * - Cancelación de operaciones de edición
   * 
   * **Consideraciones:**
   * - Los datos no guardados se perderán permanentemente
   * - No se realiza confirmación antes de la navegación
   * - El historial del navegador se preserva correctamente
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Llamada desde el template
   * <button (click)="cancelar()" class="btn-cancelar">
   *   Cancelar
   * </button>
   * 
   * // Programáticamente
   * if (debesCancelar) {
   *   this.cancelar();
   * }
   * ```
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * @method obtenerNuevoValorFormulario
   * @description
   * Construye y retorna un objeto `Otros` completo basado en los valores actuales del formulario,
   * aplicando lógica de negocio específica para generar el nombre o razón social según el tipo de persona.
   * 
   * **Lógica de procesamiento:**
   * 
   * **Para Persona Moral:**
   * - Utiliza el campo `denominacionRazon` como nombre principal
   * - Aplica para empresas, organizaciones y entidades corporativas
   * 
   * **Para Persona Física:**
   * - Concatena: `nombres + primerApellido + segundoApellido`
   * - Maneja automáticamente espacios y apellidos opcionales
   * - Aplica trim() para eliminar espacios extras
   * 
   * **Para otros tipos:**
   * - Asigna cadena vacía por defecto
   * - Permite manejo de casos especiales futuros
   * 
   * **Transformación de datos:**
   * - Mantiene todos los campos originales del formulario
   * - Agrega el campo calculado `nombreRazonSocial`
   * - Preserva la estructura del objeto `Otros`
   * 
   * @returns {Otros} Objeto completo con todos los datos del formulario más el nombre/razón social calculado
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Para persona física
   * // Formulario: { nombres: "Juan", primerApellido: "Pérez", segundoApellido: "López" }
   * const datos = this.obtenerNuevoValorFormulario();
   * console.log(datos.nombreRazonSocial); // "Juan Pérez López"
   * 
   * // Para persona moral
   * // Formulario: { denominacionRazon: "ACME Corporation S.A. de C.V." }
   * const datos = this.obtenerNuevoValorFormulario();
   * console.log(datos.nombreRazonSocial); // "ACME Corporation S.A. de C.V."
   * ```
   */
  obtenerNuevoValorFormulario(): Otros {
    const VALOR_FORMULARIO = this.agregarDatosForm.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${VALOR_FORMULARIO.primerApellido} ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = '';
    }

    // 👇 Se reemplaza únicamente el nombreRazonSocial, manteniendo el resto del objeto igual.
    const NUEVO_VALOR_FORMULARIO = {
      ...VALOR_FORMULARIO,
      nombreRazonSocial: nombreRazonSocial,
    };

    return NUEVO_VALOR_FORMULARIO;
  }

  /**
   * @method guardar
   * @description
   * Persiste los datos capturados en el formulario y navega de regreso a la vista anterior.
   * Es el método principal para confirmar y almacenar la información de terceros relacionados.
   * 
   * **Proceso de guardado:**
   * 1. **Obtención de datos**: Recopila y procesa todos los valores del formulario
   * 2. **Transformación**: Aplica lógica de negocio (nombre/razón social calculado)
   * 3. **Persistencia**: Actualiza el estado global del trámite en el store
   * 4. **Navegación**: Regresa automáticamente a la vista anterior
   * 
   * **Actualización del estado:**
   * - Utiliza el store de estado para mantener consistencia global
   * - Los datos se agregan a la tabla de "Otros" del trámite
   * - El estado se sincroniza con otros componentes de la aplicación
   * 
   * **Flujo de usuario:**
   * - Se ejecuta cuando el usuario confirma sus datos
   * - No requiere validación adicional (se asume formulario válido)
   * - Proporciona feedback inmediato mediante navegación
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Llamada desde el template
   * <button (click)="guardar()" [disabled]="!agregarDatosForm.valid">
   *   Guardar
   * </button>
   * 
   * // Guardado condicional
   * if (this.agregarDatosForm.valid) {
   *   this.guardar();
   * }
   * ```
   */
  guardar(): void {
    this.tramiteStore.updateOtrosTablaDatos([
      this.obtenerNuevoValorFormulario(),
    ]);
    this.ubicaccion.back();
  }

  /**
   * @method changeNacionalidad
   * @description
   * Gestiona dinámicamente el estado de habilitación/deshabilitación de los campos del formulario
   * basado en la nacionalidad seleccionada, aplicando reglas de negocio específicas para cada caso.
   * 
   * **Lógica para extranjeros (nacionalidad !== 'true'):**
   * - **Formulario**: Todos los campos habilitados para captura completa
   * - **Tipo de persona**: Solo opciones "Física" y "Moral" disponibles
   * - **Identificación**: Todos los campos de identificación requeridos
   * 
   * **Lógica para nacionales (nacionalidad === 'true'):**
   * - **Formulario base**: Todos los campos deshabilitados inicialmente
   * - **Campos siempre habilitados**: nacionalidad, tipoPersona, nombreDescripcion, rfc, curp
   * - **Tipo de persona**: Incluye opción "No Contribuyente" adicional
   * 
   * **Reglas especiales para nacionales:**
   * - **No Contribuyente**: CURP habilitado, RFC deshabilitado
   * - **Física/Moral**: CURP deshabilitado, RFC habilitado
   * 
   * **Gestión de opciones dinámicas:**
   * - Agrega/remueve automáticamente la opción "No Contribuyente"
   * - Mantiene consistencia en las opciones disponibles
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al cambiar nacionalidad
   * this.agregarDatosForm.get('nacionalidad')?.valueChanges.subscribe(() => {
   *   this.changeNacionalidad();
   * });
   * 
   * // Estado después del cambio para extranjero
   * console.log(this.agregarDatosForm.enabled); // true (todos los campos)
   * 
   * // Estado después del cambio para nacional
   * console.log(this.agregarDatosForm.get('nombres')?.disabled); // true
   * console.log(this.agregarDatosForm.get('rfc')?.enabled); // true
   * ```
   */
  changeNacionalidad(): void {
    if (this.agregarDatosForm?.value?.nacionalidad !== 'true') {
      this.agregarDatosForm.enable();
      this.alternarOpcionNoContribuyente(false);
    } else {
      this.agregarDatosForm.disable();
      this.agregarDatosForm.get('nacionalidad')?.enable();
      this.agregarDatosForm.get('tipoPersona')?.enable();
      this.agregarDatosForm.get('nombreDescripcion')?.enable();
      this.agregarDatosForm.get('rfc')?.enable();
      this.agregarDatosForm.get('curp')?.enable();
      if (
        this.agregarDatosForm.value.tipoPersona !==
        this.tipoPersona.NO_CONTRIBUYENTE
      ) {
        this.agregarDatosForm.get('curp')?.disable();
      } else {
        this.agregarDatosForm.get('curp')?.enable();
        this.agregarDatosForm.get('rfc')?.disable();
      }
      this.alternarOpcionNoContribuyente(true);
    }
  }

  /**
   * @method alternarOpcionNoContribuyente
   * @description
   * Gestiona dinámicamente la disponibilidad de la opción "No Contribuyente" en el selector
   * de tipo de persona, agregándola o removiéndola según las reglas de negocio establecidas.
   * 
   * **Funcionalidad:**
   * - **Agregar opción**: Cuando se requiere para usuarios nacionales
   * - **Remover opción**: Cuando no aplica para usuarios extranjeros
   * - **Prevención de duplicados**: Verifica existencia antes de agregar
   * - **Búsqueda segura**: Localiza la opción por valor antes de remover
   * 
   * **Estructura de la opción:**
   * ```typescript
   * {
   *   label: "NO_CONTRIBUYENTE",     // Etiqueta para identificación
   *   value: "NO_CONTRIBUYENTE",     // Valor del enum TipoPersona
   *   hint: "No contribuyente"       // Texto de ayuda para el usuario
   * }
   * ```
   * 
   * **Casos de uso:**
   * - Nacionalidad mexicana: Incluir opción "No Contribuyente"
   * - Nacionalidad extranjera: Excluir opción "No Contribuyente"
   * - Cambios dinámicos: Responder a modificaciones de nacionalidad
   * 
   * **Validación de estado:**
   * - Verifica si la opción ya existe antes de agregarla
   * - Confirma la existencia antes de intentar removerla
   * - Mantiene la integridad del arreglo de opciones
   * 
   * @param {boolean} debeAgregar - Indica si la opción debe agregarse (true) o removerse (false)
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Agregar opción para nacionales
   * this.alternarOpcionNoContribuyente(true);
   * console.log(this.tipoPersonaRadioOpcions.length); // +1 opción
   * 
   * // Remover opción para extranjeros
   * this.alternarOpcionNoContribuyente(false);
   * console.log(this.tipoPersonaRadioOpcions.length); // -1 opción
   * 
   * // Verificar disponibilidad
   * const tieneNoContribuyente = this.tipoPersonaRadioOpcions.some(
   *   op => op.value === TipoPersona.NO_CONTRIBUYENTE
   * );
   * ```
   */
  alternarOpcionNoContribuyente(debeAgregar: boolean): void {
    const NO_CONTRIBUYENTE = {
      label: TipoPersona.NO_CONTRIBUYENTE,
      value: TipoPersona.NO_CONTRIBUYENTE,
      hint: 'No contribuyente'
    };
    const INDICE = this.tipoPersonaRadioOpcions.findIndex(
      opcion => opcion.value === TipoPersona.NO_CONTRIBUYENTE
    );

    if (debeAgregar && INDICE === -1) {
      this.tipoPersonaRadioOpcions.push(NO_CONTRIBUYENTE);
    } else if (!debeAgregar && INDICE !== -1) {
      this.tipoPersonaRadioOpcions.splice(INDICE, 1);
    }
  }

  /**
   * @method seBuscaRfc
   * @description
   * Ejecuta una búsqueda automatizada para obtener y poblar datos de terceros relacionados
   * basándose en información de identificación (RFC/CURP). Simula la integración con
   * servicios externos de consulta de datos fiscales.
   * 
   * **Proceso de búsqueda:**
   * 1. **Consulta al servicio**: Obtiene datos de "Otros" desde el backend
   * 2. **Actualización del formulario**: Aplica los datos obtenidos usando `patchValue`
   * 3. **Validación cruzada**: Ajusta campos RFC/CURP según disponibilidad
   * 4. **Valores por defecto**: Asigna valores simulados cuando corresponde
   * 
   * **Lógica de completado automático:**
   * - **Si CURP existe y RFC está deshabilitado**: Asigna RFC simulado ("RFC78900")
   * - **Si RFC existe y CURP está deshabilitado**: Asigna CURP simulado ("CURP8888")
   * - **Demás campos**: Se actualizan con los datos obtenidos del servicio
   * 
   * **Casos de uso:**
   * - Autocompletado de datos fiscales conocidos
   * - Validación de información de terceros
   * - Reducción de captura manual de datos
   * - Consistencia con bases de datos oficiales
   * 
   * **Gestión de errores:**
   * Las suscripciones se cancelan automáticamente para evitar fugas de memoria.
   * Los errores del servicio se manejan de forma transparente al usuario.
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Llamada desde el template
   * <button (click)="seBuscaRfc()" class="btn-buscar">
   *   Buscar RFC
   * </button>
   * 
   * // Después de la búsqueda exitosa
   * console.log(this.agregarDatosForm.get('rfc')?.value); // "RFC78900" o dato real
   * console.log(this.agregarDatosForm.get('nombres')?.value); // Nombre obtenido
   * ```
   */
  seBuscaRfc(): void {
    this.exportacionMateriasPrimasService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.agregarDatosForm.patchValue(data);
        if (this.agregarDatosForm.get('curp')?.value !== null && this.agregarDatosForm.get('rfc')?.disabled) {
          this.agregarDatosForm.get('rfc')?.setValue('RFC78900');
        }
        if (this.agregarDatosForm.get('rfc')?.value !== null && this.agregarDatosForm.get('curp')?.disabled) {
          this.agregarDatosForm.get('curp')?.setValue('CURP8888');
        }
      });
  }

  /**
   * @method esInvalido
   * @description
   * Método utilitario para validación visual que determina si un campo específico del formulario
   * debe mostrar indicadores de error al usuario. Implementa la lógica estándar de validación
   * de Angular Forms para mejorar la experiencia del usuario.
   * 
   * **Condiciones para mostrar error:**
   * 1. **Campo inválido**: No cumple con las validaciones definidas (required, pattern, email, etc.)
   * 2. **Campo tocado**: El usuario ha interactuado con el campo (focus/blur)
   * 3. **Campo modificado**: El usuario ha realizado cambios en el valor original
   * 
   * **Estados de validación evaluados:**
   * - `invalid`: Validaciones de formulario fallidas
   * - `touched`: Campo ha recibido y perdido el foco
   * - `dirty`: Valor del campo ha sido modificado
   * 
   * **Casos de uso:**
   * - Mostrar/ocultar mensajes de error en tiempo real
   * - Aplicar estilos visuales de error (bordes rojos, iconos, etc.)
   * - Mejorar retroalimentación inmediata al usuario
   * - Implementar validación progresiva
   * 
   * **Seguridad:**
   * Incluye verificación de existencia del control para evitar errores de runtime
   * cuando se referencia un campo que no existe en el formulario.
   * 
   * @param {string} nombreControl - Nombre del campo/control del formulario a validar
   * @returns {boolean} `true` si el campo debe mostrar estado de error, `false` en caso contrario
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Uso en el template
   * <input 
   *   formControlName="rfc"
   *   [class.error]="esInvalido('rfc')"
   * />
   * <div *ngIf="esInvalido('rfc')" class="error-message">
   *   RFC es requerido y debe tener formato válido
   * </div>
   * 
   * // Uso programático
   * if (this.esInvalido('correoElectronico')) {
   *   this.mostrarTooltipError('Formato de email inválido');
   * }
   * 
   * // Validación de múltiples campos
   * const camposConError = ['rfc', 'nombres', 'correoElectronico']
   *   .filter(campo => this.esInvalido(campo));
   * ```
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarDatosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook del ciclo de vida de Angular que se ejecuta cuando el componente está a punto de ser destruido.
   * Implementa el patrón de limpieza de recursos para prevenir fugas de memoria y comportamientos inesperados.
   * 
   * **Proceso de limpieza:**
   * 1. **Emisión de señal**: Envía valor a través del Subject `unsubscribe$`
   * 2. **Cancelación de suscripciones**: Todas las suscripciones activas que usan `takeUntil(this.unsubscribe$)` se cancelan automáticamente
   * 3. **Completado del Subject**: Marca el Subject como completado para liberar recursos
   * 
   * **Suscripciones gestionadas:**
   * - Consulta de datos seleccionados desde el store (`tramiteQuery.getOtrosSeleccionado$`)
   * - Carga de catálogos de países (`datosSolicitudService.obtenerListaPaises()`)
   * - Búsqueda de datos RFC (`exportacionMateriasPrimasService.obtenerOstro()`)
   * 
   * **Beneficios de esta implementación:**
   * - **Prevención de memory leaks**: Evita acumulación de suscripciones activas
   * - **Mejor rendimiento**: Libera recursos de memoria no utilizados
   * - **Estabilidad**: Previene efectos secundarios de observables activos
   * - **Buenas prácticas**: Sigue patrones estándar de Angular
   * 
   * **Patrón utilizado:**
   * Este método implementa el patrón "takeUntil" recomendado por la comunidad Angular
   * para gestión centralizada de suscripciones RxJS.
   * 
   * @returns {void}
   * @memberof AgregarOtrosComponent
   * @implements {OnDestroy}
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Angular ejecuta este método automáticamente
   * // No requiere llamada manual
   * 
   * // Las suscripciones se configuran con:
   * this.servicio.obtenerDatos()
   *   .pipe(takeUntil(this.unsubscribe$)) // 👈 Se cancelará en ngOnDestroy
   *   .subscribe(data => {
   *     // Procesamiento de datos
   *   });
   * ```
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}