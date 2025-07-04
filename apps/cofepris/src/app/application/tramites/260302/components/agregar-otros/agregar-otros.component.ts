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
} from '../../constants/exporticon-estupefacientes.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ExportacionMateriasPrimasService } from '../../service/exportacion-materias-primas.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Location } from '@angular/common';
import { Otros } from '../../models/exporticon-estupefacientes.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

/**
 * @class AgregarOtrosComponent
 * @description 
 * Componente Angular standalone que permite agregar y gestionar datos de "otros" relacionados
 * en el trámite 260302 de exportación de estupefacientes. Este componente proporciona un formulario
 * reactivo para capturar información personal, fiscal y de contacto de terceros relacionados.
 * 
 * Funcionalidades principales:
 * - Captura de datos personales (nombres, apellidos, CURP, RFC)
 * - Gestión de información de contacto (teléfono, email, dirección)
 * - Manejo dinámico de nacionalidad (mexicana/extranjera)
 * - Validación de formularios con Angular Reactive Forms
 * - Integración con el estado global del trámite mediante Akita
 * 
 * @implements {OnInit} Implementa el hook de inicialización del componente
 * @implements {OnDestroy} Implementa el hook de destrucción para limpieza de suscripciones
 * 
 * @author Sistema VUCEM 3.0
 * @version 1.0
 * @since 2025
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
   * Referencia al enum `TipoPersona` que permite acceder a los tipos de persona disponibles
   * en el sistema (FISICA, MORAL, NO_CONTRIBUYENTE). Se utiliza para comparaciones y
   * validaciones en el formulario.
   * 
   * @readonly
   * @public
   * @example
   * if (this.formulario.tipoPersona === this.tipoPersona.FISICA) {
   *   // Lógica para persona física
   * }
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {Subject<void>} unsubscribe$
   * @description 
   * Subject utilizado para manejar la cancelación de suscripciones activas y prevenir
   * fugas de memoria. Se completa automáticamente en el hook `ngOnDestroy` y todas
   * las suscripciones que utilicen `takeUntil(this.unsubscribe$)` serán canceladas.
   * 
   * @private
   * @readonly
   * @example
   * this.servicio.getData()
   *   .pipe(takeUntil(this.unsubscribe$))
   *   .subscribe(data => { ... });
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Facturador[]} datos
   * @description 
   * Arreglo que almacena temporalmente los datos de facturadores capturados en el formulario.
   * Se utiliza como estructura de datos auxiliar para el manejo de la información antes
   * de ser procesada y almacenada en el estado global del trámite.
   * 
   * @public
   * @default []
   */
  datos: Facturador[] = [];

  /**
   * @property {FormGroup} agregarDatosForm
   * @description 
   * Formulario reactivo principal del componente que contiene todos los campos necesarios
   * para capturar la información de terceros relacionados. Incluye validaciones automáticas
   * y manejo dinámico de habilitación/deshabilitación de campos según el contexto.
   * 
   * Campos incluidos:
   * - Información personal: nombres, apellidos, CURP, RFC
   * - Datos fiscales: tipo de persona, nacionalidad, razón social
   * - Información de contacto: teléfono, email
   * - Dirección: país, estado, ciudad, código postal, etc.
   * 
   * @public
   * @type {FormGroup}
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * @description 
   * Lista de países obtenida del servicio de datos que se utiliza para poblar
   * el campo de selección de país en el formulario. Se carga automáticamente
   * al inicializar el componente.
   * 
   * @public
   * @default []
   * @example
   * // Los datos se cargan desde el servicio:
   * // [{ id: 1, nombre: "México" }, { id: 2, nombre: "Estados Unidos" }, ...]
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @property {any[]} radioOpcions
   * @description 
   * Opciones de radio buttons para la selección de nacionalidad del tercero relacionado.
   * Contiene las opciones predefinidas desde las constantes del módulo que permiten
   * al usuario seleccionar entre nacionalidad mexicana o extranjera.
   * 
   * @public
   * @readonly
   * @default TERCEROS_NACIONALIDAD_RADIO_OPCIONS
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {any[]} tipoPersonaRadioOpcions
   * @description 
   * Opciones de radio buttons para la selección del tipo de persona (física, moral, no contribuyente).
   * Esta propiedad es dinámica y puede modificarse según el contexto de nacionalidad.
   * La opción "No Contribuyente" se agrega o remueve dinámicamente según las reglas de negocio.
   * 
   * @public
   * @default TERCEROS_PERSONA_RADIO_OPCIONS
   * @example
   * // Valores típicos:
   * // [{ label: "Física", value: "FISICA" }, { label: "Moral", value: "MORAL" }]
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @property {Otros} datoSeleccionado
   * @description 
   * Almacena los datos del registro "otros" que ha sido seleccionado para edición.
   * Se inicializa desde el estado global del trámite y se utiliza para pre-poblar
   * el formulario cuando se está editando un registro existente en lugar de crear uno nuevo.
   * 
   * @public
   * @type {Otros}
   * @example
   * // Se asigna desde el store:
   * this.datoSeleccionado = { id: 1, nombres: "Juan", rfc: "JUAN123456" };
   */
  public datoSeleccionado!: Otros;



  /**
   * @constructor
   * @description 
   * Constructor del componente que inicializa todas las dependencias necesarias para
   * el funcionamiento del formulario de agregación de datos de terceros relacionados.
   * Automáticamente crea el formulario reactivo y configura el estado inicial de nacionalidad.
   * 
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular para crear y gestionar el FormGroup
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener catálogos y datos del backend (países, estados, etc.)
   * @param {Location} ubicaccion - Servicio de Angular para navegación hacia atrás en el historial del navegador
   * @param {Tramite260302Store} tramiteStore - Store de Akita para gestionar el estado global del trámite 260302
   * @param {ExportacionMateriasPrimasService} exportacionMateriasPrimasService - Servicio específico para operaciones de exportación de materias primas
   * @param {Tramite260302Query} tramiteQuery - Query de Akita para consultar el estado actual del trámite y reaccionar a cambios
   * 
   * @example
   * // El constructor se ejecuta automáticamente al instanciar el componente
   * // Angular inyecta todas las dependencias necesarias
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private tramiteStore: Tramite260302Store,
    private exportacionMateriasPrimasService: ExportacionMateriasPrimasService,
    private tramiteQuery: Tramite260302Query
  ) {
    this.crearFormulario();
    this.changeNacionalidad();
  }

  /**
   * @method crearFormulario
   * @description 
   * Crea y configura el formulario reactivo con todos los campos necesarios para capturar
   * la información de terceros relacionados. Define las validaciones específicas para cada campo
   * y establece los valores iniciales basados en los datos seleccionados (si existen).
   * 
   * Campos del formulario:
   * - curp: CURP de la persona (requerido)
   * - rfc: RFC fiscal (requerido, con patrón de validación)
   * - nombreDescripcion: Descripción o nombre del tercero (requerido)
   * - nacionalidad: Tipo de nacionalidad (mexicana/extranjera)
   * - tipoPersona: Física, moral o no contribuyente (requerido)
   * - nombres: Nombres de la persona física (requerido con patrón)
   * - primerApellido: Primer apellido (requerido con patrón)
   * - segundoApellido: Segundo apellido (requerido con patrón)
   * - Campos de dirección: país, estado, código postal, colonia, calle, números
   * - Contacto: teléfono, email (con validación de email)
   * - razonSocial: Para personas morales (requerido con patrón)
   * 
   * @returns {void}
   * @private
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      curp: [this.obtenerValor('curp'),[Validators.required]],
      rfc: [this.obtenerValor('rfc'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      nombreDescripcion: [this.obtenerValor('nombreDescripcion'),[Validators.required]],
      nacionalidad: ['true'],
      tipoPersona: ['', Validators.required],
      nombres: [this.obtenerValor('nombres'), [Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      primerApellido: [
        this.obtenerValor('primerApellido'),
        [Validators.required,Validators.pattern(REGEX_NOMBRE)]
      ],
      segundoApellido: [this.obtenerValor('segundoApellido'),[Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [this.obtenerValor('estadoLocalidad'), Validators.required],
      codigoPostal: [this.obtenerValor('codigoPostal'), Validators.required],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [
        this.obtenerValor('numeroExterior'),
        Validators.required,
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [this.obtenerValor('telefono')],
      correoElectronico: [
        this.obtenerValor('correoElectronico'),
        [Validators.required, Validators.email],
      ],
      localidad: [this.obtenerValor('localidad')],
      municipioAlcaldia: [this.obtenerValor('municipioAlcaldia')],
      razonSocial: [this.obtenerValor('razonSocial'),[Validators.required, Validators.pattern(REGEX_NOMBRE)],],
    });
  }

  /**
   * @method ngOnInit
   * @description 
   * Hook de inicialización del componente que se ejecuta después de que Angular haya
   * inicializado todas las propiedades vinculadas a datos del componente. Carga los datos
   * necesarios para el funcionamiento del formulario y se suscribe a los cambios del estado
   * global para detectar cuando se selecciona un registro para edición.
   * 
   * Operaciones realizadas:
   * 1. Carga catálogos de países desde el servicio
   * 2. Se suscribe a los cambios del estado "otros seleccionado"
   * 3. Recrea el formulario cuando se detecta un elemento seleccionado
   * 4. Aplica las reglas de nacionalidad correspondientes
   * 
   * @returns {void}
   * @lifecycle OnInit
   * @public
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
   * Método utilitario que obtiene el valor de un campo específico del objeto `datoSeleccionado`.
   * Se utiliza para pre-poblar el formulario cuando se está editando un registro existente.
   * Si el campo no existe o `datoSeleccionado` es nulo, retorna una cadena vacía.
   * 
   * @param {keyof Otros} field - Nombre del campo a obtener del objeto de datos seleccionado
   * @returns {string | number | undefined | string[]} Valor del campo especificado o cadena vacía si no existe
   * 
   * @public
   * @example
   * // Obtener el RFC del dato seleccionado
   * const rfc = this.obtenerValor('rfc'); // Retorna el RFC o ''
   * 
   * // Usar en la inicialización del formulario
   * rfc: [this.obtenerValor('rfc'), Validators.required]
   */
  public obtenerValor(
    field: keyof Otros
  ): string | number | undefined | string[] {
    return this.datoSeleccionado?.[field as keyof Otros] ?? '';
  }

  /**
   * @method cargarDatos
   * @description 
   * Obtiene la lista de países disponibles desde el servicio de datos de solicitud
   * y la almacena en la propiedad `paisesDatos` para ser utilizada en el componente
   * de selección de país. La suscripción se cancela automáticamente al destruir el componente.
   * 
   * @returns {void}
   * @private
   * @example
   * // Se ejecuta automáticamente en ngOnInit
   * this.cargarDatos(); // Carga los países disponibles
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
   * Resetea completamente el formulario reactivo a su estado inicial, limpiando todos
   * los campos y restaurando los valores por defecto. Adicionalmente, remueve la opción
   * "No Contribuyente" del arreglo de tipos de persona si estaba presente.
   * 
   * Operaciones realizadas:
   * 1. Filtra la opción "No Contribuyente" de las opciones de tipo de persona
   * 2. Ejecuta reset() en el formulario para limpiar todos los campos
   * 3. Restaura las validaciones y estados iniciales de todos los controles
   * 
   * @returns {void}
   * @public
   * @example
   * // Llamar desde un botón de limpiar
   * onLimpiar() {
   *   this.limpiarFormulario();
   * }
   */
  limpiarFormulario(): void {
    this.tipoPersonaRadioOpcions=this.tipoPersonaRadioOpcions.filter((item)=>item.value !== TipoPersona.NO_CONTRIBUYENTE);
    this.agregarDatosForm.reset();
  }

  /**
   * @method cancelar
   * @description 
   * Cancela la operación actual de agregación o edición de datos, limpia la selección
   * en el estado global y navega hacia la vista anterior. Se utiliza cuando el usuario
   * decide no guardar los cambios realizados en el formulario.
   * 
   * Operaciones realizadas:
   * 1. Limpia el arreglo de datos seleccionados en el store
   * 2. Navega hacia atrás en el historial del navegador
   * 
   * @returns {void}
   * @public
   * @example
   * // Llamar desde un botón de cancelar
   * onCancelar() {
   *   this.cancelar();
   * }
   */
  cancelar(): void {
    this.tramiteStore.updateSeleccionadoOtrosDatos([]);
    this.ubicaccion.back();
  }

  /**
   * @method obtenerNuevoValorFormulario
   * @description 
   * Procesa y transforma los datos del formulario para crear un objeto de tipo `Otros`
   * con la estructura requerida por el sistema. Maneja la lógica específica para concatenar
   * nombres según el tipo de persona y genera el campo `nombreRazonSocial` apropiado.
   * 
   * Lógica de procesamiento:
   * - Persona Moral: Usa `denominacionRazon` como nombre
   * - Persona Física: Concatena nombres y apellidos
   * - Otros casos: Asigna cadena vacía
   * 
   * @returns {Otros} Objeto con todos los datos del formulario procesados y listos para guardar
   * @private
   * @example
   * // Se usa internamente en el método guardar()
   * const datosFormulario = this.obtenerNuevoValorFormulario();
   * this.tramiteStore.updateOtrosTablaDatos([datosFormulario]);
   */
  obtenerNuevoValorFormulario(): Otros {
    const VALOR_FORMULARIO = this.agregarDatosForm.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = '';
    }

   
    const NUEVO_VALOR_FORMULARIO = {
      ...VALOR_FORMULARIO,
      nombreRazonSocial: nombreRazonSocial,
    };

    return NUEVO_VALOR_FORMULARIO;
  }

  /**
   * @method guardar
   * @description 
   * Guarda los datos capturados en el formulario en el estado global del trámite y navega
   * hacia la vista anterior. Procesa la información del formulario, la transforma al formato
   * requerido y actualiza el store con los nuevos datos.
   * 
   * Flujo de operaciones:
   * 1. Obtiene y procesa los datos del formulario
   * 2. Actualiza el estado global con los nuevos datos
   * 3. Navega hacia atrás en el historial
   * 
   * @returns {void}
   * @public
   * @example
   * // Llamar desde un botón de guardar
   * onGuardar() {
   *   if (this.agregarDatosForm.valid) {
   *     this.guardar();
   *   }
   * }
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
   * Gestiona el comportamiento dinámico del formulario basado en la selección de nacionalidad.
   * Habilita o deshabilita campos específicos y controla la disponibilidad de la opción
   * "No Contribuyente" según las reglas de negocio del sistema.
   * 
   * Comportamiento por nacionalidad:
   * - Nacionalidad NO mexicana ('true'): Habilita todos los campos
   * - Nacionalidad mexicana ('true'): 
   *   - Deshabilita la mayoría de campos
   *   - Habilita solo: nacionalidad, tipoPersona, nombreDescripcion, rfc, curp
   *   - Controla CURP/RFC según tipo de contribuyente
   * 
   * Reglas específicas:
   * - No Contribuyente: CURP habilitado, RFC deshabilitado
   * - Contribuyente: CURP deshabilitado, RFC habilitado
   * 
   * @returns {void}
   * @public
   * @example
   * // Se ejecuta automáticamente al cambiar la nacionalidad en el formulario
   * // También se llama en el constructor para establecer el estado inicial
   */
  changeNacionalidad(): void {
    if (this.agregarDatosForm?.value?.nacionalidad !== 'true') {
      this.agregarDatosForm.enable();
      this.alternarOpcionNoContribuyente(false)
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
   * Gestiona dinámicamente la disponibilidad de la opción "No Contribuyente" en el arreglo
   * de opciones de tipo de persona. Agrega o remueve esta opción según el parámetro recibido,
   * evitando duplicados y manteniendo la integridad del arreglo.
   * 
   * Funcionalidad:
   * - Crea el objeto de opción "No Contribuyente" con label y value
   * - Busca si la opción ya existe en el arreglo
   * - Agrega la opción si debe agregarse y no existe
   * - Remueve la opción si no debe estar presente y existe
   * 
   * @param {boolean} debeAgregar - Indica si se debe agregar (`true`) o eliminar (`false`)
   * la opción "No Contribuyente" en el grupo de opciones de tipo de persona
   * 
   * @returns {void}
   * @private
   * @example
   * // Agregar la opción para nacionalidad mexicana
   * this.alternarOpcionNoContribuyente(true);
   * 
   * // Remover la opción para nacionalidad extranjera
   * this.alternarOpcionNoContribuyente(false);
   */
  alternarOpcionNoContribuyente(debeAgregar: boolean): void {
  const NO_CONTRIBUYENTE = {
    label: TipoPersona.NO_CONTRIBUYENTE,
    value: TipoPersona.NO_CONTRIBUYENTE
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
   * Realiza una búsqueda automática de datos fiscales mediante el servicio de exportación
   * y actualiza el formulario con la información obtenida. Implementa lógica adicional
   * para asignar valores por defecto a CURP y RFC cuando uno de ellos está deshabilitado.
   * 
   * Flujo de operaciones:
   * 1. Llama al servicio para obtener datos de "otros"
   * 2. Actualiza el formulario con los datos recibidos usando patchValue
   * 3. Aplica lógica condicional para campos CURP/RFC:
   *    - Si CURP tiene valor y RFC está deshabilitado: asigna RFC por defecto
   *    - Si RFC tiene valor y CURP está deshabilitado: asigna CURP por defecto
   * 
   * @returns {void}
   * @public
   * @example
   * // Llamar desde un botón de búsqueda
   * onBuscar() {
   *   this.seBuscaRfc();
   * }
   * 
   * @note Los valores 'RFC78900' y 'CURP8888' son valores por defecto del sistema
   */
  seBuscaRfc(): void {
    this.exportacionMateriasPrimasService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.agregarDatosForm.patchValue(data);
        if(this.agregarDatosForm.get('curp')?.value !== null && this.agregarDatosForm.get('rfc')?.disabled){
          this.agregarDatosForm.get('rfc')?.setValue('RFC78900')
        }
         if(this.agregarDatosForm.get('rfc')?.value !== null && this.agregarDatosForm.get('curp')?.disabled){
          this.agregarDatosForm.get('curp')?.setValue('CURP8888')
        }
      });
  }

  /**
   * @method esInvalido
   * @description 
   * Método utilitario que verifica si un control específico del formulario se encuentra
   * en estado inválido y ha sido interactuado por el usuario (tocado o modificado).
   * Se utiliza para mostrar mensajes de error de validación en el template.
   * 
   * Condiciones evaluadas:
   * - El control existe en el formulario
   * - El control tiene errores de validación (invalid)
   * - El control ha sido tocado (touched) o modificado (dirty)
   * 
   * @param {string} nombreControl - Nombre del control del formulario a verificar
   * @returns {boolean} `true` si el control es inválido y ha sido interactuado, `false` en caso contrario
   * 
   * @public
   * @example
   * // En el template para mostrar errores
   * <div *ngIf="esInvalido('rfc')" class="error">
   *   El RFC es requerido
   * </div>
   * 
   * // En el componente para validaciones
   * if (this.esInvalido('nombres')) {
   *   // Mostrar mensaje específico
   * }
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
   * Hook de destrucción del componente que se ejecuta cuando Angular destruye el componente.
   * Realiza la limpieza necesaria para prevenir fugas de memoria cancelando todas las
   * suscripciones activas mediante el Subject `unsubscribe$`.
   * 
   * Operaciones de limpieza:
   * 1. Emite un valor en `unsubscribe$` para cancelar todas las suscripciones
   * 2. Completa el Subject para liberar recursos
   * 
   * @returns {void}
   * @lifecycle OnDestroy
   * @public
   * @example
   * // Se ejecuta automáticamente cuando el componente se destruye
   * // Todas las suscripciones con takeUntil(this.unsubscribe$) se cancelan
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
