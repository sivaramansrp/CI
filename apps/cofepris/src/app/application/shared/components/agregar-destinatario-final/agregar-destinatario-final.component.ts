import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados.model';
import { PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE } from '../../constantes/datos-solicitud.enum';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para agregar un destinatario final (Destinatario) al formulario y almacenarlo.
 *
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
 */
@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.css',
})
export class AgregarDestinatarioFinalComponent
  implements OnDestroy, OnInit, OnChanges
{
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Grupo de formulario reactivo para recopilar los datos del destinatario final.
   * @property {FormGroup} agregarDestinatarioFinal
   */
  agregarDestinatarioFinal!: FormGroup;

  /**
   * Datos de catálogo de países.
   * @property {Catalogo[]} paisesDatos
   */
  public paisesDatos: Catalogo[] = [];

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
   * Datos de catálogo de códigos postales.
   * @property {Catalogo[]} codigosPostalesDatos
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * Arreglo que almacena la lista de destinatarios.
   * @property {Destinatario[]} destinatarios
   */
  destinatarios: Destinatario[] = [];

  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = false;

  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<
    Destinatario[]
  >();

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
  public elementosNoRequeridos:string[]=[]

  /**
   * Arreglo que almacena los elementos requeridos.
   * @type {string[]}
   */
  public elementosRequeridos: string[] = [];


  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Servicio que maneja las actualizaciones de estado para "Tramite260204".
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado de "Tramite260204".
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    //constructor necesario para el servicio
  }

  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(): void {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    const VALOR_FORMULARIO = this.agregarDestinatarioFinal.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; // Valor por defecto si tipoPersona es otro
    }
    const NUEVO_DESTINATARIO: Destinatario = {
      nombreRazonSocial:nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      curp: '',
      telefono:
        `${VALOR_FORMULARIO.lada} ${VALOR_FORMULARIO.telefono}`.trim(),
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      entidadFederativa: '',
      estadoLocalidad: VALOR_FORMULARIO.estado,
      codigoPostal: VALOR_FORMULARIO.codigoPostal,
      coloniaEquivalente: VALOR_FORMULARIO.codigoPostal,
    };

    this.destinatarios.push(NUEVO_DESTINATARIO);
    this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.validarElementos();
    this.crearAgregarFormularioAgregarDestinatarioFinal();
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.unsubscribe$)`.
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
   * @method crearAgregarFormularioAgregarDestinatarioFinal
   * @description
   * This method initializes the `FormGroup` for the "Agregar Destinatario Final" component. 
   * It sets up the form controls with their default values, validation rules, and disabled states 
   * based on the `elementosDeshabilitados` and `elementosNoRequeridos` arrays.
   * @returns {void} This method does not return any value.
   */
  crearAgregarFormularioAgregarDestinatarioFinal(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: [
        {
          value: this.elementosDeshabilitados.includes('nombres')
            ? 'EUROFOODZDEMEXICO'
            : '',
          disabled: this.elementosDeshabilitados.includes('nombres'),
        },
        [Validators.required, Validators.maxLength(200)],
      ],
      denominacionRazon: ['', Validators.required],
      primerApellido: [
        {
          value: this.elementosDeshabilitados.includes('pais')
            ? 'GONZALES'
            : '',
          disabled: this.elementosDeshabilitados.includes('pais'),
        },
        [Validators.required],
      ],
      segundoApellido: [
        {
          value: this.elementosDeshabilitados.includes('segundoApellido')
            ? 'PINAL'
            : '',
          disabled: this.elementosDeshabilitados.includes('segundoApellido'),
        },
      ],
      pais: [
        {
          value: this.elementosDeshabilitados.includes('pais') ? '1' : '',
          disabled: this.elementosDeshabilitados.includes('pais'),
        },
        Validators.required,
      ],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [
        '',
        !this.elementosNoRequeridos.includes('colonia')
          ? [Validators.required]
          : [],
      ],
      calle: [
        '',
        this.elementosRequeridos.includes('calle')
          ? [Validators.required]
          : [],
      ],
      numeroExterior: [
        '',
        this.elementosRequeridos.includes('numeroExterior')
          ? [Validators.required]
          : [],
      ],
      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: [
        {
          value: this.elementosDeshabilitados.includes('telefono')
            ? '3461235'
            : '',
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
      ],
      correoElectronico: [
        {
          value: this.elementosDeshabilitados.includes('correoElectronico')
            ? 'abc@njk.com'
            : '',
          disabled: this.elementosDeshabilitados.includes('correoElectronico'),
        },
        [Validators.required, Validators.email],
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
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['colonia'];
        break;
      case 260201:
        this.elementosDeshabilitados = [
          'pais',
          'estado',
          'municipio',
          'telefono',
          'correoElectronico',
          'nombres',
          'primerApellido',
          'segundoApellido',
        ];
        this.elementosNoRequeridos = ['localidad', 'colonia'];
        break;
        case 260219:
          this.elementosRequeridos = ['calle', 'numeroExterior'];
          this.elementosDeshabilitados = ['pais'];
          this.elementosNoRequeridos = ['colonia'];
        break;
      default:
        this.elementosDeshabilitados = [];
        this.elementosNoRequeridos = [];
        this.elementosRequeridos = [];
    }
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
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
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
