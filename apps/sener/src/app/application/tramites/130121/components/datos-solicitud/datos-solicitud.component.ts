

import { Catalogo, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import acotacionOptions from '@libs/shared/theme/assets/json/130121/acotacion.json';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { PaisDeOrigenComponent } from '../../../../shared/components/pais-de-origen/pais-de-origen.component';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130121/partidas-de-la.json';

import { PermisoDeHidrocarburosService } from '../../services/permiso-de-hidrocarburos.service';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130121Query } from '../../estados/queries/tramite130121.query';
import { Tramite130121Store } from '../../estados/tramites/tramites130121.store';
import mercanciaCatalogoVal from '@libs/shared/theme/assets/json/130121/datos-fraccion_arancelaria.json';
import nicoCatalogoVal from '@libs/shared/theme/assets/json/130121/nico.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130121/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130121/unidad-medida.json';

/**
 * Componente de Solicitud para gestionar la solicitud de exportación de minerales de hierro.
 * Este componente permite la creación, edición y visualización de la solicitud.
 * 
 * @example
 * <app-datos-solicitud></app-datos-solicitud>
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

   /** 
 * Formulario de partidas de la mercancía.
 * @type {FormGroup} Formulario que contiene los campos relacionados con las partidas de la mercancía.
 */
  partidasDelaMercanciaForm!: FormGroup;

    /**
   * Formulario del trámite.
   * @type {FormGroup} Formulario que contiene los campos relacionados con el trámite.
   */
  formDelTramite!: FormGroup;

  /**
   * Formulario de la mercancía.
   * @type {FormGroup} Formulario que contiene los campos relacionados con la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * Formulario para el conteo total.
   * @type {FormGroup} Formulario que se usa para gestionar el conteo total de la mercancía.
   */
  formForTotalCount!: FormGroup;

  /**
   * Formulario del país.
   * @type {FormGroup} Formulario que contiene la información relacionada con el país.
   */
  paisForm!: FormGroup;

 
  /**
   * Formulario de representación.
   * @type {FormGroup} Formulario utilizado para representar los datos de la mercancía.
   */
  frmRepresentacionForm!: FormGroup;

  /**
   * Datos de configuración para los encabezados de la tabla.
   * @type {ConfiguracionColumna<string>[]} Arreglo que contiene la configuración de las columnas para la tabla.
   */
  tableHeaderData: ConfiguracionColumna<string>[] = [];

 /**
   * Datos del cuerpo de la tabla.
   * @type {{ tbodyData: string[] }[]} Arreglo que contiene los datos que se mostrarán en el cuerpo de la tabla.
   */
 tableBodyData: string[] = [];

 /**
  * Bandera que controla la visibilidad de la tabla.
  * @type {boolean} Indica si la tabla se debe mostrar o no.
  */
 mostrarTabla = false;

 /**
  * Checkbox de selección de la tabla.
  * @type {TablaSeleccion} Enum que especifica el tipo de selección de la tabla.
  */
 checkBox = TablaSeleccion.CHECKBOX;

 /**
   * Función para obtener los datos de la tabla de establecimiento.
   * @type {any} Datos de la tabla que serán mostrados para el establecimiento.
   */
 public getEstablecimientoTableData = PartidasdelaTable;

 /**
  * Fila seleccionada en la tabla.
  * @type {any} Contiene la fila seleccionada de la tabla.
  */
 filaSeleccionada: { [key: string]: unknown } | null = null;

 /**
  * Opciones de productos disponibles.
  * @type {ProductoOpción[]} Arreglo que contiene las opciones de productos que se pueden seleccionar.
  */
 productoOpciones: ProductoOpción[] = [];

  /**
   * Valores del catálogo de unidades.
   * @type {Catalogo[]} Arreglo que contiene los valores disponibles en el catálogo de unidades.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  acotacionCatalogo: Catalogo[] = acotacionOptions;

  
  /**
   * Datos de los campos de entrada del formulario.
   * @type {Array<{label: string, placeholder: string, required: boolean, controlName: string}>} Arreglo que contiene los datos de los campos del formulario de mercancía.
   */
  datosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Selecciona un valor',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Selecciona un valor',
      required: true,
      controlName: 'clasificacion',
    },
  ];

  /**
 * Datos de los campos de entrada para la mercancía.
 * @type {Array<{label: string, placeholder: string, required: boolean, controlName: string}>} 
 * Arreglo que contiene los datos de los campos que serán utilizados en el formulario de mercancía.
 */
  mercanciaInputValues = [
     /**
     * Fracción arancelaria.
     * @type {{label: string, placeholder: string, required: boolean, controlName: string}} 
     * Campo para seleccionar la fracción arancelaria de la mercancía.
     */
    {
      label: 'Fracción arancelaria',
      placeholder: 'Selecciona un valor',
      required: true,
      controlName: 'fraccion',
    },
     /**
     * Unidad de medida de la tarifa (UMT).
     * @type {{label: string, placeholder: string, required: boolean, controlName: string}} 
     * Campo para seleccionar la unidad de medida de la tarifa asociada a la mercancía.
     */
    {
      label: 'Unidad de medida de la tarifa (UMT)',
      placeholder: 'Selecciona un valor',
      required: true,
      controlName: 'umt',
    },
     /**
     * NICO (Número de Identificación de la Carga).
     * @type {{label: string, placeholder: string, required: boolean, controlName: string}} 
     * Campo para seleccionar el número de identificación de la carga (NICO) de la mercancía.
     */
    {
      label: 'NICO',
      placeholder: 'Selecciona un valor',
      required: true,
      controlName: 'nico',
    },
  ];
  /**
 * Array de catálogos.
 * @type {Catalogo[][]} Arreglo bidimensional de catálogos que contiene los valores para las solicitudes.
 */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  /**
   * Opciones de productos disponibles.
   * @type {ProductoOpción[]} Arreglo que contiene las opciones de productos para seleccionar en la solicitud.
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   * Sujeto para manejar el ciclo de vida de los observables y evitar posibles fugas de memoria.
   * @type {Subject<void>} Sujeto usado para emitir valores y completar el flujo de datos.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Elementos del bloque.
   * @type {Catalogo[]} Arreglo que contiene los elementos del catálogo para el bloque.
   */
  elementosDeBloque: Catalogo[] = [];

   /**
   * Componente de País de Origen.
   * Referencia al componente de selección del país de origen de la mercancía.
   */
  @ViewChild(PaisDeOrigenComponent)
  paisDeOrigenComponent!: PaisDeOrigenComponent;

 /**
   * Catálogo de países por bloque.
   * @type {Catalogo[]} Arreglo que contiene los países disponibles para cada bloque.
   */
  paisesPorBloque: Catalogo[] = [];

  
  /**
   * Estado catalogado.
   * @type {Catalogo[]} Arreglo que contiene los estados disponibles en el catálogo.
   */
  estado: Catalogo[] = [];

 /**
   * Representación federal en el catálogo.
   * @type {Catalogo[]} Arreglo que contiene los valores de representación federal.
   */
  representacionFederal: Catalogo[] = [];

    /**
   * Rango de días para la solicitud.
   * @type {string[]} Arreglo que contiene las opciones de rango de días disponibles para la selección.
   */
  selectRangoDias: string[] = [];

  /**
   * Constantes de textos utilizados en la aplicación.
   * @type {any} Objeto que contiene los textos de la aplicación para su uso en diferentes partes de la interfaz.
   */
  TEXTOS = TEXTOS;

 /**
   * Array de catálogos de mercancías.
   * @type {Catalogo[][]} Arreglo bidimensional que contiene los valores de los catálogos para las mercancías.
   */
 mercanciaCatalogoArray: Catalogo[][] = mercanciaCatalogoVal as Catalogo[][];

 /**
  * Array de catálogos de NICO (Número de Identificación de la Carga).
  * @type {Catalogo[]} Arreglo que contiene los catálogos disponibles para el número de identificación de la carga (NICO).
  */
 nicoCatalogoArray: Catalogo[] = nicoCatalogoVal as Catalogo[];

  /**
   * Constructor de la clase.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {HttpClient} http - Servicio para hacer peticiones HTTP.
   * @param {Tramite130121Store} tramite130121Store - Servicio que gestiona el estado relacionado con el trámite 130121.
   * @param {Tramite130121Query} tramite130121Query - Servicio que consulta el estado del trámite 130121.
   * @param {PermisoDeHidrocarburosService} permisodehidrocarburosService - Servicio que gestiona la permiso de hidrocarburos Service
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130121Store: Tramite130121Store,
    private tramite130121Query: Tramite130121Query,
    private permisodehidrocarburosService: PermisoDeHidrocarburosService
  ) {
    // Constructor vacío, solo se inyectan los servicios
  }

   /**
  * Método de ciclo de vida de Angular, llamado al inicializar el componente.
  * En este método se configuran varios formularios, consultas y se suscribe a diversos observables.
  * 
  * 1. Inicializa los formularios utilizando `inicializarFormularios()`.
  * 2. Configura los formularios específicos para suscripciones mediante `configuracionFormularioSuscripciones()`.
  * 3. Llama al método `opcionesDeBusqueda()` para establecer las opciones de búsqueda.
  * 4. Realiza un cálculo del total mediante `formularioTotalCount()`.
  * 5. Obtiene la información del establecimiento mediante `getEstablecimiento()`.
  * 6. Ejecuta el cálculo de totales con el método `calcularTotales()`.
  * 7. Obtiene las entidades federativas usando `fetchEntidadFederativa()`.
  * 8. Obtiene la representación federal con `fetchRepresentacionFederal()`.
  * 9. Carga la lista de países disponibles con `listaDePaisesDisponibles()`.
  * 10. Se suscribe al observable `mostrarTabla$` de la consulta `tramite130121Query` para actualizar el estado de la variable `mostrarTabla`.
  * 11. Se suscribe al observable `selectSolicitud$` de la consulta `tramite130121Query`, donde se actualizan los valores del formulario `partidasDelaMercanciaForm`
  *     con los valores provenientes del estado de la sección, utilizando `patchValue()`.
  * 
  * @returns void
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

     // Se suscribe a 'mostrarTabla$' y actualiza el valor de 'mostrarTabla' cuando el estado cambia.
    this.tramite130121Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

 // Se suscribe a 'mostrarTabla$' y actualiza el valor de 'mostrarTabla' cuando el estado cambia.
     this.tramite130121Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidadPartidasDeLaMercancia: seccionState.cantidadPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia: seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia: seccionState.descripcionPartidasDeLaMercancia,
          });
        })
      )
      .subscribe();
    
    // Suscripción para actualizar la fracción arancelaria en el formulario
    this.tramite130121Query.fraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((fraccion) => {
        this.partidasDelaMercanciaForm.patchValue({ fraccion }, { emitEvent: false });
      });

    // Suscripción para actualizar la unidad de medida en el formulario
    this.tramite130121Query.unidadMedida$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unidadMedida) => {
        if (unidadMedida) {
          this.partidasDelaMercanciaForm.patchValue({ unidadMedida }, { emitEvent: false });
          this.partidasDelaMercanciaForm.get('unidadMedida')?.updateValueAndValidity();
        }
      });
  }

 /**
  * Método para inicializar los formularios del trámite, mercancia, partidas de la mercancia, 
  * pais y representación. Cada formulario se construye utilizando el FormBuilder 
  * de Angular con validadores para asegurar que los campos tengan los valores correctos 
  * antes de ser enviados.
  */
  inicializarFormularios(): void {
    
      // Formulario principal del trámite, contiene los campos de solicitud, régimen y clasificación
      this.formDelTramite = this.fb.group({
        /**
         * Campo que captura la solicitud asociada al trámite.
         * Es un campo obligatorio.
         */
        solicitud: ['', Validators.required],
  
        /**
         * Campo que captura el régimen bajo el cual se realiza el trámite.
         * Es un campo obligatorio.
         */
        regimen: ['', Validators.required],
  
        /**
         * Campo que captura la clasificación del trámite.
         * Es un campo obligatorio.
         */
        clasificacion: ['', Validators.required],
      });
  
      // Formulario relacionado con los detalles de la mercancía
      this.mercanciaForm = this.fb.group({
        /**
         * Campo que captura el plazo relacionado con la mercancía.
         * En este caso, el valor por defecto es "Largo plazo (5 años)" y es obligatorio.
         */
        plazo: ['Largo plazo (5 años)', Validators.required],
  
        /**
         * Descripción detallada de la mercancía.
         * Es obligatorio y debe tener una longitud entre 10 y 500 caracteres.
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
         * Campo que captura la fracción de la mercancía.
         * Es un campo obligatorio.
         */
        fraccion: ['', Validators.required],
  
        /**
         * Campo que captura la cantidad de la mercancía.
         * Es obligatorio, debe ser un número mayor a 0 y debe cumplir con un patrón de solo números.
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
         * Valor de la factura en USD relacionada con la mercancía.
         * Es obligatorio, debe ser un número decimal con hasta dos lugares después del punto y un valor mínimo de 0.01.
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
         * Campo que captura la unidad de medida de la mercancía.
         * Es un campo obligatorio.
         */
        unidadMedida: ['', Validators.required],
  
        /**
         * Campo que captura el código NICO de la mercancía.
         * Es obligatorio.
         */
        nico: ['', Validators.required],
        acotacion: [{ value: '', disabled: true }],
        descripcionNico: [{ value: '', disabled: true }],
       });

     // Formulario para la información relacionada con las partidas de la mercancía
    this.partidasDelaMercanciaForm = this.fb.group({
        /**
       * Campo que captura la cantidad de partidas de la mercancía.
       * Es obligatorio, debe ser un número entero y no puede exceder los 18 caracteres.
       */
      cantidadPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      unidadMedida: ['', Validators.required],
      fraccion: ['', Validators.required],
      /**
       * Descripción de las partidas de la mercancía.
       * Es obligatorio y no debe exceder los 255 caracteres.
       */
      descripcionPartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      /**
       * Valor en USD de cada partida de la mercancía.
       * Es obligatorio, debe ser un número con hasta dos decimales y no puede ser negativo.
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

    // Formulario para la información relacionada con el país de origen o destino
    this.paisForm = this.fb.group({

         /**
       * Bloque en el que se encuentra el país. Es un campo opcional.
       */
      bloque: [''],

      /**
       * Uso específico del país relacionado con la mercancía.
       * Es obligatorio.
       */
      usoEspecifico: ['', Validators.required],

      /**
       * Justificación de la importación o exportación.
       * Es obligatorio.
       */
      justificacionImportacionExportacion: ['', [Validators.required]],

      /**
       * Observaciones adicionales sobre el país.
       * Es un campo opcional.
       */
      observaciones: [''],
    });

    // Formulario para la representación legal relacionada con el trámite
    this.frmRepresentacionForm = this.fb.group({
      /**
       * Entidad que representa al solicitante en el trámite.
       * Es un campo obligatorio.
       */
      entidad: ['', Validators.required],

      /**
       * Representación legal o nombre del representante.
       * Es un campo obligatorio.
       */
      representacion: ['', Validators.required],
    });
  }

    /**
  * Método para configurar las suscripciones de los formularios, actualizando sus valores
  * cuando se reciben cambios desde el store o la consulta a la API.
  * 
  * - Suscripciones a los valores de 'solicitud', 'regimen' y 'clasificacion' que se 
  *   reciben desde el store (tramite130121Query).
  * - Suscripciones a los valores de 'mercanciaState', 'selectSolicitud' y 'frmRepresentacionForm'.
  * - Actualización del estado global del store cada vez que los formularios se modifican.
  */
  configuracionFormularioSuscripciones(): void {
    
    // Suscripción para recibir cambios en el valor de 'solicitud' desde el store y actualizar el formulario correspondiente
    this.tramite130121Query.solicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => {
        /**
         * Actualiza el valor del formulario 'formDelTramite' con el valor de 'solicitud'.
         * No se emiten eventos de cambio con { emitEvent: false } para evitar una actualización circular.
         */
        this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
      });

    // Suscripción para recibir cambios en el valor de 'regimen' desde el store y actualizar el formulario correspondiente
    this.tramite130121Query.regimen$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((regimen) => {
         /**
         * Actualiza el valor del formulario 'formDelTramite' con el valor de 'regimen'.
         * Se evita la emisión de eventos para evitar ciclos de cambio innecesarios.
         */
        this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
      });

     // Suscripción para recibir cambios en el valor de 'clasificacion' desde el store y actualizar el formulario correspondiente
    this.tramite130121Query.clasificacion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((clasificacion) => {
         /**
         * Actualiza el valor del formulario 'formDelTramite' con el valor de 'clasificacion'.
         * La opción { emitEvent: false } previene que los cambios en el formulario
         * generen eventos adicionales.
         */
        this.formDelTramite.patchValue({ clasificacion }, { emitEvent: false });
      });

    // Suscripción para recibir cambios en el estado de 'mercanciaState' y actualizar el formulario correspondiente
    this.tramite130121Query.mercanciaState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
         /**
         * Actualiza el formulario 'mercanciaForm' con los valores de 'mercanciaState'.
         * 
         * - Se asignan los valores de plazo, descripción, fracción, cantidad, valor de factura (en USD) y unidad de medida.
         * - El valor de la factura en USD se convierte a string si es necesario para mantener el formato.
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

     // Suscripción para recibir cambios en el valor de 'selectSolicitud' y actualizar el formulario relacionado con el país
    this.tramite130121Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          /**
           * Actualiza el formulario 'paisForm' con los valores del estado recibido en 'seccionState'.
           * - Bloque, uso específico, justificación de importación/exportación y observaciones son asignados al formulario.
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

     // Suscripción para recibir cambios en el valor de 'selectSolicitud' y actualizar el formulario de representación
    this.tramite130121Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          /**
           * Actualiza el formulario 'frmRepresentacionForm' con los valores del estado de representación.
           * - Entidad y representación son asignados al formulario.
           */
          this.frmRepresentacionForm.patchValue({
            entidad: seccionState.entidad,
            representacion: seccionState.representacion,
          });
        })
      )
      .subscribe();

    // Suscripción para escuchar cambios en el formulario 'formDelTramite' y actualizar el estado global
    this.formDelTramite.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        /**
         * Actualiza el estado global del store con los valores de 'formDelTramite'.
         * Los campos solicitados son 'solicitud', 'regimen' y 'clasificacion'.
         */
        this.tramite130121Store.updateState({
          solicitud: value.solicitud,
          regimen: value.regimen,
          clasificacion: value.clasificacion,
        });
      });

    // Suscripción para escuchar cambios en el formulario 'mercanciaForm' y actualizar el estado global
    this.mercanciaForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
         /**
         * Actualiza el estado global del store con los valores de 'mercanciaForm'.
         * - Los campos actualizados son 'plazo', 'descripcion', 'fraccion', 'cantidad', 'valorPartidaUSD' y 'unidadMedida'.
         * - Se convierte el valor de 'valorFacturaUSD' a tipo numérico y se asigna un valor por defecto si es inválido.
         */
        this.tramite130121Store.updateState({
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
   * @description
   * Método que inicializa el formulario utilizado para mostrar la cantidad total y el valor total en USD.
   * El formulario contiene dos campos: `cantidadTotal` y `valorTotalUSD`, ambos deshabilitados para que no sean editables por el usuario.
   *
   * @method
   * @name formularioTotalCount
   */
  formularioTotalCount(): void {
    // Inicializa el formulario con el FormBuilder
    this.formForTotalCount = this.fb.group({
    /**
       * @description
       * Campo que representa la cantidad total. Está deshabilitado para que el usuario no pueda modificar su valor.
       * 
       * @type {FormControl}
       * @default ''
       * @disabled true
       */
    cantidadTotal: [{ value: '', disabled: true }],

    /**
     * @description
     * Campo que representa el valor total en USD. También está deshabilitado para que el usuario no pueda modificar su valor.
     * 
     * @type {FormControl}
     * @default ''
     * @disabled true
     */
    valorTotalUSD: [{ value: '', disabled: true }],
  });
}
  /**
 * @description
 * Método encargado de obtener los datos de la tabla de establecimiento. 
 * Se extraen tanto los encabezados como los datos del cuerpo de la tabla, los cuales se almacenan en las propiedades `tableHeaderData` y `tableBodyData`, respectivamente.
 * El `tableHeaderData` se mapea a un formato que incluye el nombre del encabezado, la clave que corresponde a cada columna, y su posición dentro de la tabla.
 *
 * @method
 * @name getEstablecimiento
 */
  getEstablecimiento(): void {
    /**
     * @description
     * Mapea los encabezados de la tabla a un formato más estructurado, asociando cada encabezado con una clave (valor específico de cada fila de datos) 
     * y el orden del encabezado.
     * 
     * @type {Array<{ encabezado: string, clave: (fila: any) => string, orden: number }>}
     * @default []
     */
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
      (header, index) => ({
        /**
         * @description
         * Nombre del encabezado de la columna.
         * 
         * @type {string}
         */
        encabezado: header,

        /**
 * @description Función que obtiene el valor correspondiente de la columna de la fila,
 * basándose en el índice del encabezado. La función convierte la cadena JSON en un objeto
 * que contiene la propiedad `tbodyData` y retorna el elemento en la posición indicada.
 *
 * @param {string} fila - Cadena JSON que representa la fila con la propiedad `tbodyData`.
 * @returns {string} Valor correspondiente a la columna en la fila.
 */
        clave: (fila: string): string => {
          const PARSED_FILA = JSON.parse(fila) as { tbodyData: string[] };
          return PARSED_FILA.tbodyData[index];
        },
        orden: index,
      })
    );

    /**
     * @description
     * Asigna los datos del cuerpo de la tabla a la propiedad `tableBodyData`.
     * Los datos del cuerpo son extraídos directamente de `getEstablecimientoTableData.tableBody`.
     * 
     * @type {any[]}
     * @default []
     */
    this.tableBodyData = this.getEstablecimientoTableData.tableBody.map(row =>
      JSON.stringify(row)
    );
  }

 
  /**
 * @description
 * Método encargado de calcular los totales de la tabla. 
 * Se calculan dos valores:
 * - `CANTITAD_TOTAL`: la suma de los valores de la primera columna (representando la cantidad total).
 * - `VALOR_TOTALUSD`: la suma de los valores de la sexta columna (representando el valor total en USD).
 * 
 * Posteriormente, se actualizan los valores de los campos del formulario (`cantidadTotal` y `valorTotalUSD`) con los totales calculados.
 *
 * @method
 * @name calcularTotales
 */
  calcularTotales(): void {
    /**
     * @description
     * Calcula el total de la primera columna de la tabla (`tbodyData[0]`), que representa la cantidad total.
     * Para ello, se usa el método `reduce` para sumar los valores de la primera columna de cada fila de datos.
     * 
     * @type {number}
     * @default 0
     */
    const CANTITAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: string) => {
        const PARSED_ITEM = JSON.parse(item) as { tbodyData: string[] };
        return sum + parseFloat(PARSED_ITEM.tbodyData[0]);
      },
      0
    );

    /**
     * @description
     * Calcula el total de la sexta columna de la tabla (`tbodyData[5]`), que representa el valor total en USD.
     * Se utiliza el método `reduce` para sumar los valores de la sexta columna de cada fila de datos.
     * 
     * @type {number}
     * @default 0
     */
    const VALOR_TOTALUSD = this.tableBodyData.reduce(
      (sum: number, item: string) => {
        const PARSED_ITEM = JSON.parse(item) as { tbodyData: string[] };
        return sum + parseFloat(PARSED_ITEM.tbodyData[5]);
      },
      0
    );

    /**
     * @description
     * Actualiza el valor del campo `cantidadTotal` en el formulario con el total calculado en `CANTITAD_TOTAL`.
     * 
     * @param {number} CANTITAD_TOTAL Total calculado de la primera columna.
     */
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);

    /**
     * @description
     * Actualiza el valor del campo `valorTotalUSD` en el formulario con el total calculado en `VALOR_TOTALUSD`.
     * 
     * @param {number} VALOR_TOTALUSD Total calculado de la sexta columna.
     */
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

 /**
  * @description
  * Método encargado de obtener las opciones para la solicitud y el producto mediante dos llamadas a servicios:
  * 1. **getSolicitudeOptions**: Recupera las opciones para la solicitud y actualiza el estado de la tienda (`tramite130121Store`) con la opción seleccionada y un valor predeterminado.
  * 2. **getProductoOptions**: Recupera las opciones para el producto y actualiza el estado de la tienda con el plazo seleccionado y un valor predeterminado.
  * 
  * Ambas solicitudes se manejan usando un `pipe` con el operador `takeUntil` para asegurarse de que las suscripciones se cancelen cuando el componente sea destruido, evitando posibles fugas de memoria.
  *
  * @method
  * @name opcionesDeBusqueda
  */
  opcionesDeBusqueda(): void {
    /**
     * @description
     * Realiza una llamada al servicio `getSolicitudeOptions` para obtener las opciones disponibles para la solicitud.
     * Una vez obtenidos los datos, se actualizan las opciones de solicitud y se modifica el estado de la tienda `tramite130121Store`.
     * 
     * @observable {Observable<any>} Observa el resultado de la llamada a `getSolicitudeOptions` del servicio `permisodehidrocarburosService`.
     * @param {data} datos que contienen las opciones de solicitud.
     * @returns {void}
     */
   
    this.permisodehidrocarburosService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        /**
         * @description
         * Acción a realizar cuando la respuesta de la solicitud es exitosa. Actualiza las opciones de solicitud y el estado en `tramite130121Store`.
         * 
         * @param {data} Respuesta de la API que contiene las opciones de la solicitud.
         */
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130121Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
         /**
         * @description
         * Acción a realizar en caso de error en la solicitud de opciones de solicitud. Se registra el error en la consola.
         * 
         * @param {error} El error generado si la llamada a la API falla.
         */
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

      /**
     * @description
     * Realiza una llamada al servicio `getProductoOptions` para obtener las opciones disponibles para el producto.
     * Al igual que la llamada anterior, una vez obtenidos los datos, se actualiza el estado de la tienda `tramite130121Store`.
     * 
     * @observable {Observable<any>} Observa el resultado de la llamada a `getProductoOptions` del servicio `permisodehidrocarburosService`.
     * @param {data} datos que contienen las opciones de producto.
     * @returns {void}
     */

    this.permisodehidrocarburosService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        /**
         * @description
         * Acción a realizar cuando la respuesta de la solicitud de producto es exitosa. Actualiza las opciones de producto y el estado en `tramite130121Store`.
         * 
         * @param {data} Respuesta de la API que contiene las opciones del producto.
         */
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130121Store.updateState({
            plazo: data.options[0]?.value || 'Largo plazo (5 años)',
            defaultPlazo: data.options[0]?.value || 'Largo plazo (5 años)',
          });
        },
      });
  }

 
  /**
  * @description
  * Método encargado de manejar la fila seleccionada en una tabla. 
  * Si hay filas seleccionadas, se guarda la primera fila en la propiedad `filaSeleccionada`.
  * Si no hay filas seleccionadas, se establece como `null`.
  * Si existe una fila seleccionada, se actualiza el estado de la tienda `tramite130121Store` con los valores de la fila seleccionada mediante el método `storeTableValues`.
  *
  * @method
  * @name manejarlaFilaSeleccionada
  * @param {any[]} filasSeleccionadas - Arreglo de filas seleccionadas en la tabla.
  * @returns {void}
  */
  manejarlaFilaSeleccionada(filasSeleccionadas: { [key: string]: unknown }[]): void {
    /**
     * @description
     * Asigna la primera fila seleccionada a la propiedad `filaSeleccionada`, o `null` si no hay filas seleccionadas.
     * 
     * @type {any | null}
     * @default null
     */
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;

    /**
     * @description
     * Si hay una fila seleccionada, actualiza el estado de la tienda `tramite130121Store` con los valores de la fila seleccionada.
     * 
     * @param {any} this.filaSeleccionada Fila seleccionada que contiene los datos a ser almacenados en la tienda.
     */
    if (this.filaSeleccionada) {
      this.tramite130121Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
 * @description
 * Método encargado de validar el formulario `partidasDelaMercanciaForm`. 
 * Si el formulario es inválido, se marca todos los campos como tocados y se oculta la tabla (`mostrarTabla` se establece en `false`).
 * Si el formulario es válido, se muestra la tabla (`mostrarTabla` se establece en `true`).
 *
 * @method
 * @name validarYEnviarFormulario
 * @returns {void}
 */
  validarYEnviarFormulario(): void {
    /**
     * @description
     * Verifica si el formulario es inválido. En caso de serlo, marca todos los campos como tocados 
     * para que se muestren los mensajes de error y se oculta la tabla.
     * 
     * @type {boolean}
     * @default false
     */
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
      /**
       * @description
       * Establece la propiedad `mostrarTabla` en `false` para ocultar la tabla si el formulario es inválido.
       * 
       * @type {boolean}
       * @default false
       */
      this.mostrarTabla = false;
    } else {
      /**
       * @description
       * Establece la propiedad `mostrarTabla` en `true` para mostrar la tabla si el formulario es válido.
       * 
       * @type {boolean}
       * @default true
       */
      this.mostrarTabla = true;
    }
  }

  /**
  * Método que se encarga de navegar a la página de modificación de partida.
  * Si hay una fila seleccionada, muestra la tabla de valores y guarda los valores
  * de la fila seleccionada en el estado del store correspondiente.
  */
  navegarParaModificarPartida(): void {
    // Verificamos si existe una fila seleccionada
    if (this.filaSeleccionada) {
      // Si la fila está seleccionada, se muestra la tabla
      this.tramite130121Store.setMostrarTabla(true);
      // Almacenamos los valores de la fila seleccionada en el store
      this.tramite130121Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * Método que realiza la consulta al servicio de exportación de minerales
   * de hierro para obtener los datos del estado de la entidad federativa.
   * Luego, asigna los datos obtenidos a la propiedad `estado` de la clase.
   */
  fetchEntidadFederativa(): void {
    // Llamada al servicio para obtener los datos del estado
    this.permisodehidrocarburosService.getEstado()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      // Asignamos el resultado al estado
      this.estado = data;
    });
  }


  /**
  * Método que realiza una consulta al servicio de exportación de minerales
  * de hierro para obtener la representación federal. Los datos obtenidos
  * se asignan a la propiedad `representacionFederal` de la clase.
  */
  fetchRepresentacionFederal(): void {
    // Llamada al servicio para obtener la representación federal
    this.permisodehidrocarburosService
      .getRepresentacionFederal().pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        // Asignamos el resultado a la propiedad representacionFederal
        this.representacionFederal = data;
      });
  }

  /**
   * Método que solicita la lista de países disponibles a través del servicio
   * de exportación de minerales de hierro. Utiliza `takeUntil` para manejar
   * la cancelación de suscripciones. Los datos obtenidos se asignan a la
   * propiedad `elementosDeBloque`.
   */
  listaDePaisesDisponibles(): void {
    // Llamada al servicio para obtener la lista de países disponibles
    this.permisodehidrocarburosService
      .getListaDePaisesDisponibles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        // Asignamos el resultado a la propiedad elementosDeBloque
        this.elementosDeBloque = data;
      });
  }
/**
  * Método que realiza una solicitud al servicio de exportación de minerales
  * de hierro para obtener la lista de ciudades. La respuesta es procesada y
  * se asigna a la propiedad `fechasDatos` del componente `crosslistComponent` 
  * de `paisDeOrigenComponent`, si dicho componente está disponible.
  * Utiliza `takeUntil` para manejar la cancelación de suscripciones.
  */
  obtenerListaDeCiudades(): void {
    // Llamada al servicio para obtener la lista de ciudades
    this.permisodehidrocarburosService
      .obtenerListaDeCiudades()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
          // Verifica que el componente paisDeOrigenComponent y su crosslistComponent existan
        if (this.paisDeOrigenComponent && this.paisDeOrigenComponent.crosslistComponent) {
           // Mapea los datos obtenidos y asigna las descripciones a fechasDatos
          this.paisDeOrigenComponent.crosslistComponent.fechasDatos = data.map(
            (item) => item.descripcion
          );
        }
      });
  }

  /**
  * Método que consulta la lista de países pertenecientes a un bloque
  * específico, identificado por el parámetro `_bloqueId`. Los datos obtenidos
  * se asignan a la propiedad `paisesPorBloque` y se extraen las descripciones
  * de los países para asignarlas a la propiedad `selectRangoDias`. 
  * Utiliza `takeUntil` para manejar la cancelación de suscripciones.
  * 
  * @param _bloqueId Identificador del bloque para obtener los países correspondientes.
  */
  fetchPaisesPorBloque(_bloqueId: number): void {
    // Llamada al servicio para obtener los países por bloque
    this.permisodehidrocarburosService
      .getPaisesPorBloque(_bloqueId)
      .pipe(takeUntil(this.destroyed$)) // Se asegura de que la suscripción se cancele correctamente
      .subscribe((data: Catalogo[]) => {
        // Asigna los países obtenidos a la propiedad paisesPorBloque
        this.paisesPorBloque = data;
        // Mapea las descripciones de los países y las asigna a selectRangoDias
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }
/**
   * Método que maneja el cambio de bloque. Llama al método `fetchPaisesPorBloque`
   * con el `bloqueId` proporcionado para actualizar la lista de países correspondientes
   * a dicho bloque.
   * 
   * @param bloqueId Identificador del nuevo bloque.
   */
enCambioDeBloque(bloqueId: number): void {
  // Llama al método fetchPaisesPorBloque para obtener los países correspondientes al bloque
  this.fetchPaisesPorBloque(bloqueId);
}
  
  /**
   * @description Actualiza el estado global en la instancia `tramite130121Store` a partir de los datos obtenidos del formulario.
   * El método extrae el valor del campo especificado en el formulario y, mediante un objeto de mapeo, invoca
   * el método correspondiente en el store. Se maneja de forma especial el método `setValorPartidaUSD` para
   * convertir el valor a número antes de actualizar el estado.
   *
   * @param {Object} event Objeto que contiene la información necesaria para actualizar el store.
   * @param {FormGroup} event.form Formulario Angular del cual se extrae el valor del campo.
   * @param {string} event.campo Nombre del campo del formulario cuyo valor se utilizará.
   * @param {string} event.metodoNombre Nombre del método a invocar en el store.
   * @returns {void}
   */
  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
  
    const METHOD_MAPPING: { [key: string]: (val: string | number) => void } = {
      updateSolicitud: (val) => this.tramite130121Store.updateSolicitud(String(val)),
      setDescripcionPartidasDeLaMercancia: (val) => this.tramite130121Store.setDescripcionPartidasDeLaMercancia(String(val)),
      setCantidadPartidasDeLaMercancia: (val) => this.tramite130121Store.setCantidadPartidasDeLaMercancia(String(val)),
      setValorPartidaUSDPartidasDeLaMercancia: (val) => this.tramite130121Store.setValorPartidaUSDPartidasDeLaMercancia(typeof val === 'string' ? parseFloat(val) || 0 : val),
      setregimen: (val) => this.tramite130121Store.setregimen(String(val)),
      setclasificacion: (val) => this.tramite130121Store.setclasificacion(String(val)),
      setProducto: (val) => this.tramite130121Store.setProducto(String(val)),
      setDescripcion: (val) => this.tramite130121Store.setDescripcion(String(val)),
      setCantidad: (val) => this.tramite130121Store.setCantidad(String(val)),
      // Caso especial: convierte el valor a número antes de llamar a la función
      setValorPartidaUSD: (val) => this.tramite130121Store.setValorPartidaUSD(parseFloat(String(val)) || 0),
      setUnidadMedida: (val) => this.tramite130121Store.setUnidadMedida(String(val)),
      setBloque: (val) => this.tramite130121Store.setBloque(String(val)),
      setUsoEspecifico: (val) => this.tramite130121Store.setUsoEspecifico(String(val)),
      setJustificacionImportacionExportacion: (val) => this.tramite130121Store.setJustificacionImportacionExportacion(String(val)),
      setObservaciones: (val) => this.tramite130121Store.setObservaciones(String(val)),
      setEntidad: (val) => this.tramite130121Store.setEntidad(String(val)),
      setRepresentacion: (val) => this.tramite130121Store.setRepresentacion(String(val)),
      setUmt: (val) => this.tramite130121Store.setUmt(String(val)),
      setNico: (val) => this.tramite130121Store.setNico(String(val)),
      setFraccion: (val) => this.tramite130121Store.setFraccion(String(val)),
      setAcotacion: (val) => this.tramite130121Store.setAcotacion(String(val)),
    };
  
    const METODO = METHOD_MAPPING[event.metodoNombre];
  
    if (METODO) {
      METODO(VALOR);
    } else {
      console.error(`Método ${event.metodoNombre} no existe en Tramite130121Store`);
    }
  }
  

 /**
  * Se ejecuta cuando el componente o servicio es destruido.
  * 
  * Este método es parte del ciclo de vida de un componente de Angular. Se utiliza para liberar recursos y evitar
  * fugas de memoria, cancelando observables o tareas que ya no son necesarias una vez que el componente ha sido destruido.
  * En este caso, se emite un valor a través de `destroyed$` y se completa el observable, lo que indica que el 
  * componente ya no necesita estar suscrito o escuchar cambios.
  * 
  * @returns {void}
  */
 ngOnDestroy(): void {
  // Emite un valor indicando que el componente ha sido destruido
  this.destroyed$.next();

  // Completa el observable para evitar fugas de memoria
  this.destroyed$.complete();
}

}