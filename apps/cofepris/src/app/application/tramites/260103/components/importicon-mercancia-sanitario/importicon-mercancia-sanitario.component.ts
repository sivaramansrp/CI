import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CROSLISTA_DE_PAISES,
  DATOS_MERCANCIA_CLAVE_TABLA,
  DESCRIPCION_FRACCION_DESHABILITADO_VALOR,
  UMT_DESHABILITADO_VALOR
} from '../../../../shared/constantes/datos-solicitud.enum';
import {
  Catalogo,
  CrossListLable,
  MercanciaForm,
  TablaMercanciaClaveConfig,
} from '../../../../shared/models/datos-solicitud.model';
import {
  CatalogoSelectComponent,
  CrosslistComponent,
  TablaAcciones,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component,OnDestroy, OnInit,} from '@angular/core';
import { Subject,first,takeUntil, tap } from 'rxjs';
import {
  Tramite260103State,
  Tramite260103Store,
} from '../../estados/tramite260103Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { TablaMercanciasImportacion } from '../../models/importicon-retorno.model';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';

/**
 * @component DatosMercanciaComponent
 * @description Componente encargado de capturar y emitir los datos de una mercancía.
 * Utiliza formularios reactivos y listas cruzadas para países de origen, procedencia y uso específico.
 */
@Component({
  selector: 'app-exporticon-mercancia-estupefacientes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    TablaDinamicaComponent
  ],
  templateUrl:'./importicon-mercancia-sanitario.component.html',
  styleUrl: './importicon-mercancia-sanitario.component.scss',
  providers: [DatosSolicitudService],
})
export class ImporticonMercanciaSanitarioComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} mercanciaForm
   * Formulario reactivo principal para capturar los datos de la mercancía.
   */
  public mercanciaForm!: FormGroup;

  /**
   * @property {MercanciaForm} MercanciaForm
   * Input que recibe el estado inicial del formulario de mercancía.
   */
   public mercanciaFormState!: MercanciaForm

  /**
   * @property {Catalogo[]} clasificacionProductoDatos
   * @description Catalog of product classifications used to populate the form.
   */
  public clasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} especificarClasificacionProductoDatos
   * @description Catalog of specific product classifications used to populate the form.
   */
  public especificarClasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} tipoProductoDatos
   * @description Catalog of product types used to populate the form.
   */
  public tipoProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} estadoFisicoDatos
   * @description Catalog of physical states used to populate the form.
   */
  public estadoFisicoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} cantidadUmcDatos
   * @description Catalog of commercial unit quantities used to populate the form.
   */
  public cantidadUmcDatos!: Catalogo[];

  /**
   * @property {boolean} usoEspesificoColapsable
   * Controla la visibilidad del listado de uso específico.
   */
  public usoEspesificoColapsable = false;

  /**
   * @property {CrossListLable} usoEspesificoLabel
   * Etiqueta personalizada para el componente de lista cruzada de uso específico.
   * Define los títulos para los elementos disponibles y seleccionados.
   */
  public usoEspesificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico',
    derecha: 'Uso específico',
  };

 /**
   * @property {boolean} paisDeOriginColapsable
   * Controla la visibilidad del listado de país de origen.
   */
 public paisDeOriginColapsable = false;

 /**
  * @property {boolean} paisDeProcedenciaColapsable
  * Controla la visibilidad del listado de país de procedencia.
  */
 public paisDeProcedenciaColapsable = false;


 /** Etiquetas personalizadas para los crosslists */
 public paisDeOriginLabel: CrossListLable = {
  tituluDeLaIzquierda: 'País de origen',
  derecha: 'País(es) seleccionado(s)',
};

/**
 * @property {CrossListLable} paisDeProcedenciaLabel
 * Etiqueta personalizada para el componente de lista cruzada de país de procedencia.
 * Define los títulos mostrados en la parte izquierda y derecha del componente.
 */
public paisDeProcedenciaLabel: CrossListLable = {
  tituluDeLaIzquierda: 'País de procedencia',
  derecha: 'País(es) seleccionados',
};

/**
   * @property {string[]} seleccionadasPaisDeOriginDatos
   * Lista de países seleccionados como origen.
   */
public seleccionadasPaisDeOriginDatos: string[] = [];

/**
 * @property {string[]} seleccionadasPaisDeProcedenciaDatos
 * Lista de países seleccionados como procedencia.
 */
public seleccionadasPaisDeProcedenciaDatos: string[] = [];

/**
   * @property {Catalogo[]} paisDeProcedenciaDatos
   * Datos de países para la lista cruzada de procedencia.
   */
public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;

  /**
   * @property {Catalogo[]} seleccionarOrigenDelPais
   * Datos de países para lista cruzada de país de origen.
   */
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;



  /**
   * @property {string[]} seleccionadasUsoEspesificoDatos
   * Lista de usos específicos seleccionados.
   */
  public seleccionadasUsoEspesificoDatos: string[] = [];

  /**
   * @property {Catalogo[]} usoEspesificoDatos
   * Datos de usos específicos para lista cruzada.
   */
  public usoEspesificoDatos = CROSLISTA_DE_PAISES;

  /**
   * Tipo de selección de la tabla (en este caso, selección por checkbox).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260103State} tramiteState
   * Estado completo del trámite, que contiene información como la tabla de mercancías.
   */
  public tramiteState!: Tramite260103State;

   /**
     * Configuración para la clave de mercancía.
     *
     * Esta propiedad define la configuración utilizada para la tabla de selección
     * de claves de mercancía. Incluye el tipo de selección, la configuración de la tabla
     * y los datos asociados.
     *
     * Propiedades:
     * - `tipoSeleccionTabla`: Define el tipo de selección en la tabla (por ejemplo, CHECKBOX).
     * - `configuracionTabla`: Configuración específica de la tabla para mostrar las claves de mercancía.
     * - `datos`: Arreglo que contiene los datos de configuración de las claves de mercancía.
     */
    public claveConfig = {
      tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
      configuracionTabla: DATOS_MERCANCIA_CLAVE_TABLA,
      datos: [] as TablaMercanciaClaveConfig[],
      acciones: [
TablaAcciones.UNDEFINED
      ]
       };
    /**
     * @property {TablaMercanciaClaveConfig[]} scianLista
     * Lista de registros Clave seleccionados.
     */
    public claveLista: TablaMercanciaClaveConfig[] = [];
    /**
     * Valida elementos según el `idProcedimiento` y establece
     * las listas de elementos no válidos y añadidos.
     * @returns {void} Lista de elementos no válidos.
     */

  /**
   * @constructor
   * Inicializa el formulario de mercancía y carga catálogos desde archivos JSON.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datosSolicitudService - Servicio que carga catálogos desde assets.
   * @param ubicaccion - Servicio para manejar navegación (si es necesario).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private tramite260103Query: Tramite260103Query,
    private tramite260103Store: Tramite260103Store,
    private ubicaccion: Location
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'clasificacionProductoDatos',
      '/cofepris/mercanciaClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'especificarClasificacionProductoDatos',
      '/cofepris/especificarClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'tipoProductoDatos',
      '/cofepris/tipoProductoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'cantidadUmcDatos',
      '/cofepris/cantidadUmcDatos.json'
    );
  }

  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Llama al método `crearMercanciaForm` para construir el formulario.
   */
  ngOnInit(): void {
    this.tramite260103Query.selectTramiteState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      first(), 
      tap((seccionState)=>{
        this.tramiteState = seccionState;
        this.mercanciaFormState=this.tramiteState.mercanciaForm;
        this.crearMercanciaForm();
      })
    )
    .subscribe();
  }

  /**
   * @method crearMercanciaForm
   * @description Crea y configura el formulario reactivo para la gestión de mercancías estupefacientes.
   * Este formulario incluye validaciones requeridas para varios campos relacionados con la clasificación,
   * denominación, tipo, cantidad, origen y otros detalles específicos de la mercancía.
   * 
   * @returns {void} No retorna ningún valor.
   * 
   */
  crearMercanciaForm(): void {
    this.mercanciaForm = this.fb.group({
      clasificacionProducto: [
        this.mercanciaFormState.clasificacionProducto,
        Validators.required,
      ],
      especificarClasificacionProducto: [
        this.mercanciaFormState.especificarClasificacionProducto,
        Validators.required,
      ],
      marca:[this.mercanciaFormState.marca, Validators.required],
      denominacionEspecificaProducto: [
        this.mercanciaFormState.denominacionEspecificaProducto,
        Validators.required,
      ],
      tipoProducto: [this.mercanciaFormState.tipoProducto, Validators.required],
      fraccionArancelaria: [
        this.mercanciaFormState.fraccionArancelaria,
        Validators.required,
      ],
      descripcionFraccion: [
        {
          value: this.mercanciaFormState.descripcionFraccion,
          disabled: true
        },
        Validators.required,
      ],
      cantidadUmtValor: [
       { value:this.mercanciaFormState.cantidadUmtValor,
        disabled: true
       },
        Validators.required,
      ],
      cantidadUMT: [
           this.mercanciaFormState.cantidadUmt,
            Validators.required,
      ],
      cantidadUmcValor: [
        this.mercanciaFormState.cantidadUmcValor,
        Validators.required,
      ],
      cantidadUMC: [this.mercanciaFormState.cantidadUmc, Validators.required],
      claveDeLos:[this.mercanciaFormState.claveDeLos,Validators.required],
      fechaDeFabricacio:[this.mercanciaFormState.fechaDeFabricacio],
      fechaDeCaducidad:[this.mercanciaFormState.fechaDeCaducidad],
      paisOrigen: [
        this.mercanciaFormState.paisDeOriginDatos || [],
        Validators.required,
      ],
      paisProcedencia: [
        this.mercanciaFormState.paisDeProcedenciaDatos || [],
        Validators.required,
      ],
      usoEspecifico: [
        this.mercanciaFormState.usoEspecifico || [],
        Validators.required,
      ],
    });
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return (
        control.controls[campo]?.errors && control.controls[campo]?.touched
      );
    }
    return control.errors && control.touched;
  }

  /**
   * Maneja el evento de cambio para las selecciones de uso específico.
   *
   * @param events - Un arreglo de cadenas que representa las selecciones actuales de uso específico.
   *
   * Este método actualiza la propiedad `seleccionadasUsoEspesificoDatos` con las selecciones proporcionadas
   * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `usoEspecifico`.
   */
  usoEspesificoSeleccionadasChange(events: string[]): void {
    if (events.length > 0) {
      this.seleccionadasUsoEspesificoDatos = events;
      this.mercanciaForm.get('usoEspecifico')?.setValue(events[0]);
    }
  }

  /**
   * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
   *
   * @param orden - Número que indica la sección a modificar:
   *   - 1: Alterna el estado de `paisDeOriginColapsable`.
   *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
   *   - 3: Alterna el estado de `usoEspesificoColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
    }
    else if (orden === 2) {
      this.paisDeProcedenciaColapsable = !this.paisDeProcedenciaColapsable;
    } else if (orden === 3) {
      this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
    }
  }

  /**
   * Agrega una nueva mercancía utilizando los datos del formulario actual
   * y emite un evento con la información de la mercancía seleccionada.
   * Luego, navega de regreso a la ubicación anterior.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancia(): void {
    this.mercanciaSeleccionado(this.mercanciaForm.getRawValue());
    this.ubicaccion.back();
  }

  /**
   * Restablece el formulario de mercancía a su estado inicial.
   * Este método se utiliza para limpiar todos los campos del formulario,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarMercancia(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }


  /**
   * @method mercanciaSeleccionado
   * @description Maneja la selección de una mercancía en la tabla de mercancías. 
   * Actualiza el estado de la mercancía seleccionada y la configuración de datos de la tabla.
   * 
   * @param {TablaMercanciasImportacion} event - Objeto que contiene los datos de la mercancía seleccionada.
   * 
   * @returns {void}
   */
  mercanciaSeleccionado(event: TablaMercanciasImportacion): void {
    

    const SELECCIONADO_MERCANCIA :TablaMercanciasImportacion= {
      clasificacionProducto: event.clasificacionProducto,
      especificarClasificacionProducto: event.especificarClasificacionProducto,
      denominacionEspecificaProducto: event.denominacionEspecificaProducto,
      denominacionCumonInternacional: event.denominacionCumonInternacional,
      marcaComercialDenominacion: event.marcaComercialDenominacion,
      cantidadDeLotes: event.cantidadDeLotes,
      numeroDePiezasAFabricar: event.numeroDePiezasAFabricar,
      descripcionNumeroDePiezas: event.descripcionNumeroDePiezas,
      formaFarmaceutica: event.formaFarmaceutica,
      estadoFisico: event.estadoFisico,
      fraccionArancelaria: event.fraccionArancelaria,
      descripcionFraccion: event.descripcionFraccion,
      unidadMedidaComercializacion: event.cantidadUmcValor,
      cantidadUMC: event.cantidadUMC,
      unidadMedidaTarifa: event.cantidadUmtValor ?? '',
      cantidadUMT: event.cantidadUMT,
      presentacion: event.presentacion,
      numeroRegistroSanitario: event.numeroRegistroSanitario,
      paisOrigen: event.paisOrigen,
      paisProcedencia: event.paisProcedencia,
      tipoProducto: event.tipoProducto,
      usoEspecifico: event.usoEspecifico,
      numeroCAS: event.numeroCAS,
      paisDeDestino: event.paisDeDestino,
      marca: event.marca,
    };

    const INDICES = this.tramiteState.tablaMercanciasConfigDatos.findIndex(
      (idx) =>
        idx.clasificacionProducto ===
        SELECCIONADO_MERCANCIA.clasificacionProducto.toString()
    );

    let datosActivos = [];

    if (INDICES !== -1) {
      const TABLE_MERCANCIA_DATA = this.tramiteState.tablaMercanciasConfigDatos;
      TABLE_MERCANCIA_DATA.splice(INDICES, 1, SELECCIONADO_MERCANCIA);
      datosActivos = TABLE_MERCANCIA_DATA;
    } else {
      datosActivos = [
        ...this.tramiteState.tablaMercanciasConfigDatos,
        SELECCIONADO_MERCANCIA,
      ];
    }

    this.tramite260103Store.update((state) => ({
      ...state,
      seleccionadoPRODUCTO_TABLA_IMPORTACION: [SELECCIONADO_MERCANCIA],
      tablaMercanciasConfigDatos: datosActivos,
    }));
  }

  /**
   * Actualiza la lista de claves y ajusta los valores del formulario de mercancía
   * según la fila seleccionada en la configuración de claves.
   *
   * @param event - Arreglo de configuraciones de claves de mercancía (`TablaMercanciaClaveConfig[]`).
   *                Contiene las claves que se utilizarán para actualizar la lista.
   *
   * - Si la lista de claves está vacía, la función no realiza ninguna acción.
   * - Busca en los datos de configuración de claves una fila que coincida con las claves proporcionadas.
   * - Si se encuentra una fila coincidente, actualiza los valores del formulario de mercancía
   *   con los datos de la fila seleccionada, incluyendo la clave, la fecha de fabricación
   *   y la fecha de caducidad.
   */
  claveListaFn(event: TablaMercanciaClaveConfig[]): void {
    this.claveLista = event;
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    const FILA_SELECCIONADA = this.claveConfig.datos.find((item) =>
      CLAVES_A_ELIMINAR.has(item.clave)
    );
    if (FILA_SELECCIONADA) {
      this.mercanciaForm.patchValue({
        claveDeLos: FILA_SELECCIONADA.clave,
        fechaDeFabricacio: FILA_SELECCIONADA.fabricacion,
        fechaDeCaducidad: FILA_SELECCIONADA.caducidad,
      });
    }
  }
  /**
   * Agrega una nueva clave a la lista `claveConfig.datos`
   * solo si los valores de los campos no están vacíos.
   */
  agregarClave(): void {
    const CLAVE = this.mercanciaForm.get('claveDeLos')?.value;
    const FABRICACION = this.mercanciaForm.get('fechaDeFabricacio')?.value;
    const CADUCIDAD = this.mercanciaForm.get('fechaDeCaducidad')?.value;
    if (CLAVE && FABRICACION && CADUCIDAD) {
      this.claveConfig.datos.push({
        clave: CLAVE,
        fabricacion: FABRICACION,
        caducidad: CADUCIDAD,
      });
      this.mercanciaForm.patchValue({
        claveDeLos: '',
        fechaDeFabricacio: '',
        fechaDeCaducidad: '',
      });
    }
  }

  /**
   * Elimina las claves seleccionadas en `claveLista` de `claveConfig.datos`.
   * Si la lista de claves a eliminar está vacía, no hace nada.
   */
  eliminarClave(): void {
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    this.claveConfig.datos = this.claveConfig.datos.filter(
      (item) => !CLAVES_A_ELIMINAR.has(item.clave)
    );
  }

   /**
   * Restablece los valores de los campos clave en el formulario.
   */
   modificarClave(): void {
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    const CLAVE = this.mercanciaForm.get('claveDeLos')?.value;
    const FABRICACION = this.mercanciaForm.get('fechaDeFabricacio')?.value;
    const CADUCIDAD = this.mercanciaForm.get('fechaDeCaducidad')?.value;
    for (let i = 0; i < this.claveConfig.datos.length; i++) {
      const ITEM = this.claveConfig.datos[i];
      if (CLAVES_A_ELIMINAR.has(ITEM.clave)) {
        this.claveConfig.datos[i] = {
          clave: CLAVE,
          fabricacion: FABRICACION,
          caducidad: CADUCIDAD,
        };
        break;
      }
    }
  }

    /**
   * Maneja el evento de cambio para las selecciones de país de procedencia.
   *
   * @param events - Un arreglo de cadenas que representa los países seleccionados.
   *
   * Actualiza la propiedad `seleccionadasPaisDeProcedenciaDatos` con los valores seleccionados
   * y sincroniza el formulario `mercanciaForm` con los datos actualizados.
   */
    paisDeProcedenciaSeleccionadasChange(events: string[]): void {
      this.seleccionadasPaisDeProcedenciaDatos = events;
      this.mercanciaForm.patchValue({
        paisProcedencia: events,
      });
    }

      /**
   * Método que se ejecuta cuando cambia la selección de países de origen.
   * Actualiza la lista de países seleccionados y sincroniza el formulario de mercancía
   * con los datos seleccionados.
   *
   * @param events - Arreglo de cadenas que representa los países seleccionados.
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.mercanciaForm.patchValue({
      paisOrigen: events,
    });
  }

  /**
    * @method cambiarFraccionArancelaria
    * @description Actualiza los valores de los campos `descripcionFraccion` y `cantidadUmt` en el formulario reactivo `mercanciaForm`
    * cuando el campo `fraccionArancelaria` está presente.
    *
    * @remarks
    * Este método verifica si el control `fraccionArancelaria` existe en el formulario. Si es así, establece valores predeterminados
    * para los campos `descripcionFraccion` y `cantidadUmt` utilizando las constantes `DESCRIPCION_FRACCION_DESHABILITADO_VALOR` y
    * `UMT_DESHABILITADO_VALOR`, respectivamente.
    *
    * @returns {void} Este método no retorna ningún valor.
    */
   cambiarFraccionArancelaria(): void {
     if (
       this.mercanciaForm.get('fraccionArancelaria') &&
       this.mercanciaForm.get('cantidadUmtValor')?.disabled
     ) {
       this.mercanciaForm
         .get('descripcionFraccion')
         ?.setValue(DESCRIPCION_FRACCION_DESHABILITADO_VALOR);
       this.mercanciaForm.get('cantidadUmtValor')?.setValue(UMT_DESHABILITADO_VALOR);
     }
   }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
