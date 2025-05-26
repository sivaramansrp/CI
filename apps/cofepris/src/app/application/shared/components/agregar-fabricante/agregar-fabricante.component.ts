import {
  Catalogo,
  REGEX_CORREO_ELECTRONICO,
  REGEX_NOMBRE,
  TELEFONO_DIGITOS,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE,
  STR_NACIONAL,
} from '../../constantes/datos-solicitud.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Fabricante } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

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
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent implements OnDestroy, OnInit {
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
    this.cargarDatos();
    this.validarElementos();
    this.crearAgregarFormularioFabricante();
    this.changeNacionalidad();
    this.mostarColoniaOEquivalente =
      PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE.includes(this.idProcedimiento)
        ? true
        : false;
  }

  /**
   * Método para inicializar el formulario reactivo `agregarFacturadorForm`.
   * Define los campos y sus validaciones.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  crearAgregarFormularioFabricante(): void {
    this.agregarFabricanteForm = this.fb.group({
      nacionalidad: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      rfc: [
        this.obtenerValor('rfc'),
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      curp: [
        this.obtenerValor('curp'),
        this.estaOculto ? [] : Validators.required,
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
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      pais: [
        {
          value: this.elementosDeshabilitados.includes('pais')
            ? '1'
            : this.obtenerValor('pais'),
          disabled: this.elementosDeshabilitados.includes('pais'),
        },
        Validators.required,
      ],
      estado: [
        {
          value: this.elementosDeshabilitados.includes('estado')
            ? '1'
            : this.obtenerValor('estadoLocalidad'),
          disabled: this.elementosDeshabilitados.includes('estado'),
        },
        Validators.required,
      ],
      municipio: [
        {
          value: this.elementosDeshabilitados.includes('municipio')
            ? '1'
            : this.obtenerValor('municipioAlcaldia'),
          disabled: this.elementosDeshabilitados.includes('municipio'),
        },
        Validators.required,
      ],
      localidad: [
        this.obtenerValor('localidad'),
        !this.elementosNoRequeridos.includes('localidad')
          ? [Validators.required]
          : [],
      ],
      codigoPostal: [
        this.obtenerValor('codigoPostal'),
        !this.elementosNoRequeridos.includes('codigoPostal')
          ? [Validators.required]
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
        Validators.required,
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [
        {
          value: this.obtenerValor('telefono') ? '3461235' : '',
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
        [Validators.pattern(TELEFONO_DIGITOS)],
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
    const VALOR_FORMULARIO = this.agregarFabricanteForm.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.razonSocial; // <-- yahan sahi karo
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = '';
    }
    const NUEVO_FABRICANTE: Fabricante = {
      nombreRazonSocial: nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      curp: VALOR_FORMULARIO.curp,
      telefono: VALOR_FORMULARIO.telefono,
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      entidadFederativa: VALOR_FORMULARIO.estado,
      estadoLocalidad: VALOR_FORMULARIO.estado,
      codigoPostal: VALOR_FORMULARIO.codigoPostal,
      coloniaEquivalente: VALOR_FORMULARIO.coloniaOEquivalente,
      nombres: VALOR_FORMULARIO.nombres,
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      razonSocial: VALOR_FORMULARIO.razonSocial,
      lada: VALOR_FORMULARIO.lada,
    };

    this.fabricantes.push(NUEVO_FABRICANTE);
    this.updateFabricanteTablaDatos.emit(this.fabricantes);
    this.ubicaccion.back();
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
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarFabricanteForm.reset();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
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
   * Habilita o deshabilita los controles del formulario según el estado de los campos
   * 'nacionalidad' y 'tipoPersona'. Si ambos están vacíos o indefinidos, deshabilita
   * todos los controles excepto estos dos. Si alguno tiene valor, habilita todos los controles.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  changeNacionalidad(): void {
    if (
      (this.agregarFabricanteForm?.get('nacionalidad')?.value === '' ||
        this.agregarFabricanteForm?.get('nacionalidad')?.value === undefined) &&
      (this.agregarFabricanteForm?.get('tipoPersona')?.value === '' ||
        this.agregarFabricanteForm?.get('tipoPersona')?.value === undefined)
    ) {
      Object.keys(this.agregarFabricanteForm.controls).forEach(controlName => {
        this.agregarFabricanteForm.get(controlName)?.disable();
        if (controlName === 'nacionalidad' || controlName === 'tipoPersona') {
          this.agregarFabricanteForm.get(controlName)?.enable();
        }
      });
    }
    else {
      Object.keys(this.agregarFabricanteForm.controls).forEach(controlName => {
        this.agregarFabricanteForm.get(controlName)?.enable();
        this.estaDeshabilitadoDesplegable = false;
      });
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
