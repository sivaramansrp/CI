import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_CORREO_ELECTRONICO,
  REGEX_IMPORTE_PAGO,
  REGEX_NOMBRE,
  REGEX_RFC_FISICA,
  REGEX_RFC_MORAL,
  REGEX_TELEFONO,
  TipoPersona,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE,
  PROCEDIMIENTOS_PARA_OCULTAR_EL_BOTON_AGREGAR,
  STR_NACIONAL,
} from '../../constantes/datos-solicitud.enum';
import { Subject, takeUntil } from 'rxjs';
import {CatalogoSelectComponent} from '@libs/shared/data-access-user/src';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Fabricante } from '../../models/terceros-relacionados.model';
import { TERCEROS_RELACIONADOS_DATOS_INICIALES } from '../../constantes/terceros-fabricante.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Componente para agregar datos de un fabricante.
 * Provee un formulario reactivo y métodos para guardar la información del fabricante.
 *
 * @example
 * <app-agregar-fabricante></app-agregar-fabricante>
 */
@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    TooltipModule,
    NotificacionesComponent
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent
  implements OnDestroy, OnInit, OnChanges
{
  /**
   * Función de callback (Input) para propagar la lista de fabricantes.
   * @property {(value: Fabricante[]) => void} guardarFabricanteForm
   */
  @Input()
  guardarFabricanteForm!: (value: Fabricante[]) => void;

  /**
   * Identificador del procedimiento actual.
   * Utilizado para controlar el flujo de la vista dependiendo del tipo de procedimiento.
   *
   * @input idProcedimiento - Cadena que representa el ID del procedimiento (por ejemplo: '260102').
   */
  @Input()
  idProcedimiento!: number;

  /**
   * FormGroup para el formulario de agregar fabricante.
   * @property {FormGroup} agregarFabricanteForm
   */
  agregarFabricanteForm!: FormGroup;

  /**
   * Datos de catálogo de códigos postales.
   * @property {Catalogo[]} codigosPostalesDatos
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de países.
   * @property {Catalogo[]} paisesDatos
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * Lista de destinatarios seleccionados que se reciben como entrada
   * desde un componente padre.
   *
   * @input
   * @type {Destinatario[] | undefined}
   */
  @Input() datoSeleccionadorfc: Fabricante[] | undefined;

  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;
  /**
   * Datos de catálogo de estados.
   * @property {Catalogo[]} estadosDatos
   */
  public estadosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosDatos
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * @property nacionalStr
   * @description Almacena la cadena de texto para "Nacional" para su uso en la interfaz de usuario.
   * @type {string}
   * @default STR_NACIONAL
   */
  public nacionalStr = STR_NACIONAL;

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesDatos
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasDatos
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * Arreglo de fabricantes a agregar.
   * @property {Fabricante[]} fabricantes
   */
  fabricantes: Fabricante[] = [];

  /**
   * Subject que se utiliza para desuscribir observables y evitar fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Emite un evento con la lista de fabricantes actualizada.
   * @property {EventEmitter<Fabricante[]>} updateFabricanteTablaDatos
   */
  @Output() updateFabricanteTablaDatos = new EventEmitter<Fabricante[]>();
  /**
   * Indica si el componente debe estar oculto o visible.
   * @type {boolean}
   * @input
   */
  @Input() estaOculto!: boolean;

  /**
   * @property {Fabricante | undefined} datoSeleccionado
   * Dato seleccionado que se pasará al componente hijo `AgregarFabricanteComponent`.
   */
  @Input() datoSeleccionado: Fabricante[] | undefined;

  /**
   * Indica si se debe mostrar la colonia o equivalente.
   * @type {boolean}
   * @input
   */
  mostarColoniaOEquivalente = false;

  /**
   * Indica si se ha realizado la verificación de validación al intentar guardar.
   * Esta bandera se utiliza para controlar la visualización de mensajes de error o advertencia
   * cuando el usuario intenta guardar el formulario sin cumplir con los requisitos de validación.
   */
  chequeoValidacionAlGuardar =false;

    /**
     * Evento de salida que se emite cuando el usuario decide guardar y salir del formulario.
     * Los componentes padres pueden suscribirse a este evento para ejecutar acciones adicionales
     * después de que se haya guardado la información y se haya solicitado salir.
     */
    @Output() guardarYSalir = new EventEmitter<void>();
    /**
     * Evento de salida que emite una señal para cancelar o cerrar el modal actual.
     * Los componentes padres pueden suscribirse a este evento para manejar la acción de cancelación.
     */
    @Output() cancelarmodal = new EventEmitter<void>();
    /**
     * @input
     * Lista de objetos de tipo `Fabricante` que se mostrarán en la tabla de fabricantes.
     * Este arreglo es recibido como entrada por el componente.
     */
    @Input() fabricanteTablaDatos: Fabricante[] = [];

 /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];

  /**
   * Lista de elementos requeridos en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben ser obligatorios en el formulario.
   */
  public elementosNoRequeridos: string[] = [];

  /**
   * Controla si el desplegable de nacionalidad está deshabilitado.
   * @property {boolean} estaDeshabilitadoDesplegable
   */
  public estaDeshabilitadoDesplegable: boolean = true;

  /**
   * @property {boolean} habilitarContribuyente
   * @description
   * Indica si el campo de contribuyente debe estar habilitado en el formulario de fabricante.
   * Se activa dependiendo del procedimiento seleccionado.
   */
  public habilitarContribuyente: boolean = false;
  /**
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosTempDatos
   */
  public municipiosTempDatos: Catalogo[] = [];
  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasTempDatos
   */
  public coloniasTempDatos: Catalogo[] = [];
  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesTempDatos
   */
  public localidadesTempDatos: Catalogo[] = [];

  /**
   * Objeto de tipo `Fabricante` asociado al componente.
   *
   * @type {Fabricante | undefined}
   * @optional
   */
  fabricante?: Fabricante;

  /**
   * Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Event emitted when fabricante is successfully saved
   */
  @Output() fabricanteSaved = new EventEmitter<void>();

  /**
   * Constructor que inyecta los servicios y crea el formulario de fabricante.
   *
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Store para manejar la información del trámite 260204.
   * @param {Tramite260204Query} tramiteQuery - Query para consultar el estado del trámite 260204.
   * @param {Location} ubicaccion - Servicio para manejar la navegación en el historial del navegador.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener información de catálogos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    //constructor necesario para inyectar el servicio
  }

  /**
   * Hook que se ejecuta al inicializar el componente.
   * Llama a la función para cargar los datos de los catálogos.
   */
  ngOnInit(): void {
    this.cambiarHabilitacionContribuyente();
    this.cargarDatos();
    this.chequeoValidacionAlGuardar =
      PROCEDIMIENTOS_PARA_OCULTAR_EL_BOTON_AGREGAR.includes(this.idProcedimiento)
        ? true
        : false;
    this.validarElementos();
    this.crearAgregarFormularioFabricante();
    this.estaDeshabilitadoDesplegable = true;

    this.changeNacionalidad();
    this.changeTipoPersona();

    this.mostarColoniaOEquivalente =
      PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE.includes(this.idProcedimiento)
        ? true
        : false;
    if (this.chequeoValidacionAlGuardar && !this.agregarFabricanteForm?.get('nacionalidad')?.value) {
      this.agregarFabricanteForm.get('tipoPersona')?.disable();
    }
    this.forzarDeshabilitarPais();
  }

  /**
   * Ciclo de vida de Angular: `ngOnChanges`.
   *
   * @param {SimpleChanges} currentValue - Objeto que contiene los cambios en las propiedades de entrada (`@Input`).
   *
   * @description
   * Este método se ejecuta automáticamente cada vez que cambia alguna propiedad de entrada del componente.
   *
   * - Verifica si existe un valor en `datoSeleccionado` y si tiene registros.
   * - Si hay información:
   *   1. Asigna el nuevo valor de `datoSeleccionado`.
   *   2. Tras un pequeño retraso (`setTimeout`), habilita el formulario `agregarFabricanteForm`
   *      si los campos `nacionalidad` y `tipoPersona` están presentes.
   *   3. Actualiza el formulario con los valores del primer elemento de `datoSeleccionado`.
   * - Si no existe información, limpia el formulario mediante `reset()`.
   */
  ngOnChanges(currentValue: SimpleChanges): void {
     if (this.chequeoValidacionAlGuardar) {
      this.fabricantes = Array.isArray(this.fabricanteTablaDatos) ? [...this.fabricanteTablaDatos] : [];
    }
    if (currentValue['datoSeleccionado'] && currentValue['datoSeleccionado'].currentValue && currentValue['datoSeleccionado'].currentValue.length > 0) {
      this.datoSeleccionado = currentValue['datoSeleccionado'].currentValue;
      setTimeout(() => {
        if (
          this.datoSeleccionado?.[0]?.nacionalidad &&
          this.datoSeleccionado?.[0]?.tipoPersona
        ) {
          this.agregarFabricanteForm?.enable();
        }
        this.agregarFabricanteForm?.patchValue({
          nacionalidad: this.datoSeleccionado?.[0]?.nacionalidad,
          tipoPersona: this.datoSeleccionado?.[0]?.tipoPersona,
          rfc: this.datoSeleccionado?.[0]?.rfc,
          curp: this.datoSeleccionado?.[0]?.curp,
          nombres: this.datoSeleccionado?.[0]?.nombres,
          primerApellido: this.datoSeleccionado?.[0]?.primerApellido,
          segundoApellido: this.datoSeleccionado?.[0]?.segundoApellido,
          razonSocial: this.datoSeleccionado?.[0]?.razonSocial,
          pais: this.datoSeleccionado?.[0]?.pais,
          estado: this.datoSeleccionado?.[0]?.estadoLocalidad,
          municipio: this.datoSeleccionado?.[0]?.municipioAlcaldia,
          localidad: this.datoSeleccionado?.[0]?.localidad,
          codigoPostal: this.datoSeleccionado?.[0]?.codigoPostal,
          colonia: this.datoSeleccionado?.[0]?.colonia,
          calle: this.datoSeleccionado?.[0]?.calle,
          numeroExterior: this.datoSeleccionado?.[0]?.numeroExterior,
          numeroInterior: this.datoSeleccionado?.[0]?.numeroInterior,
          lada: this.datoSeleccionado?.[0]?.lada,
          telefono: this.datoSeleccionado?.[0]?.telefono,
          correoElectronico: this.datoSeleccionado?.[0]?.correoElectronico,
          coloniaOEquivalente: this.datoSeleccionado?.[0]?.coloniaEquivalente,
        });
        if (this.datoSeleccionado?.[0]?.municipioAlcaldia) {
          this.municipiosDatos = [...this.municipiosTempDatos];
          this.agregarFabricanteForm.get('municipio')?.enable();
        }
        if (this.datoSeleccionado?.[0]?.localidad) {
          this.localidadesDatos = [...this.localidadesTempDatos];
          this.agregarFabricanteForm.get('localidad')?.enable();
        }
        if (this.datoSeleccionado?.[0]?.colonia) {
          this.coloniasDatos = [...this.coloniasTempDatos];
          this.agregarFabricanteForm.get('colonia')?.enable();
        }
        this.updateDropdownEnableState();
        const RAZON_SOCIAL_CONTROL = this.agregarFabricanteForm.get('razonSocial');
        const NOMBRES_CONTROL = this.agregarFabricanteForm.get('nombres');
        const PRIMER_APELLIDO_CONTROL = this.agregarFabricanteForm.get('primerApellido');
        const TIPO_PERSONA_VALUE = this.datoSeleccionado?.[0]?.tipoPersona;
        if (this.chequeoValidacionAlGuardar) {
          if (TIPO_PERSONA_VALUE === this.tipoPersona.MORAL) {
            RAZON_SOCIAL_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
          } else {
            RAZON_SOCIAL_CONTROL?.clearValidators();
          }
          RAZON_SOCIAL_CONTROL?.updateValueAndValidity();
          if (TIPO_PERSONA_VALUE === this.tipoPersona.FISICA) {
            NOMBRES_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
            PRIMER_APELLIDO_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
          } else {
            NOMBRES_CONTROL?.clearValidators();
            PRIMER_APELLIDO_CONTROL?.clearValidators();
          }
          NOMBRES_CONTROL?.updateValueAndValidity();
          PRIMER_APELLIDO_CONTROL?.updateValueAndValidity();
        }
      }, 100);
    } else {
      this.agregarFabricanteForm?.reset();
    }
  }

  /**
   * @method cambiarHabilitacionContribuyente
   * @description
   * Habilita el campo de contribuyente en el formulario si el procedimiento actual está incluido en la lista `TERCEROS_RELACIONADOS_DATOS_INICIALES`.
   * Cambia el valor de la propiedad `habilitarContribuyente` a `true` si la condición se cumple.
   *
   * @returns {void}
   */
  public cambiarHabilitacionContribuyente(): void {
    if (TERCEROS_RELACIONADOS_DATOS_INICIALES.includes(this.idProcedimiento)) {
      this.habilitarContribuyente = true;
    }
  }

  /**
   * Método para inicializar el formulario reactivo `agregarFacturadorForm`.
   * Define los campos y sus validaciones.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  crearAgregarFormularioFabricante(): void {
    this.agregarFabricanteForm = this.fb.group({
      nacionalidad: [this.obtenerValor('nacionalidad'), Validators.required],
      tipoPersona: [
        {
          value: this.obtenerValor('tipoPersona'),
          disabled: this.chequeoValidacionAlGuardar,
        },
        Validators.required
      ],
      rfc: [
        this.obtenerValor('rfc'),
      ],
      curp: [
        this.obtenerValor('curp'),
        this.idProcedimiento === 260912 ? [] : (this.estaOculto ? [] : [Validators.required, Validators.pattern(/^[A-Za-z]{4}\d{6}[HM][A-Za-z]{5}\d{2}$/)])
      ],
      nombres: [
        this.obtenerValor('nombres'),
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      primerApellido: [
        this.obtenerValor('primerApellido'),
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      segundoApellido: [
        this.obtenerValor('segundoApellido'),
        [Validators.pattern(REGEX_NOMBRE)],
      ],
      razonSocial: [
        this.obtenerValor('razonSocial'),
        []
      ],
      pais: [
        {
          value: this.elementosDeshabilitados.includes('pais')
            ? ''
            : this.obtenerValor('pais'),
          disabled: this.elementosDeshabilitados.includes('pais') || this.chequeoValidacionAlGuardar,
        },
        [Validators.required],
      ],
      estado: [
        {
          value: this.elementosDeshabilitados.includes('estado')
            ? '1'
            : this.obtenerValor('estadoLocalidad'),
          disabled: this.elementosDeshabilitados.includes('estado'),
        },
        [Validators.required, Validators.pattern(REGEX_IMPORTE_PAGO)],
      ],
      municipio: [
        {
          value: this.elementosDeshabilitados.includes('municipio')
            ? '1'
            : this.obtenerValor('municipioAlcaldia'),
          disabled: this.elementosDeshabilitados.includes('municipio'),
        },
        [Validators.required],
      ],
      localidad: [
        this.obtenerValor('localidad'),
        !this.elementosNoRequeridos.includes('localidad')
          ? [Validators.required]
          : [],
      ],
      codigoPostal: [
        this.obtenerValor('codigoPostal'),
        this.idProcedimiento === 260911 
        ? [] 
        :!this.elementosNoRequeridos.includes('codigoPostal')
        ? [Validators.required, Validators.pattern(REGEX_IMPORTE_PAGO)]
        : [],
      ],
      colonia: [
        this.obtenerValor('colonia'),
        !this.elementosNoRequeridos.includes('colonia')
          ? [Validators.required]
          : [],
      ],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [
        this.obtenerValor('numeroExterior'),
        [Validators.required],
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [
        {
          value: this.obtenerValor('telefono'),
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
        [Validators.pattern(REGEX_TELEFONO)],
      ],
      correoElectronico: [
        {
          value: this.elementosDeshabilitados.includes('correoElectronico')
            ? 'abc@njk.com'
            : this.obtenerValor('correoElectronico'),
          disabled: this.elementosDeshabilitados.includes('correoElectronico'),
        },
        [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
      coloniaOEquivalente: [
        { value: this.obtenerValor('coloniaEquivalente'), disabled: true },
      ],
    });
    const RAZON_SOCIAL_CONTROL = this.agregarFabricanteForm.get('razonSocial');
    const NOMBRES_CONTROL = this.agregarFabricanteForm.get('nombres');
    const PRIMER_APELLIDO_CONTROL = this.agregarFabricanteForm.get('primerApellido');
    const TIPO_PERSONA_CONTROL = this.agregarFabricanteForm.get('tipoPersona');
  const SET_STRICT_VALIDATORS = (tipo: TipoPersona): void => {
      if (this.chequeoValidacionAlGuardar) {
        if (tipo === this.tipoPersona.MORAL) {
          RAZON_SOCIAL_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
        } else {
          RAZON_SOCIAL_CONTROL?.clearValidators();
        }
        RAZON_SOCIAL_CONTROL?.updateValueAndValidity();
        if (tipo === this.tipoPersona.FISICA) {
          NOMBRES_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
          PRIMER_APELLIDO_CONTROL?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
        } else {
          NOMBRES_CONTROL?.clearValidators();
          PRIMER_APELLIDO_CONTROL?.clearValidators();
        }
        NOMBRES_CONTROL?.updateValueAndValidity();
        PRIMER_APELLIDO_CONTROL?.updateValueAndValidity();
      }
    };
    SET_STRICT_VALIDATORS(TIPO_PERSONA_CONTROL?.value);
    TIPO_PERSONA_CONTROL?.valueChanges.subscribe(tipo => {
      SET_STRICT_VALIDATORS(tipo);
    });
  }

    /**
   * @private
   * Fuerza la deshabilitación del campo 'pais' en el formulario de agregar destinatario final.
   * 
   * Si la variable `chequeoValidacionAlGuardar` es verdadera, deshabilita el control 'pais'
   * dentro del formulario reactivo `agregarDestinatarioFinal`.
   * 
   * Útil para evitar que el usuario modifique el país cuando ciertas condiciones de validación se cumplen al guardar.
   */
private forzarDeshabilitarPais(): void {
  if (this.chequeoValidacionAlGuardar) {
    this.agregarFabricanteForm.get('pais')?.disable();
  }
  if (
    this.idProcedimiento === 260912 &&
    this.agregarFabricanteForm.get('nacionalidad')?.value === 'Extranjero' &&
    (
      this.agregarFabricanteForm.get('tipoPersona')?.value === this.tipoPersona.FISICA ||
      this.agregarFabricanteForm.get('tipoPersona')?.value === this.tipoPersona.MORAL
    )
  ) {
    this.agregarFabricanteForm.get('pais')?.enable();
  }
}

  /**
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
  validarElementos(): void {
    switch (this.idProcedimiento) {
      case 260207:
      case 260209:
      case 260208:
      case 260219:
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['codigoPostal', 'colonia'];
        break;
      case 260201:
        this.elementosDeshabilitados = ['pais'];
        break;
      case 260214:
        this.elementosDeshabilitados = ['pais'];
        break;
       case 260911:
        this.elementosDeshabilitados = []; 
        this.elementosNoRequeridos = ['colonia'];
        break;
        case 260912:
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['localidad', 'colonia', 'codigoPostal'];
        break;
        default:
        this.elementosDeshabilitados = [];
        this.elementosNoRequeridos = [];
    }
  }

  /**
   * Guarda un fabricante nuevo en el arreglo `fabricantes`, lo actualiza en el store y
   * regresa a la página anterior en el historial del navegador.
   */
guardarFabricante(): void {
  
  if (this.chequeoValidacionAlGuardar && this.agregarFabricanteForm.invalid) {
    Object.values(this.agregarFabricanteForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
    return;
  }

  const VALOR_FORMULARIO = this.agregarFabricanteForm.getRawValue();

  let nombreRazonSocial: string;

  if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
    nombreRazonSocial = VALOR_FORMULARIO.razonSocial;
  } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
    nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${VALOR_FORMULARIO.primerApellido} ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
  } else {
    nombreRazonSocial = '';
  }

  const GET_DESCRIPTION_FROM_CATALOG = (catalogArray: Catalogo[], id: string | number): string => {
    const ITEM = catalogArray.find(cat => cat.id.toString() === id.toString());
    return ITEM ? ITEM.descripcion : id.toString();
  };

  const NUEVO_FABRICANTE: Fabricante = {
    id: this.datoSeleccionado?.[0]?.id || Date.now(),
    nacionalidad: VALOR_FORMULARIO.nacionalidad,
    tipoPersona: VALOR_FORMULARIO.tipoPersona,
    nombreRazonSocial: nombreRazonSocial,
    rfc: VALOR_FORMULARIO.rfc,
    curp: VALOR_FORMULARIO.curp,
    telefono: VALOR_FORMULARIO.telefono,
    correoElectronico: VALOR_FORMULARIO.correoElectronico,
    calle: VALOR_FORMULARIO.calle,
    numeroExterior: VALOR_FORMULARIO.numeroExterior,
    numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
    pais: GET_DESCRIPTION_FROM_CATALOG(this.paisesDatos, VALOR_FORMULARIO.pais),
    colonia: GET_DESCRIPTION_FROM_CATALOG(this.coloniasDatos, VALOR_FORMULARIO.colonia),
    municipioAlcaldia: GET_DESCRIPTION_FROM_CATALOG(this.municipiosDatos, VALOR_FORMULARIO.municipio),
    localidad: GET_DESCRIPTION_FROM_CATALOG(this.localidadesDatos, VALOR_FORMULARIO.localidad),
    entidadFederativa: GET_DESCRIPTION_FROM_CATALOG(this.estadosDatos, VALOR_FORMULARIO.estado),
    estadoLocalidad: GET_DESCRIPTION_FROM_CATALOG(this.estadosDatos, VALOR_FORMULARIO.estado),
    codigoPostal: GET_DESCRIPTION_FROM_CATALOG(this.codigosPostalesDatos, VALOR_FORMULARIO.codigoPostal),
    coloniaEquivalente: VALOR_FORMULARIO.coloniaOEquivalente,
    nombres: VALOR_FORMULARIO.nombres,
    primerApellido: VALOR_FORMULARIO.primerApellido,
    segundoApellido: VALOR_FORMULARIO.segundoApellido,
    razonSocial: VALOR_FORMULARIO.razonSocial,
    lada: VALOR_FORMULARIO.lada,
  };

  let updatedFabricantes: Fabricante[];

  const SELECTED_ID = this.datoSeleccionado?.[0]?.id;

  if (this.datoSeleccionado && this.datoSeleccionado.length > 0 && SELECTED_ID !== undefined) {
    updatedFabricantes = this.fabricanteTablaDatos.map(f => 
      f.id === SELECTED_ID ? NUEVO_FABRICANTE : f
    );
  } else {
    updatedFabricantes = [...this.fabricanteTablaDatos, NUEVO_FABRICANTE];
  }

  this.updateFabricanteTablaDatos.emit(updatedFabricantes);
  
  this.limpiarFormulario();
  this.datoSeleccionado = []; 
  this.cancelarmodal.emit(); 
}

  /**
   * Carga datos de catálogos (códigos postales, países, estados, municipios, etc.)
   * utilizando el servicio `DatosSolicitudService`.
   * Se desuscribe automáticamente al destruir el componente.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.municipiosTempDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesTempDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasTempDatos = data;
      });
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    if (this.chequeoValidacionAlGuardar) {
      this.agregarFabricanteForm.reset();
      Object.keys(this.agregarFabricanteForm.controls).forEach(controlName => {
        this.agregarFabricanteForm.get(controlName)?.disable();
      });
      this.agregarFabricanteForm.get('nacionalidad')?.enable();
      this.estaDeshabilitadoDesplegable = true;
    } else {
      this.agregarFabricanteForm.reset();
    }
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
      this.limpiarFormulario();
      this.datoSeleccionado = [];
      this.cancelarmodal.emit();
  }

  /**
   * Carga la lista de estados cuando se selecciona un catálogo válido.
   *
   * @param evento Objeto de tipo `Catalogo` que contiene la información seleccionada.
   *
   * ### Descripción:
   * - Si el `id` del evento es mayor que 0, asigna la lista temporal de municipios (`municipiosTempDatos`)
   *   a la lista principal (`municipiosDatos`).
   */
  cargarEstados(evento: Catalogo): void {
    if (evento.id > 0) {
      this.municipiosDatos = this.municipiosTempDatos;
    }
  }
  /**
   * Carga la lista de municipios, localidades y colonias cuando se selecciona un catálogo válido.
   *
   * @param evento Objeto de tipo `Catalogo` que contiene la información seleccionada.
   *
   * ### Descripción:
   * - Si el `id` del evento es mayor que 0:
   *   - Asigna la lista temporal de localidades (`localidadesTempDatos`) a la lista principal (`localidadesDatos`).
   *   - Asigna la lista temporal de colonias (`coloniasTempDatos`) a la lista principal (`coloniasDatos`).
   */
  cargarMunicipios(evento: Catalogo): void {
    if (evento.id > 0) {
      this.localidadesDatos = this.localidadesTempDatos;
      this.coloniasDatos = this.coloniasTempDatos;
    }
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarFabricanteForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof Fabricante} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(field: keyof Fabricante): string | number | undefined {
    return this.datoSeleccionado?.[0]?.[field as keyof Fabricante] ?? '';
  }
  /**
   * Validador personalizado para RFC según el tipo de persona (Física o Moral).
   *
   * @param TIPO_PERSONA El tipo de persona para el cual se debe validar el RFC.
   * @returns Una función validadora que verifica si el valor cumple con el formato RFC correspondiente.
   *          Si el valor es inválido, retorna un objeto con la clave de error específica.
   *          Si el tipo de persona es desconocido o el valor está vacío, retorna null.
   */
  static rfcFisicaValidator(
    TIPO_PERSONA: TipoPersona
  ): (CONTROL: AbstractControl) => ValidationErrors | null {
    return (CONTROL: AbstractControl): ValidationErrors | null => {
      const VALUE = CONTROL?.value;

      if (!VALUE) {
        return null;
      }

      let REGEX;
      let ERROR_KEY;

      if (TIPO_PERSONA === TipoPersona.FISICA) {
        REGEX = REGEX_RFC_FISICA;
        ERROR_KEY = { INVALID_RFC_FISICA: true };
      } else if (TIPO_PERSONA === TipoPersona.MORAL) {
        REGEX = REGEX_RFC_MORAL;
        ERROR_KEY = { INVALID_RFC_MORAL: true };
      } else {
        return null;
      }

      return REGEX.test(VALUE) ? null : ERROR_KEY;
    };
  }

  /**
   * Maneja el evento de cambio en el campo de RFC.
   *
   * @param {Event} event - Evento que se dispara al cambfiar el valor del campo de entrada (input).
   */
  onChangeRfc(event: Event): void {
    if (this.chequeoValidacionAlGuardar) {
      return;
    }
    const RFC_VALUE = (event.target as HTMLInputElement).value;
    this.datoSeleccionadorfc?.forEach((dato) => {
      if (dato.rfc === RFC_VALUE) {
        const PEDIMENTO = {
          patente: 0,
          pedimento: 0,
          aduana: 0,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };
        this.abrirModal(
          'La información proporcionada de la persona ya existe, favor de verificar.'
        );
        this.pedimentos.push(PEDIMENTO);
      }
    });
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   *
   * @param {number} i - El índice del elemento a eliminar.
   *
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Habilita o deshabilita los controles del formulario según el estado de los campos
   * 'nacionalidad' y 'tipoPersona'. Si ambos están vacíos o indefinidos, deshabilita
   * todos los controles excepto estos dos. Si alguno tiene valor, habilita todos los controles.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  changeNacionalidad(): void {
    const VALOR_FORMULARIO = this.agregarFabricanteForm.getRawValue();
    const RFC_CONTROL = this.agregarFabricanteForm.get('rfc');
    if (RFC_CONTROL) {
      RFC_CONTROL.setValidators([
        Validators.required,
        AgregarFabricanteComponent.rfcFisicaValidator(
          VALOR_FORMULARIO.tipoPersona
        ),
      ]);
      RFC_CONTROL.markAsTouched();
      RFC_CONTROL.updateValueAndValidity();
    }
    const NACIONALIDAD = this.agregarFabricanteForm?.get('nacionalidad')?.value;
    const TIPO_PERSONA = this.agregarFabricanteForm?.get('tipoPersona')?.value;
    if (!NACIONALIDAD || NACIONALIDAD === '') {
      this.estaDeshabilitadoDesplegable = true;
      Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
        this.agregarFabricanteForm.get(controlName)?.disable();
        if (controlName === 'nacionalidad' || controlName === 'tipoPersona') {
          this.agregarFabricanteForm.get(controlName)?.enable();
        }
      });
      if (this.chequeoValidacionAlGuardar) {
        this.agregarFabricanteForm.get('tipoPersona')?.disable();
      }
    } else if (NACIONALIDAD === this.nacionalStr || NACIONALIDAD === 'Extranjero') {
      if (NACIONALIDAD && TIPO_PERSONA) {
        this.estaDeshabilitadoDesplegable = false;
        Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
          if (!this.elementosDeshabilitados.includes(controlName)) {
            this.agregarFabricanteForm.get(controlName)?.enable();
          }
        });
      } else {
        this.estaDeshabilitadoDesplegable = true;
        Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
          this.agregarFabricanteForm.get(controlName)?.disable();
          if (controlName === 'nacionalidad' || controlName === 'tipoPersona') {
            this.agregarFabricanteForm.get(controlName)?.enable();
          }
        });
      }
    }
    this.forzarDeshabilitarPais();
  }

  /**
   * @method changeTipoPersona
   * @description Cambia el estado de los controles del formulario según el tipo de persona seleccionado.
   * Si el tipo de persona es física, habilita el campo RFC; si es moral, lo deshabilita.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
changeTipoPersona(): void {
  const VALOR_FORMULARIO = this.agregarFabricanteForm.getRawValue();

  const RFC_CONTROL = this.agregarFabricanteForm.get('rfc');
  if (RFC_CONTROL) {
    RFC_CONTROL.setValidators([
      Validators.required,
      AgregarFabricanteComponent.rfcFisicaValidator(VALOR_FORMULARIO.tipoPersona)
    ]);
    RFC_CONTROL.markAsTouched();
    RFC_CONTROL.updateValueAndValidity();
  }
  const HAS_NACIONALIDAD = this.agregarFabricanteForm?.get('nacionalidad')?.value;

  if (this.isTipoPersonaEmpty()) {
    this.disableExcept(['nacionalidad', 'tipoPersona']);
    //Solo deshabilitar tipoPersona si chequeoValidacionAlGuardar es verdadero y no hay nacionalidad
    if (this.chequeoValidacionAlGuardar && !HAS_NACIONALIDAD) {
      this.agregarFabricanteForm.get('tipoPersona')?.disable();
    }
  } else if (this.isContribuyenteFisicaMoral()) {
    this.disableExcept(['nacionalidad', 'tipoPersona', 'rfc']);
  } else if (this.isContribuyenteNoContribuyente()) {
    this.disableExcept(['nacionalidad', 'tipoPersona', 'curp']);
  } else {
    if (this.agregarFabricanteForm?.get('tipoPersona')?.value) {
      this.resetExcept(['nacionalidad', 'tipoPersona']);
    }
    if (
      this.agregarFabricanteForm?.get('nacionalidad')?.value &&
      this.agregarFabricanteForm?.get('tipoPersona')?.value
    ) {
      this.estaDeshabilitadoDesplegable = false;
      Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
        if (!this.elementosDeshabilitados.includes(controlName)) {
          this.agregarFabricanteForm.get(controlName)?.enable();
        }
      });
    }
  }
  // Solo deshabilitar tipoPersona bajo condiciones muy específicas
  if (this.chequeoValidacionAlGuardar && !HAS_NACIONALIDAD && this.isTipoPersonaEmpty()) {
    this.agregarFabricanteForm.get('tipoPersona')?.disable();
  }
  this.forzarDeshabilitarPais();
}

private isTipoPersonaEmpty(): boolean {
  const TIPO_PERSONA_VALUE = this.agregarFabricanteForm?.get('tipoPersona')?.value;
  return TIPO_PERSONA_VALUE === '' || TIPO_PERSONA_VALUE === undefined;
}

private isContribuyenteFisicaMoral(): boolean {
  return (
    this.habilitarContribuyente === true &&
    this.agregarFabricanteForm?.get('nacionalidad')?.value === this.nacionalStr &&
    (this.agregarFabricanteForm?.get('tipoPersona')?.value === this.tipoPersona.FISICA ||
      this.agregarFabricanteForm?.get('tipoPersona')?.value === this.tipoPersona.MORAL)
  );
}

private isContribuyenteNoContribuyente(): boolean {
  return (
    this.habilitarContribuyente === true &&
    this.agregarFabricanteForm?.get('nacionalidad')?.value === this.nacionalStr &&
    this.agregarFabricanteForm?.get('tipoPersona')?.value === this.tipoPersona.NO_CONTRIBUYENTE
  );
}

private disableExcept(enabledControls: string[]): void {
  Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
    this.agregarFabricanteForm.get(controlName)?.disable();
    if (enabledControls.includes(controlName)) {
      this.agregarFabricanteForm.get(controlName)?.enable();
    }
  });
}

private resetExcept(excludedControls: string[]): void {
  Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
    if (!excludedControls.includes(controlName)) {
      this.agregarFabricanteForm.get(controlName)?.reset();
    }
  });
}


  /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Updates the estaDeshabilitadoDesplegable flag based on whether both nacionalidad and tipoPersona are selected.
   * If either is missing, disables dropdowns. If both are present, enables them.
   */
  private updateDropdownEnableState(): void {
    const NACIONALIDAD = this.agregarFabricanteForm?.get('nacionalidad')?.value;
    const TIPO_PERSONA = this.agregarFabricanteForm?.get('tipoPersona')?.value;
    if (NACIONALIDAD && TIPO_PERSONA) {
      this.estaDeshabilitadoDesplegable = false;
      Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
        if (!this.elementosDeshabilitados.includes(controlName)) {
          this.agregarFabricanteForm.get(controlName)?.enable();
        }
      });
    } else {
      this.estaDeshabilitadoDesplegable = true;
      Object.keys(this.agregarFabricanteForm.controls).forEach((controlName) => {
        if (controlName !== 'nacionalidad' && controlName !== 'tipoPersona') {
          this.agregarFabricanteForm.get(controlName)?.disable();
        } else {
          this.agregarFabricanteForm.get(controlName)?.enable();
        }
      });
      if (this.chequeoValidacionAlGuardar && !NACIONALIDAD) {
        this.agregarFabricanteForm.get('tipoPersona')?.disable();
      }
    }
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `unsubscribe$` y lo completa para liberar suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
