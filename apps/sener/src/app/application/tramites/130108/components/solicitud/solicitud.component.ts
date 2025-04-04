import { Catalogo, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { ExportacionMineralesDeHierroService } from '../../services/exportacion-minerales-de-hierro.service';
import { HttpClient } from '@angular/common/http';
import { PaisDeOrigenComponent } from '../../../../shared/components/pais-de-origen/pais-de-origen.component';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130108/partidas-de-la.json';

import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130108Query } from '../../estados/queries/tramite130108.query';
import { Tramite130108Store } from '../../estados/tramites/tramites130108.store';
import fractionValues from '@libs/shared/theme/assets/json/130108/fraccion_arancelaria.json';
import mercanciaCatalogoVal from '@libs/shared/theme/assets/json/130108/datos-fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130108/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130108/unidad_da.json';

import nicoCatalogoVal from '@libs/shared/theme/assets/json/130108/nico.json';



/**
 * @description Componente para gestionar la solicitud de mercancías.
 * Contiene formularios reactivos y opciones configurables relacionadas con el trámite.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /** 
  * @description Formulario reactivo principal para capturar los datos de la solicitud.
  */
  partidasDelaMercanciaForm!: FormGroup;

  /**
  * @description Referencia a un componente de selección de país de origen.
  */
  @ViewChild(PaisDeOrigenComponent) paisDeOrigenComponent!: PaisDeOrigenComponent;
  /**
   * @description Formulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;


  /**
   * @description Formulario reactivo para los detalles de la mercancía.
   */
  mercanciaForm!: FormGroup;
  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  formForTotalCount!: FormGroup;
  /**
   * Formulario reactivo para la selección de países.
   * @type {FormGroup}
   */
  paisForm!: FormGroup;
  /**
   * Formulario reactivo para la representación.
   * @type {FormGroup}
   */
  frmRepresentacionForm!: FormGroup;
  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  tableHeaderData: ConfiguracionColumna<string>[] = [];
  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  mostrarTabla = false;
  /**
   * CHECKBOX
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  checkBox = TablaSeleccion.CHECKBOX;
  /**
   * getEstablecimientoTableData
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filaSeleccionada: any;

  /**
   * @description Opciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = [];
  /**
   * @description Catálogo con valores de fracción arancelaria.
   */

  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   * @description Catálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;
  /**
   * @description Campos de entrada configurables para detalles adicionales.
   */

 /**
 * Configuración de los campos de entrada para el formulario de régimen y clasificación.
 * 
 * Esta propiedad es un arreglo de objetos que define los campos que se mostrarán en el formulario de la solicitud.
 * Cada objeto contiene información sobre el campo que se debe renderizar, incluyendo la etiqueta, el valor del placeholder,
 * si es un campo obligatorio y el nombre del control que se utilizará en el formulario reactivo.
 * 
 * Se utiliza para proporcionar una interfaz de usuario coherente y permitir que los usuarios ingresen los datos 
 * requeridos para completar una solicitud de exportación de minerales de hierro.
 * 
 * @type {Array<{label: string, placeholder: string, required: boolean, controlName: string}>}
 */
datosInputFields = [
  {
    /**
     * Etiqueta del campo que indica el régimen al que se destinará la mercancía.
     * Esta es la descripción que se muestra al usuario para identificar el campo.
     * 
     * @type {string}
     */
    label: 'Régimen al que se destinará la mercancía',

    /**
     * Texto que aparece como valor por defecto o sugerencia en el campo de entrada, 
     * para indicar al usuario qué tipo de dato debe seleccionar o ingresar.
     * 
     * @type {string}
     */
    placeholder: 'Selecciona un valor',

    /**
     * Indica si este campo es obligatorio para el usuario al momento de completar el formulario.
     * Si el campo es obligatorio, no se podrá enviar el formulario sin completarlo.
     * 
     * @type {boolean}
     */
    required: true,

    /**
     * Nombre del control dentro del formulario reactivo, utilizado para referenciar este campo en el formulario.
     * 
     * @type {string}
     */
    controlName: 'regimen',
  },
  {
    /**
     * Etiqueta del campo que indica la clasificación del régimen.
     * Esta es la descripción que se muestra al usuario para identificar el campo.
     * 
     * @type {string}
     */
    label: 'Clasificación del régimen',

    /**
     * Texto que aparece como valor por defecto o sugerencia en el campo de entrada, 
     * para indicar al usuario qué tipo de dato debe seleccionar o ingresar.
     * 
     * @type {string}
     */
    placeholder: 'Selecciona un valor',

    /**
     * Indica si este campo es obligatorio para el usuario al momento de completar el formulario.
     * Si el campo es obligatorio, no se podrá enviar el formulario sin completarlo.
     * 
     * @type {boolean}
     */
    required: true,

    /**
     * Nombre del control dentro del formulario reactivo, utilizado para referenciar este campo en el formulario.
     * 
     * @type {string}
     */
    controlName: 'clasificacion',
  },
];


  /**
* @description Campos de entrada configurables para los detalles de la mercancía.
*/
 /**
 * Array de objetos que representan los valores de entrada de los campos del formulario
 * para la creación o edición de una mercancía.
 * 
 * Cada objeto contiene información sobre el campo que debe ser mostrado en la interfaz de usuario,
 * como la etiqueta, el valor por defecto, si el campo es obligatorio, y el nombre de control 
 * asociado con el campo.
 *
 * @type {Array<{ label: string, placeholder: string, required: boolean, controlName: string }>}
 */
mercanciaInputValues = [
  /**
   * Objeto que define la información de la fracción arancelaria
   * de la mercancía.
   *
   * @type {Object}
   * @property {string} label - Etiqueta que se muestra para este campo.
   * @property {string} placeholder - Texto de sugerencia que aparece cuando el campo está vacío.
   * @property {boolean} required - Indica si este campo es obligatorio.
   * @property {string} controlName - Nombre del control en el formulario.
   */
  {
    label: 'Fracción arancelaria', // Etiqueta del campo
    placeholder: 'Selecciona un valor', // Texto que aparece cuando el campo está vacío
    required: true, // Este campo es obligatorio
    controlName: 'fraccion', // Nombre del control asociado
  },
  
  /**
   * Objeto que define la información de la unidad de medida de la tarifa (UMT)
   * de la mercancía.
   *
   * @type {Object}
   * @property {string} label - Etiqueta que se muestra para este campo.
   * @property {string} placeholder - Texto de sugerencia que aparece cuando el campo está vacío.
   * @property {boolean} required - Indica si este campo es obligatorio.
   * @property {string} controlName - Nombre del control en el formulario.
   */
  {
    label: 'Unidad de medida de la tarifa (UMT)', // Etiqueta del campo
    placeholder: 'Selecciona un valor', // Texto de sugerencia
    required: true, // Este campo es obligatorio
    controlName: 'umt', // Nombre del control asociado
  },
  
  /**
   * Objeto que define la información del NICO de la mercancía.
   *
   * @type {Object}
   * @property {string} label - Etiqueta que se muestra para este campo.
   * @property {string} placeholder - Texto de sugerencia que aparece cuando el campo está vacío.
   * @property {boolean} required - Indica si este campo es obligatorio.
   * @property {string} controlName - Nombre del control en el formulario.
   */
  {
    label: 'NICO', // Etiqueta del campo
    placeholder: 'Selecciona un valor', // Texto de sugerencia
    required: true, // Este campo es obligatorio
    controlName: 'nico', // Nombre del control asociado
  },
];


  /**
   * @description Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   * @description Opciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   * @description Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();
  /**
   * @description Arreglo que almacena un catálogo de elementosDeBloque.
   * @type {Catalogo[]}
   */
  elementosDeBloque: Catalogo[] = [];
  /**
   * @description Arreglo que contiene un catálogo de países organizados por bloque.
   * @type {Catalogo[]}
   */
  todasLasCiudades: Catalogo[] = [];
  paisesPorBloque: Catalogo[] = [];
  /**
   * @description Arreglo que guarda un catálogo de entidades federativas.
   * @type {Catalogo[]}
   */
  estado: Catalogo[] = [];
  /**
   * @description Arreglo que almacena un catálogo de representaciones federales.
   * @type {Catalogo[]}
   */
  representacionFederal: Catalogo[] = [];
  /**
   * @description Arreglo de cadenas que representa las opciones seleccionables de rangos de días.
   * @type {string[]}
   */
  selectRangoDias: string[] = [];
  /**
   * @description Objeto o constante que contiene los textos utilizados en la aplicación.
   * @type {any}
   */
  TEXTOS = TEXTOS;
  mercanciaCatalogoArray: Catalogo[][] = mercanciaCatalogoVal as Catalogo[][];
  nicoCatalogoArray: Catalogo[] = nicoCatalogoVal as Catalogo[];

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {HttpClient} http - Servicio para realizar solicitudes HTTP.
   * @param {tramite130108Store} tramite130108Store - Store para gestionar el estado del trámite 130202.
   * @param {tramite130108Query} tramite130108Query - Query para consultar el estado del trámite 130202.
   * @param {ExportacionMineralesDeHierroService} exportacionMineralesDeHierroService - Servicio para la exportación de minerales de hierro.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130108Store: Tramite130108Store,
    private tramite130108Query: Tramite130108Query,
    private exportacionMineralesDeHierroService: ExportacionMineralesDeHierroService
  ) {
    //constructor
  }
  /**
   * @description Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.inicializarFormularios();
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calcularTotales();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();
    this.tramite130108Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

    this.tramite130108Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidadPartidasDeLaMercancia:
              seccionState.cantidadPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia:
              seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia:
              seccionState.descripcionPartidasDeLaMercancia,
          });
        })
      )
      .subscribe();
  }

  /**
   * @description Inicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
   */

 /**
 * Método que inicializa todos los formularios reactivos utilizados en el componente.
 * Este método configura los formularios con sus respectivos controles y validadores.
 * Se utilizan formularios reactivos de Angular (FormGroup y FormControl) y validadores para asegurar
 * la validez de los datos antes de enviarlos al backend.
 * 
 * @returns {void} No retorna ningún valor, solo inicializa los formularios.
 */
inicializarFormularios(): void {
  // Inicialización del formulario principal del trámite
  this.formDelTramite = this.fb.group({
    /**
     * Solicitud del trámite.
     * @type {string}
     * @description Campo obligatorio para ingresar el tipo de solicitud.
     */
    solicitud: ['', Validators.required],

    /**
     * Régimen de la solicitud.
     * @type {string}
     * @description Campo obligatorio que especifica el régimen del trámite.
     */
    regimen: ['', Validators.required],

    /**
     * Clasificación del trámite.
     * @type {string}
     * @description Campo obligatorio que define la clasificación del trámite.
     */
    clasificacion: ['', Validators.required],
  });

  // Inicialización del formulario de mercancía
  this.mercanciaForm = this.fb.group({
    /**
     * Plazo de la mercancía.
     * @type {string}
     * @description Campo obligatorio que define el plazo de la mercancía (por defecto "Largo plazo (5 años)").
     */
    plazo: ['Largo plazo (5 años)', Validators.required],

    /**
     * Descripción de la mercancía.
     * @type {string}
     * @description Campo obligatorio con una longitud mínima de 10 caracteres y máxima de 500.
     * Se utiliza para detallar la mercancía.
     */
    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ],
    ],

    /**
     * Fracción de la mercancía.
     * @type {string}
     * @description Campo obligatorio que especifica la fracción de la mercancía.
     */
    fraccion: ['', Validators.required],

    /**
     * Cantidad de la mercancía.
     * @type {number}
     * @description Campo obligatorio, solo permite números enteros mayores a 0.
     */
    cantidad: [
      '',
      [
        Validators.required,
        Validators.pattern(REG_X.SOLO_NUMEROS),
        Validators.min(1),
      ],
    ],

    /**
     * Valor de la factura en USD.
     * @type {number}
     * @description Campo obligatorio que valida un formato decimal con hasta 2 lugares decimales.
     * El valor mínimo permitido es 0.01 USD.
     */
    valorFacturaUSD: [
      '',
      [
        Validators.required,
        Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
        Validators.min(0.01),
      ],
    ],

    /**
     * Unidad de medida de la mercancía.
     * @type {string}
     * @description Campo obligatorio para definir la unidad de medida de la mercancía.
     */
    unidadMedida: ['', Validators.required],

    /**
     * Número de identificación del cliente (NICo).
     * @type {string}
     * @description Campo obligatorio para ingresar el número de identificación del cliente.
     */
    nico: ['', Validators.required],
  });

  // Inicialización del formulario de partidas de la mercancía
  this.partidasDelaMercanciaForm = this.fb.group({
    /**
     * Cantidad de partidas de la mercancía.
     * @type {number}
     * @description Campo obligatorio que define la cantidad de partidas. Solo permite números enteros.
     * La longitud máxima es de 18 caracteres.
     */
    cantidadPartidasDeLaMercancia: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(18),
      ],
    ],

    /**
     * Descripción de las partidas de la mercancía.
     * @type {string}
     * @description Campo obligatorio con una longitud máxima de 255 caracteres.
     * Detalla las partidas específicas de la mercancía.
     */
    descripcionPartidasDeLaMercancia: [
      '',
      [Validators.required, Validators.maxLength(255)],
    ],

    /**
     * Valor de las partidas en USD.
     * @type {number}
     * @description Campo obligatorio, valida un número decimal con hasta 2 lugares decimales.
     * El valor mínimo es 0.
     */
    valorPartidaUSDPartidasDeLaMercancia: [
      '',
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        Validators.maxLength(20),
      ],
    ],
  });

  // Inicialización del formulario de país
  this.paisForm = this.fb.group({
    /**
     * Bloque de importación o exportación.
     * @type {string}
     * @description Campo opcional para indicar el bloque en el que se realiza la importación o exportación.
     */
    bloque: [''],

    /**
     * Uso específico de la mercancía.
     * @type {string}
     * @description Campo obligatorio para detallar el uso específico de la mercancía.
     */
    usoEspecifico: ['', Validators.required],

    /**
     * Justificación de la importación o exportación.
     * @type {string}
     * @description Campo obligatorio que describe la justificación para la importación o exportación.
     */
    justificacionImportacionExportacion: ['', [Validators.required]],

    /**
     * Observaciones adicionales.
     * @type {string}
     * @description Campo opcional para añadir cualquier observación adicional sobre el trámite.
     */
    observaciones: [''],
  });

  // Inicialización del formulario de representación
  this.frmRepresentacionForm = this.fb.group({
    /**
     * Entidad a la que se hace referencia.
     * @type {string}
     * @description Campo obligatorio para definir la entidad relacionada con la representación.
     */
    entidad: ['', Validators.required],

    /**
     * Representación asociada a la entidad.
     * @type {string}
     * @description Campo obligatorio para especificar la representación legal o institucional de la entidad.
     */
    representacion: ['', Validators.required],
  });
}

  /**
   * @description Configura las suscripciones para actualizar formularios y almacenar estados.
   */
 /**
 * Método que configura las suscripciones para actualizar los formularios reactivos y el estado del trámite.
 * Este método escucha los cambios en los observables del servicio `tramite130108Query` y actualiza los valores 
 * de los formularios utilizando el método `patchValue` sin emitir eventos adicionales. Además, se suscribe a los 
 * cambios en los formularios para actualizar el estado en el `tramite130108Store`.
 * 
 * @returns {void} No retorna ningún valor, solo suscribe los observables y actualiza los formularios y el estado.
 */
configuracionFormularioSuscripciones(): void {
  // Suscripción para actualizar el valor del formulario del trámite con el valor de solicitud.
  this.tramite130108Query.solicitud$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((solicitud) => {
      /**
       * Actualiza el campo 'solicitud' del formulario sin emitir un evento.
       * 
       * @param {string} solicitud - Valor de la solicitud que se asignará al formulario.
       */
      this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
    });

  // Suscripción para actualizar el valor del formulario del trámite con el valor del régimen.
  this.tramite130108Query.regimen$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((regimen) => {
      /**
       * Actualiza el campo 'regimen' del formulario sin emitir un evento.
       * 
       * @param {string} regimen - Valor del régimen que se asignará al formulario.
       */
      this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
    });

  // Suscripción para actualizar el valor del formulario del trámite con el valor de clasificación.
  this.tramite130108Query.clasificacion$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((clasificacion) => {
      /**
       * Actualiza el campo 'clasificacion' del formulario sin emitir un evento.
       * 
       * @param {string} clasificacion - Valor de la clasificación que se asignará al formulario.
       */
      this.formDelTramite.patchValue({ clasificacion }, { emitEvent: false });
    });

  // Suscripción para actualizar el formulario de mercancía con el estado de la mercancía.
  this.tramite130108Query.mercanciaState$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((state) => {
      /**
       * Actualiza los campos del formulario de mercancía con los valores provenientes del estado.
       * 
       * @param {MercanciaState} state - Objeto que contiene los valores a asignar a los campos del formulario.
       * 
       * @description Se asignan los valores del estado de la mercancía, transformando ciertos valores,
       * como el valor de la factura, que se convierte en un string si está presente.
       */
      this.mercanciaForm.patchValue(
        {
          plazo: state.plazo,
          descripcion: state.descripcion,
          fraccion: state.fraccion,
          cantidad: state.cantidad,
          valorFacturaUSD: state.valorPartidaUSD ? state.valorPartidaUSD.toString() : '',
          unidadMedida: state.unidadMedida,
        },
        { emitEvent: false }
      );
    });

  // Suscripción para actualizar el formulario del país con el estado de la solicitud.
  this.tramite130108Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        /**
         * Actualiza los campos del formulario de país con los valores de la sección correspondiente.
         * 
         * @param {SolicitudState} seccionState - Objeto que contiene los valores a asignar a los campos del formulario.
         */
        this.paisForm.patchValue({
          bloque: seccionState.bloque,
          usoEspecifico: seccionState.usoEspecifico,
          justificacionImportacionExportacion: seccionState.justificacionImportacionExportacion,
          observaciones: seccionState.observaciones,
        });
      })
    )
    .subscribe();

  // Suscripción para actualizar el formulario de representación con el estado de la solicitud.
  this.tramite130108Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        /**
         * Actualiza los campos del formulario de representación con los valores de la sección correspondiente.
         * 
         * @param {SolicitudState} seccionState - Objeto que contiene los valores a asignar a los campos del formulario.
         */
        this.frmRepresentacionForm.patchValue({
          entidad: seccionState.entidad,
          representacion: seccionState.representacion,
        });
      })
    )
    .subscribe();

  // Suscripción para escuchar cambios en el formulario principal y actualizar el estado en el store.
  this.formDelTramite.valueChanges
    .pipe(takeUntil(this.destroyed$))
    .subscribe((value) => {
      /**
       * Actualiza el estado global del trámite en el store cuando el formulario principal cambia.
       * 
       * @param {TramiteFormValue} value - Los nuevos valores del formulario principal que se deben almacenar.
       */
      this.tramite130108Store.updateState({
        solicitud: value.solicitud,
        regimen: value.regimen,
        clasificacion: value.clasificacion,
      });
    });

  // Suscripción para escuchar cambios en el formulario de mercancía y actualizar el estado en el store.
  this.mercanciaForm.valueChanges
    .pipe(takeUntil(this.destroyed$))
    .subscribe((value) => {
      /**
       * Actualiza el estado global de la mercancía en el store cuando el formulario de mercancía cambia.
       * 
       * @param {MercanciaFormValue} value - Los nuevos valores del formulario de mercancía que se deben almacenar.
       */
      this.tramite130108Store.updateState({
        plazo: value.plazo,
        descripcion: value.descripcion,
        fraccion: value.fraccion,
        cantidad: value.cantidad,
        valorPartidaUSD: parseFloat(value.valorFacturaUSD) || 0,
        unidadMedida: value.unidadMedida,
      });
    });
}

  /**
   * formularioTotalCount
   * Crea el formulario reactivo para capturar los totales de las partidas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  /**
   * getEstablecimiento
   * Configura los datos de la tabla dinámica a partir de un archivo JSON.
   */
 /**
 * Método que obtiene los datos de la tabla para el establecimiento.
 * Este método configura los encabezados de la tabla (`tableHeaderData`) y las filas del cuerpo de la tabla (`tableBodyData`).
 * Los encabezados de la tabla se extraen del objeto `getEstablecimientoTableData.tableHeader`, y se asignan claves a cada fila
 * utilizando el índice de la columna. Además, el cuerpo de la tabla se asigna directamente desde `getEstablecimientoTableData.tableBody`.
 * 
 * @returns {void} No retorna ningún valor, solo configura los datos de la tabla.
 */
getEstablecimiento(): void {
  // Configuración de los encabezados de la tabla.
  this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
    (header, index) => ({
      /**
       * Encabezado de la columna.
       * @type {string}
       * @description El encabezado que se mostrará en la tabla.
       */
      encabezado: header,

      /**
       * Clave que se utiliza para obtener los datos de la fila correspondiente a la columna.
       * 
       * @param {any} fila - Una fila de datos que contiene información que corresponde a las columnas.
       * @returns {string} El valor de la celda correspondiente a la columna en la fila.
       * @description La clave se genera utilizando el índice de la columna para acceder al valor de la fila en el cuerpo de la tabla.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clave: (fila: any): string => fila.tbodyData[index],

      /**
       * Orden de la columna.
       * @type {number}
       * @description El índice de la columna, usado para ordenar o acceder a los datos de forma precisa.
       */
      orden: index,
    })
  );

  // Asignación de los datos del cuerpo de la tabla.
  this.tableBodyData = this.getEstablecimientoTableData.tableBody;
}


  /**
   * calcularTotales
   * Calcula los totales de cantidad y valor en USD a partir de los datos de la tabla.
   */
  /**
 * Método que calcula los totales de cantidad y valor en USD a partir de los datos del cuerpo de la tabla.
 * El método recorre las filas de la tabla (`tableBodyData`), sumando los valores de las primeras y últimas columnas,
 * luego actualiza los valores en los controles del formulario para mostrar el total de la cantidad y el total en dólares.
 * 
 * @returns {void} No retorna ningún valor, solo actualiza los controles del formulario con los totales calculados.
 */
calcularTotales(): void {
  // Cálculo del total de cantidad sumando los valores de la primera columna de cada fila.
  const CANTITAD_TOTAL = this.tableBodyData.reduce(
    (sum: number, item: { tbodyData: string[] }) =>
      sum + parseFloat(item.tbodyData[0]), // Se toma el valor de la primera columna (índice 0).
    0 // Valor inicial de la suma (0).
  );

  // Cálculo del total en valor USD sumando los valores de la sexta columna de cada fila.
  const VALOR_TOTALUSD = this.tableBodyData.reduce(
    (sum: number, item: { tbodyData: string[] }) =>
      sum + parseFloat(item.tbodyData[5]), // Se toma el valor de la sexta columna (índice 5).
    0 // Valor inicial de la suma (0).
  );

  // Actualiza el campo 'cantidadTotal' del formulario con el total calculado de cantidad.
  // eslint-disable-next-line dot-notation
  this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);

  // Actualiza el campo 'valorTotalUSD' del formulario con el total calculado en USD.
  // eslint-disable-next-line dot-notation
  this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
}


  /**
    * @description Solicita opciones configurables para los formularios desde archivos JSON.
    */
  /**
 * Método que obtiene las opciones de búsqueda para la solicitud y el producto desde el servicio
 * `exportacionMineralesDeHierroService` y actualiza el estado global con los valores predeterminados.
 * Se suscribe a los observables `getSolicitudeOptions` y `getProductoOptions` para obtener los datos necesarios
 * y actualizar las opciones en los formularios correspondientes.
 * 
 * @returns {void} No retorna ningún valor, solo realiza la suscripción y actualización del estado.
 */
opcionesDeBusqueda(): void {
  // Obtención de las opciones de solicitud a través del servicio.
  this.exportacionMineralesDeHierroService
    .getSolicitudeOptions()
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      /**
       * Suscripción exitosa a las opciones de solicitud.
       * Actualiza las opciones de solicitud y el estado global del trámite con el primer valor de las opciones.
       * 
       * @param {SolicitudOptionsResponse} data - Objeto que contiene las opciones de solicitud y el valor por defecto.
       */
      next: (data) => {
        // Se asignan las opciones de solicitud obtenidas.
        this.opcionesSolicitud = data.options;
        
        // Se actualiza el estado global con el valor de la solicitud y el valor predeterminado.
        this.tramite130108Store.updateState({
          solicitud: data.options[0]?.value || '', // Asigna el primer valor o cadena vacía si no existe.
          defaultSelect: data.defaultSelect || 'Inicial', // Asigna el valor predeterminado o 'Inicial'.
        });
      },
      
      /**
       * Manejo de errores al obtener las opciones de solicitud.
       * 
       * @param {any} error - El error generado al intentar obtener las opciones de solicitud.
       * @description Se imprime el error en la consola.
       */
      error: (error) =>
        console.error('Error loading solicitude options:', error),
    });

  // Obtención de las opciones de producto a través del servicio.
  this.exportacionMineralesDeHierroService
    .getProductoOptions()
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      /**
       * Suscripción exitosa a las opciones de producto.
       * Actualiza las opciones de producto y el estado global del trámite con el primer valor de las opciones de producto.
       * 
       * @param {ProductoOptionsResponse} data - Objeto que contiene las opciones de producto y el valor predeterminado.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (data: any) => {
        // Se asignan las opciones de producto obtenidas.
        this.productoOpciones = data.options;
        
        // Se actualiza el estado global con el valor de plazo y el valor predeterminado.
        this.tramite130108Store.updateState({
          plazo: data.options[0]?.value || 'Largo plazo (5 años)', // Asigna el primer valor o 'Largo plazo (5 años)' si no existe.
          defaultPlazo: data.options[0]?.value || 'Largo plazo (5 años)', // Asigna el valor predeterminado o 'Largo plazo (5 años)'.
        });
      },
    });
}

  /**
   * manejarlaFilaSeleccionada
   * Maneja la selección de filas en la tabla dinámica y actualiza el estado global.
   * Lista de filas seleccionadas.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  manejarlaFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;
    if (this.filaSeleccionada) {
      this.tramite130108Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
      this.mostrarTabla = false;
    } else {
      this.mostrarTabla = true;
    }
  }

  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130108Store.setMostrarTabla(true);
      this.tramite130108Store.storeTableValues(this.filaSeleccionada);
    }
  }
  /**
   * Método para obtener la lista de entidades federativas.
   */
 /**
 * Método que obtiene el estado (entidad federativa) desde el servicio `exportacionMineralesDeHierroService`.
 * 
 * Este método hace una solicitud HTTP al servicio para obtener los datos del estado y, al recibir la respuesta,
 * asigna el valor obtenido a la propiedad `estado` de la clase.
 * 
 * @returns {void} Este método no tiene valor de retorno. 
 * 
 * @example
 * // Ejemplo de uso:
 * this.fetchEntidadFederativa();
 */
fetchEntidadFederativa(): void {
  this.exportacionMineralesDeHierroService.getEstado()
    .subscribe((data) => {
      this.estado = data;
    });
}

  /**
  * Método para obtener la lista de representaciones federales.
  */
 /**
 * Método que obtiene la representación federal desde el servicio `exportacionMineralesDeHierroService`.
 * 
 * Este método realiza una solicitud HTTP al servicio para obtener los datos de la representación federal y, 
 * al recibir la respuesta, asigna el valor obtenido a la propiedad `representacionFederal` de la clase.
 * 
 * @returns {void} Este método no tiene valor de retorno.
 * 
 * @example
 * // Ejemplo de uso:
 * this.fetchRepresentacionFederal();
 */
fetchRepresentacionFederal(): void {
  this.exportacionMineralesDeHierroService
    .getRepresentacionFederal()
    .subscribe((data) => {
      this.representacionFederal = data;
    });
}

  /**
  * Método para obtener la lista de países disponibles.
  */
/**
 * Método que obtiene la lista de países disponibles desde el servicio `exportacionMineralesDeHierroService`.
 * 
 * Este método realiza una solicitud HTTP al servicio para obtener la lista de países disponibles y, 
 * al recibir la respuesta, asigna el valor obtenido a la propiedad `elementosDeBloque` de la clase.
 * Además, se usa el operador `takeUntil` para gestionar la desuscripción cuando el componente es destruido,
 * evitando posibles fugas de memoria.
 * 
 * @returns {void} Este método no tiene valor de retorno.
 * 
 * @example
 * // Ejemplo de uso:
 * this.listaDePaisesDisponibles();
 */
listaDePaisesDisponibles(): void {
  this.exportacionMineralesDeHierroService
    .getListaDePaisesDisponibles().pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.elementosDeBloque = data;
    });
}

 /**
 * Método que obtiene la lista de ciudades desde el servicio `exportacionMineralesDeHierroService`.
 * 
 * Este método realiza una solicitud HTTP al servicio para obtener la lista de ciudades disponibles. 
 * Al recibir la respuesta, verifica si el componente `paisDeOrigenComponent` y su propiedad 
 * `crosslistComponent` existen. Si es así, asigna la lista de descripciones de las ciudades 
 * a la propiedad `fechasDatos` de `crosslistComponent`.
 * 
 * Además, se utiliza el operador `takeUntil` para gestionar la desuscripción cuando el componente 
 * es destruido, evitando posibles fugas de memoria.
 * 
 * @returns {void} Este método no tiene valor de retorno.
 * 
 * @example
 * // Ejemplo de uso:
 * this.fetchListaDeCiudades();
 */
fetchListaDeCiudades(): void {
  this.exportacionMineralesDeHierroService
    .obtenerListaDeCiudades().pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      if (this.paisDeOrigenComponent && this.paisDeOrigenComponent.crosslistComponent) {
        this.paisDeOrigenComponent.crosslistComponent.fechasDatos = data.map(item => item.descripcion);
      }
    });
}
  /**
  * Método para obtener la lista de países por bloque.
  * @param {number} _bloqueId - Identificador del bloque.
  */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.exportacionMineralesDeHierroService
      .getPaisesPorBloque(_bloqueId).pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }
  /**
  * Maneja el cambio de bloque seleccionado.
  * @param {number} bloqueId - Identificador del bloque seleccionado.
  */
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }
  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  // eslint-disable-next-line complexity
  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.tramite130108Store.updateSolicitud(VALOR);
        break;
      case 'setDescripcionPartidasDeLaMercancia':
        this.tramite130108Store.setDescripcionPartidasDeLaMercancia(VALOR);
        break;
      case 'setCantidadPartidasDeLaMercancia':
        this.tramite130108Store.setCantidadPartidasDeLaMercancia(VALOR);
        break;
      case 'setValorPartidaUSDPartidasDeLaMercancia':
        this.tramite130108Store.setValorPartidaUSDPartidasDeLaMercancia(VALOR);
        break;
      case 'setRegimen':
        this.tramite130108Store.setRegimen(VALOR);
        break;
      case 'setClasificacion':
        this.tramite130108Store.setClasificacion(VALOR);
        break;

      case 'setProducto':
        this.tramite130108Store.setProducto(VALOR);
        break;
      case 'setDescripcion':
        this.tramite130108Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.tramite130108Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.tramite130108Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.tramite130108Store.setUnidadMedida(VALOR);
        break;
      case 'setBloque':
        this.tramite130108Store.setBloque(VALOR);
        break;
      case 'setUsoEspecifico':
        this.tramite130108Store.setUsoEspecifico(VALOR);
        break;
      case 'setJustificacionImportacionExportacion':
        this.tramite130108Store.setJustificacionImportacionExportacion(VALOR);
        break;
      case 'setObservaciones':
        this.tramite130108Store.setObservaciones(VALOR);
        break;
      case 'setEntidad':
        this.tramite130108Store.setEntidad(VALOR);
        break;
      case 'setRepresentacion':
        this.tramite130108Store.setRepresentacion(VALOR);
        break;
      case 'setUmt':
        this.tramite130108Store.setUmt(VALOR);
        break;
      case 'setNico':
        this.tramite130108Store.setNico(VALOR);
        break;
      case 'setFraccion':
        this.tramite130108Store.setFraccion(VALOR);
        break;
      default:
        console.error(
          `Método ${event.metodoNombre} no existe en tramite130108Store`
        );
    }
  }

  /**
   * @description Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
