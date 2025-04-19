/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component,OnDestroy, OnInit } from '@angular/core';

import { map, Subject } from 'rxjs';

import { REGEX_ALTO, REGEX_ANCHO, REGEX_ANO_DE_CREACION, REGEX_AVALUO, REGEX_DIAMETRO, REGEX_PROFUNDIDAD } from '@libs/shared/data-access-user/src';
import { takeUntil } from 'rxjs';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  SolicitanteComponent,
} from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TableComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import { OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/aviso-siglos.enum';

import { AlertComponent } from '@libs/shared/data-access-user/src';

import { ModalComponent } from '../modal/modal.component';

import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';

import { TablaDatos } from '../../models/aviso-siglos.models';

import { Agregar270301Store, solicitud270301State } from '../../estados/tramites/agregar270301.store';

import { AgregarQuery } from '../../estados/queries/agregar.query';

export interface ObraTablaDatos {
  columns: string[];
}

/**
 * Constante que contiene el texto del manifiesto de alerta sobre la propiedad y datos técnicos de la obra(s).
 *
 * @constant {string} MANIFIESTO_ALERT
 */
const MANIFIESTO_ALERT =
  'Manifiesto que la información sobre la propiedad de la obra(s) y los datos técnicos de la obra(s) son ciertos y verdaderos.*';

/**
 * Constante que almacena el texto de alerta sobre la obra de arte.
 * Este mensaje advierte sobre la importancia de proporcionar las medidas de cada pieza para evitar afectar la dictaminación de la solicitud.
 *
 * @constant {string} OBRA_DE_ARTE_ALERT
 */
const OBRA_DE_ARTE_ALERT =
  'Nota: Es indispensable proporcionar las medidas de cada pieza, ya que de no hacerlo se puede afectar la dictaminación de su solicitud';

@Component({
  selector: 'app-datos-de-la-solicitud-plastica',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TableComponent,
    TablaDinamicaComponent,
    TituloComponent,
    ReactiveFormsModule,
    AlertComponent,
    ModalComponent,
    InputRadioComponent,
    SolicitanteComponent,
  ],
  templateUrl: './datos-de-la-solicitud-plastica.component.html',
  styleUrl: './datos-de-la-solicitud-plastica.component.scss',
})

/**
 * @component DatosDeLaSolicitudComponent
 * @description
 * Componente que gestiona los datos relacionados con la solicitud de trámite.
 * Proporciona funcionalidad para mostrar información de tablas, modales y formularios.
 */
export class DatosDeLaSolicitudPlasticaComponent implements OnInit, OnDestroy {
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();

  public solicitudState!: solicitud270301State;

  /**
   * @property {boolean} showTableDiv
   * @description
   * Indica si el contenedor de la tabla debe estar visible.
   * @default true
   */
  showTableDiv = true;

  /**
   * @property {boolean} showObraDeArteModal
   * @description
   * Indica si el modal de la obra de arte está visible o no.
   * @default false
   */
  showObraDeArteModal = false;

  /**
   * @property {Catalogo[]} operacionData
   * @description
   * Almacena los datos relacionados con las operaciones.
   * @default []
   */
  operacionData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} movimientoData
   * @description
   * Almacena los datos relacionados con los movimientos.
   * @default []
   */
  movimientoData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} motivoData
   * @description
   * Almacena los datos relacionados con los motivos.
   * @default []
   */
  motivoData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} paisData
   * @description
   * Almacena los datos relacionados con los países.
   * @default []
   */
  paisData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} transporteData
   * @description
   * Almacena los datos relacionados con los transportes.
   * @default []
   */
  transporteData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} aduanaData
   * @description
   * Almacena los datos relacionados con las aduanas.
   * @default []
   */
  aduanaData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} monedaData
   * @description
   * Almacena los datos relacionados con las monedas.
   * @default []
   */
  monedaData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} arancelariaData
   * @description
   * Almacena los datos relacionados con las fracciones arancelarias.
   * @default []
   */
  arancelariaData: Catalogo[] = [];

  /**
   * @property {string} TEXTO_MANIFIESTO_ALERT
   * @description
   * Contiene el texto del manifiesto de alerta.
   */
  TEXTO_MANIFIESTO_ALERT = MANIFIESTO_ALERT;

  /**
   * @property {string} TEXTO_OBRA_ALERT
   * @description
   * Contiene el texto de alerta relacionado con las obras de arte.
   */
  TEXTO_OBRA_ALERT = OBRA_DE_ARTE_ALERT;

  /**
   * @property {Array} opcionDeBotonDeRadio
   * @description
   * Contiene las opciones disponibles para un botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * @property {FormGroup} solicitudFormGroup
   * @description
   * Representa el formulario reactivo principal para la solicitud.
   */
  solicitudFormGroup!: FormGroup;

  /**
   * @property {FormGroup} obraDeArteFormgroup
   * @description
   * Representa el formulario reactivo para gestionar datos de las obras de arte.
   */
  obraDeArteFormgroup!: FormGroup;

  /**
   * @property {string[]} tablaObraDeArteData
   * @description
   * Esta propiedad es un arreglo que almacena datos relacionados con las obras de arte.
   * Se utiliza para manejar y mostrar información sobre diferentes obras de arte en la aplicación.
   * Inicialmente, el arreglo está vacío y puede ser llenado con datos en tiempo de ejecución.
   */
  tablaObraDeArteData: string[] = [];

  /**
   * @constructor
   * @description
   * Inicializa el componente con las dependencias necesarias para gestionar el formulario,
   * el estado del trámite, y los servicios asociados. Se pueden agregar más detalles
   * o lógica al constructor según sea necesario.
   *
   * @param {FormBuilder} fb - Utilizado para construir y gestionar formularios reactivos.
   * @param {Agregar270301Store} Agregar270301Store - Almacén que gestiona el estado del trámite 270201.
   * @param {SolicitudService} solicitudService - Servicio encargado de realizar solicitudes HTTP
   * y obtener datos relacionados con el trámite.
   */
  constructor(
    private fb: FormBuilder,
    private Agregar270301Store: Agregar270301Store,
    private agregarQuery: AgregarQuery,
    private solicitudService: SolicitudService
  ) {
    // La lógica del constructor se puede añadir aquí si es necesario
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida que se ejecuta una vez que el componente ha sido inicializado.
   * Este método realiza múltiples acciones, como la suscripción a servicios para obtener datos,
   * la inicialización de formularios reactivos y la configuración de textos de alerta.
   *
   * @example
   * Uso dentro del componente:
   * ```
   * ngOnInit(): void {
   *   this.solicitudService.getOperacionData().subscribe((data) => {
   *     this.operacionData = data;
   *   });
   * }
   * ```
   */
  ngOnInit(): void {
    /**
     * @description
     * Obtiene los datos de las columnas para la tabla de obras de arte desde el servicio de solicitud.
     * Actualiza la propiedad `tablaObraDeArteData` con los datos recibidos.
     */
    this.agregarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState as solicitud270301State ;
        })
      )
      .subscribe();
    this.solicitudService
      .getObraDeArteTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ObraTablaDatos) => {
        this.tablaObraDeArteData = data.columns;
      });

    /**
     * Obtiene los datos de operación desde el servicio y los asigna a `operacionData`.
     */
    this.solicitudService.getOperacionData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.operacionData = data;
    });

    /**
     * Obtiene los datos de movimiento desde el servicio y los asigna a `movimientoData`.
     */
    this.solicitudService.getMovimientoData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.movimientoData = data;
    });

    /**
     * Obtiene los datos de país desde el servicio y los asigna a `paisData`.
     */
    this.solicitudService.getPaisData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.paisData = data;
    });

    /**
     * Obtiene los datos de transporte desde el servicio y los asigna a `transporteData`.
     */
    this.solicitudService.getTransporteData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.transporteData = data;
    });

    /**
     * Obtiene los datos de aduana desde el servicio y los asigna a `aduanaData`.
     */
    this.solicitudService.getAduanaData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.aduanaData = data;
    });

    /**
     * Obtiene los datos de motivo desde el servicio y los asigna a `motivoData`.
     */
    this.solicitudService.getMotivoData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.motivoData = data;
    });

    /**
     * Obtiene los datos de moneda desde el servicio y los asigna a `monedaData`.
     */
    this.solicitudService.getMonedaData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.monedaData = data;
    });

    /**
     * Obtiene los datos de fracciones arancelarias desde el servicio y los asigna a `arancelariaData`.
     */
    this.solicitudService.getArancelariaData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.arancelariaData = data;
    });

    /**
     * Inicializa el formulario reactivo principal para gestionar la solicitud.
     */
    this.initializeSolicitudFormGroup();

    /**
     * Inicializa el formulario reactivo para gestionar datos de las obras de arte.
     */
    this.initializeObraDeArteFormGroup();

    /**
     * Configura el texto HTML para el mensaje del manifiesto de alerta.
     */
    this.TEXTO_MANIFIESTO_ALERT = `
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="manifiestoCheckbox">
        <p>Manifiesto que la información sobre la propiedád de la obra(s) y los datos técnicos de la obra(s) son ciertos y verdaderos.*</p>
      </div>
    </div>
  `;
  }

  /**
   * @method initializeSolicitudFormGroup
   * @description
   * Método encargado de inicializar el grupo de formularios reactivos para la solicitud.
   * Define los controles y validaciones requeridas para cada campo del formulario.
   * Este formulario se utiliza para capturar datos clave relacionados con el trámite 270201.
   *
   * @example
   * Uso del método:
   * ```
   * this.initializeSolicitudFormGroup();
   * console.log(this.solicitudFormGroup.value);
   * ```
   */
  initializeSolicitudFormGroup(): void {
    /**
     * @property {FormGroup} solicitudFormGroup
     * @description
     * Grupo de formularios reactivos que contiene los siguientes controles:
     *
     * - tipoDeOperacion: Representa el tipo de operación seleccionada.
     * - tipoDeMovimiento: Representa el tipo de movimiento seleccionado.
     * - motivo: Captura el motivo del trámite.
     * - pais: Almacena el país relacionado con el trámite.
     * - ciudad: Captura la ciudad asociada al trámite.
     * - medioTransporte: Representa el transporte utilizado en el trámite.
     * - aduanaEntrada: Define la aduana de entrada correspondiente al trámite.
     *
     * Cada control incluye validaciones utilizando la clase `Validators`.
     */
    this.solicitudFormGroup = this.fb.group({
      /**
       * @control tipoDeOperacion
       * @description
       * Control reactivo para el tipo de operación seleccionada.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      // nombre: [this.solicitudState?.nombre || '', [Validators.required]],
      tipoDeOperacion: new FormControl( this.solicitudState?.tipoDeOperacion ||'', [Validators.required]),

      /**
       * @control tipoDeMovimiento
       * @description
       * Control reactivo para el tipo de movimiento seleccionado.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      tipoDeMovimiento: new FormControl( this.solicitudState?.tipoDeMovimiento ||'', [Validators.required]),

      /**
       * @control motivo
       * @description
       * Control reactivo para capturar el motivo del trámite.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      motivo: new FormControl(this.solicitudState?.motivo ||'', [Validators.required]),

      /**
       * @control pais
       * @description
       * Control reactivo para almacenar el país relacionado con el trámite.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      pais: new FormControl(this.solicitudState?.pais ||'', [Validators.required]),

      /**
       * @control ciudad
       * @description
       * Control reactivo para capturar la ciudad asociada al trámite.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      ciudad: new FormControl(this.solicitudState?.ciudad ||'', [
        Validators.required,
        Validators.maxLength(250),
      ]),

      medioTransporte: new FormControl(this.solicitudState?.medioTransporte ||'', [Validators.required]),

      /**
       * @control medioTransporte
       * @description
       * Control reactivo para representar el transporte utilizado en el trámite.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      emprsaTransportista: new FormControl(this.solicitudState?.emprsaTransportista ||'', [Validators.required]),

      destinofinal: new FormControl(this.solicitudState?.destinofinal ||'', [Validators.required]),

      periodoEstancia: new FormControl(this.solicitudState?.periodoEstancia ||'', [Validators.required]),

      /**
       * @control aduanaEntrada
       * @description
       * Control reactivo para definir la aduana de entrada correspondiente al trámite.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      aduanaEntrada: new FormControl(this.solicitudState?.aduanaEntrada ||'', [Validators.required]),
    });
  }

  /**
   * @method initializeObraDeArteFormGroup
   * @description
   * Método encargado de inicializar el grupo de formularios reactivos para capturar los datos
   * de una obra de arte. Define los controles y las validaciones requeridas para cada campo del
   * formulario. Este formulario asegura que los datos relacionados con la obra de arte sean
   * registrados de manera precisa y cumplan con las reglas de validación.
   *
   * @example
   * Uso del método:
   * ```
   * this.initializeObraDeArteFormGroup();
   * console.log(this.obraDeArteFormgroup.value);
   * ```
   */
  initializeObraDeArteFormGroup(): void {
    /**
     * @property {FormGroup} obraDeArteFormgroup
     * @description
     * Grupo de formularios reactivos que contiene los siguientes controles:
     *
     * - autor: Nombre del autor de la obra.
     * - titulo: Título de la obra de arte.
     * - tecnicaDeRealizacion: Técnica utilizada en la realización de la obra.
     * - medidas: Dimensiones generales de la obra.
     * - alto: Altura de la obra en centímetros.
     * - ancho: Anchura de la obra en centímetros.
     * - profundidad: Profundidad de la obra en centímetros.
     * - diametro: Diámetro de la obra en centímetros.
     * - variables: Variables adicionales relacionadas con la obra.
     * - anoDeCreacion: Año en el que la obra fue creada.
     * - avaluo: Valor estimado de la obra.
     * - moneda: Moneda utilizada en el avalúo.
     * - propietario: Propietario actual de la obra.
     * - fraccionArancelaria: Fracción arancelaria asociada a la obra.
     * - descripcionArancelaria: Descripción detallada de la fracción arancelaria.
     *
     * Todos los controles incluyen validaciones utilizando la clase `Validators` para asegurar
     * que los datos sean válidos.
     */
    this.obraDeArteFormgroup = this.fb.group({
      /**
       * @control autor
       * @description
       * Control reactivo para registrar el nombre del autor de la obra.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      autor: ['', [Validators.required, Validators.maxLength(250)]],

      /**
       * @control titulo
       * @description
       * Control reactivo para registrar el título de la obra de arte.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      titulo: ['', [Validators.required, Validators.maxLength(250)]],

      /**
       * @control tecnicaDeRealizacion
       * @description
       * Control reactivo para registrar la técnica utilizada en la realización de la obra.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      tecnicaDeRealizacion: [
        '',
        [Validators.required, Validators.maxLength(250)],
      ],

      /**
       * @control medidas
       * @description
       * Control reactivo para registrar las dimensiones generales de la obra.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      medidas: ['1', [Validators.required]],

      /**
       * @control alto
       * @description
       * Control reactivo para registrar la altura de la obra en centímetros.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      alto: [
        '',
        [Validators.required, Validators.pattern(REGEX_ALTO)],
      ],

      /**
       * @control ancho
       * @description
       * Control reactivo para registrar la anchura de la obra en centímetros.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      ancho: [
        '',
        [Validators.required, Validators.pattern(REGEX_ANCHO)],
      ],

      /**
       * @control profundidad
       * @description
       * Control reactivo para registrar la profundidad de la obra en centímetros.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      profundidad: [
        '',
        [Validators.required, Validators.pattern(REGEX_PROFUNDIDAD)],
      ],

      /**
       * @control diametro
       * @description
       * Control reactivo para registrar el diámetro de la obra en centímetros.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      diametro: [
        '',
        [Validators.required, Validators.pattern(REGEX_DIAMETRO)],
      ],

      /**
       * @control variables
       * @description
       * Control reactivo para registrar variables adicionales relacionadas con la obra.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      variables: ['', [Validators.required, Validators.maxLength(150)]],

      /**
       * @control anoDeCreacion
       * @description
       * Control reactivo para registrar el año de creación de la obra de arte.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      anoDeCreacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern(REGEX_ANO_DE_CREACION),
        ],
      ],

      /**
       * @control avaluo
       * @description
       * Control reactivo para registrar el valor estimado de la obra de arte.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      avaluo: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(REGEX_AVALUO),
        ],
      ],

      /**
       * @control moneda
       * @description
       * Control reactivo para registrar la moneda utilizada en el avalúo.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      moneda: ['', [Validators.required]],

      /**
       * @control propietario
       * @description
       * Control reactivo para registrar el propietario actual de la obra de arte.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      propietario: ['', [Validators.required, Validators.maxLength(250)]],

      /**
       * @control fraccionArancelaria
       * @description
       * Control reactivo para registrar la fracción arancelaria asociada a la obra.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      fraccionArancelaria: ['', [Validators.required]],

      /**
       * @control descripcionArancelaria
       * @description
       * Control reactivo para registrar una descripción detallada de la fracción arancelaria.
       * Es obligatorio y debe ser completado.
       * @default ''
       */
      descripcionArancelaria: ['', [Validators.required]],
    });
  }

 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar270301Store): void {
    const VALOR = form.get(campo)?.value;
    (this.Agregar270301Store[metodoNombre] as (value: string) => void)(VALOR);
  }

/**
   * Arreglo que almacena los datos de las filas de la tabla de obras de arte.
   *
   * @type {TablaDatos[]}
   */
  obraDeArteRowData: TablaDatos[] = [];

  /**
   * Función que alterna la visibilidad del div de la tabla y el modal de obras de arte.
   * Cambia el estado de `showTableDiv` y `showObraDeArteModal` a su valor opuesto.
   *
   * @returns {void}
   */
  toggleObraDeArte(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showObraDeArteModal = !this.showObraDeArteModal;
  }

  /**
   * Función que maneja el envío del formulario de obra de arte.
   * Esta función procesa los datos del formulario, crea un objeto con los datos de la obra de arte,
   * y actualiza la lista de obras de arte en la tabla.
   *
   * @returns {void}
   */
  submitDeArteForm(): void {
    /**
     * Obtiene el valor de la etiqueta de las medidas seleccionadas en el formulario.
     */
    const MEDIDAS_VALUE = OPCIONES_DE_BOTON_DE_RADIO.find(
      (option) => option.value === this.obraDeArteFormgroup.value.medidas
    )?.label;

    /**
     * Obtiene la descripción de la fracción arancelaria seleccionada en el formulario.
     */
    const ARANCELARIA_VALUE = this.arancelariaData.find(
      (item: Catalogo) =>
        item.id === this.obraDeArteFormgroup.value.fraccionArancelaria
    )?.descripcion;

    /**
     * Obtiene la descripción de la moneda seleccionada en el formulario.
     */
    const MONEDA_VALUE = this.monedaData.find(
      (item: Catalogo) => item.id === this.obraDeArteFormgroup.value.moneda
    )?.descripcion;

    /**
     * Crea un objeto que representa una fila en la tabla de obras de arte.
     * Este objeto contiene los datos relevantes de la obra de arte.
     */
    const OBRA_DE_ARTE_ROW = {
      tbodyData: [
        this.obraDeArteFormgroup.value.autor,
        this.obraDeArteFormgroup.value.titulo,
        this.obraDeArteFormgroup.value.tecnicaDeRealizacion,
        MEDIDAS_VALUE,
        this.obraDeArteFormgroup.value.ancho,
        this.obraDeArteFormgroup.value.alto,
        this.obraDeArteFormgroup.value.profundidad,
        this.obraDeArteFormgroup.value.diametro,
        this.obraDeArteFormgroup.value.variables,
        this.obraDeArteFormgroup.value.anoDeCreacion,
        this.obraDeArteFormgroup.value.avaluo,
        MONEDA_VALUE,
        this.obraDeArteFormgroup.value.propietario,
        ARANCELARIA_VALUE,
        this.obraDeArteFormgroup.value.descripcionArancelaria,
      ],
    };

    /**
     * Agrega la nueva obra de arte a la lista de obras de arte.
     */
    this.obraDeArteRowData.push(OBRA_DE_ARTE_ROW);

    /**
     * Actualiza el almacenamiento de obras de arte en la tienda.
     */
    // this.Agregar270301Store.setObraDeArte(this.obraDeArteRowData);

    /**
     * Alterna la visibilidad del div de la tabla y el modal de obras de arte.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showObraDeArteModal = !this.showObraDeArteModal;
  }
  /*
   * Método del ciclo de vida de Angular - destruye el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
