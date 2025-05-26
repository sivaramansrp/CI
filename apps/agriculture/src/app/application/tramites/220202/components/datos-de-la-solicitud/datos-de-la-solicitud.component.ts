import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import { DatosDeFila, DatosForma, FilaSolicitud } from '../../models/220202/fitosanitario.model';

import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/220202/fitosanitario.enums';

import { map, Subject, takeUntil } from 'rxjs';

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

/**
 * @component DatosDeLaSolicitudComponent
 * @description Componente para la sección de datos de la solicitud en el formulario de fitosanitarios.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule
  ],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /** @description Indica si el panel de detalle está colapsado o no. */
  colapsable: boolean = false;

  /** 
   * @description Datos para las columnas de la tabla. 
   * Cada elemento del array representa una columna y contiene la información para mostrar en la cabecera y las celdas de la tabla.
   */
  mesaColumnas: string[] = [];

  /** 
   * @description Rango de días seleccionados. 
   * Este array contiene las fechas seleccionadas por el usuario para filtrar la información mostrada en la tabla.
   */
  selectRangoDias: string[] = [];

  /** 
   * @description Instrucción para el doble clic. 
   * Este string contiene el mensaje que se muestra al usuario indicando que debe hacer doble clic en una celda para ver más detalles.
   */
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  /** 
   * @description Datos para el cuerpo de la tabla. 
   * Este array contiene la información que se muestra en las celdas de la tabla, excluyendo la cabecera.
   */
  mesaCuerpo: string[] = [];

  /** 
   * @description Datos de las filas de la tabla. 
   * Este array de objetos contiene la información de cada fila de la tabla. Cada objeto representa una fila y contiene las propiedades necesarias para mostrar los datos en las celdas.
   */
  tablaDeDatosDeCelda: DatosDeFila[] = [];

  /** 
   * @description Formulario para los datos del trámite. 
   * Este `FormGroup` contiene los controles para los campos del formulario relacionados con los datos del trámite.
   */
  procedureData?: FormGroup;

  /** 
   * @description Lista de aduanas. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de aduanas en el formulario.
   */
  aduanaList: Catalogo[] = [];

  /** 
   * @description Lista de establecimientos agropecuarios. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de establecimientos agropecuarios en el formulario.
   */
  agropecuariaList: Catalogo[] = [];

  /** 
   * @description Lista de puntos de verificación. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de puntos de verificación en el formulario.
   */
  puntoList: Catalogo[] = [];

  /** 
   * @description Lista de regímenes. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de regímenes en el formulario.
   */
  regimeList: Catalogo[] = [];

  /** 
   * @description Lista de productos. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de productos en el formulario.
   */
  productoList: Catalogo[] = [];

  /** 
   * @description Lista de usos. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de usos en el formulario.
   */
  usoList: Catalogo[] = [];

  /** 
   * @description Lista de unidades de medida de cantidad (UMC). 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de UMC en el formulario.
   */
  umcList: Catalogo[] = [];

  /** 
   * @description Lista de NICO (Número de Identificación Comercial). 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de NICO en el formulario.
   */
  nicoList: Catalogo[] = [];

  /** 
   * @description Lista de fracciones arancelarias. 
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de fracciones arancelarias en el formulario.
   */
  arancelariaList: Catalogo[] = [];

  /** 
   * @description Formulario principal. 
   * Este `FormGroup` contiene todos los controles del formulario.
   */
  forma!: FormGroup;


  /** 
   * @description Formulario para el transporte. 
   * Este `FormGroup` contiene los controles para los campos del formulario relacionados con la información de transporte.
   */
  formularioDeTransporte?: FormGroup;

  formulariodataStore: DatosForma = {} as DatosForma;
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificadoInternacional, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
  ];
  /**
 * @description Datos de la tabla principal.
 * @type {FilaSolicitud[]}
 */
  cuerpoTabla: FilaSolicitud[] = [];
  private destroyNotifier$ = new Subject<void>();

  esFormularioSoloLectura: boolean = false; 


  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio FormBuilder para crear y gestionar formularios reactivos.
   * @param {AgriculturaApiService} agriculturaApiService - Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly agriculturaApiService: AgriculturaApiService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.agriculturaApiService.getAllDatosForma().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formulariodataStore = datos.datos;
    })

    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()

  }

  /**
   * @description Inicializa el componente.
   * Este método se llama automáticamente después de que se crea el componente.
   * Llama a otros métodos para obtener los datos iniciales que se mostrarán en el formulario y la tabla.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.createFromFields();
    this.forma?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        datosFormaValidacion: false,
      };
      FORMA_VALIDA_ACTUALIZADA.datosFormaValidacion = this.forma?.valid ? true : false;
      this.agriculturaApiService.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    })
    this.obtenerTodosLosDatosDeLaLista();

  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.createFromFields();
    }  
  }

  guardarDatosFormulario(): void {
      this.createFromFields();
      if (this.esFormularioSoloLectura) {
        this.forma.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.forma.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

  /**
   * @description Crea los campos del formulario y los agrupa en un `FormGroup`.
   * Inicializa el formulario principal (`forma`) con los controles para los datos de la solicitud, 
   * incluyendo un `FormArray` para las mercancías.
   * @method createFromFields
   * @returns {void}
   */
  /**
 * Método para crear el formulario y sus campos iniciales.
 */
  createFromFields() {
    this.forma = this.fb.group(this.inicializarCamposFormulario());
  }
  /**
   * Método que inicializa los campos del formulario.
   * @returns Un objeto con los campos del formulario.
   */
  inicializarCamposFormulario() {

    return {
      ...this.crearCamposRequeridos(),
      ...this.crearCamposOpcionales(),
    };
  }

  /**
 * Método para crear campos requeridos del formulario.
 * @param FORMULARIO Datos de formulariodataStore.
 * @returns Objeto con los campos requeridos.
 */
  crearCamposRequeridos() {
    const FORMULARIO = this.formulariodataStore;
    return {
      aduanaDeIngreso: [FORMULARIO.aduanaDeIngreso || '', Validators.required],
      oficinaDeInspeccion: [FORMULARIO.oficinaDeInspeccion || '', Validators.required],
      puntoDeInspeccion: [FORMULARIO.puntoDeInspeccion || '', Validators.required],
      regimen: [FORMULARIO.regimen || '', Validators.required],
      numeroDeGuia: [FORMULARIO.numeroDeGuia || ''],
      numeroDeCarro: [FORMULARIO.numeroDeCarro || ''],
      tipoDeRequisito: [FORMULARIO.tipoDeRequisito || '', Validators.required],
      fraccionArancelaria: [FORMULARIO.fraccionArancelaria || '', Validators.required],
      nico: [FORMULARIO.nico || '', Validators.required],
      cantidadUMT: [FORMULARIO.cantidadUMT || '', Validators.required],
      umt: [FORMULARIO.umt || '', Validators.required],
      cantidadUMC: [FORMULARIO.cantidadUMC || '', Validators.required],
      umc: [FORMULARIO.umc || '', Validators.required],
      uso: [FORMULARIO.uso || '', Validators.required],
      tipoDeProducto: [FORMULARIO.tipoDeProducto || '', Validators.required],
    };
  }
  /**
   * Método para crear campos opcionales del formulario.
   * @param FORMULARIO Datos de formulariodataStore.
   * @returns Objeto con los campos opcionales.
   */
  crearCamposOpcionales() {
    const FORMULARIO = this.formulariodataStore;
    return {
      numeroDeGuia: [FORMULARIO.numeroDeGuia || ''],
      requisito: [FORMULARIO.requisito || ''],
      numeroCertificadoInternacional: [FORMULARIO.numeroCertificadoInternacional || ''],
      descripcionFraccion: [FORMULARIO.descripcionFraccion || ''],
      descripcionNico: [FORMULARIO.descripcionNico || ''],
      descripcion: [FORMULARIO.descripcion || ''],
    };
  }




  /**
   * @description Obtiene todos los datos para las listas de opciones (selects) del formulario.
   * Este método llama a las funciones individuales para obtener los datos de cada lista: aduana, agropecuaria, punto, régimen, arancelaria, NICO, producto, unidad de medida de cantidad (UMC) y uso.
   * @method obtenerTodosLosDatosDeLaLista
   * @returns {void}
   */
  obtenerTodosLosDatosDeLaLista() {
    this.getaduanaLista();
    this.getagropecuariaLista();
    this.getPuntoLista();
    this.getRegimenLista();
    this.getArancelariaLista();
    this.getNicoLista();
    this.getProductoLista();
    this.getUmCLista();
    this.getusoLista();
  }

  /**
   * @description Muestra u oculta el panel colapsable.
   * @method mostrar_colapsable
   * @returns {void}
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  /**
   * @description Obtiene la lista de aduanas desde un archivo JSON.
   * @method getaduanaLista
   * @returns {void}
   */
  getaduanaLista() {
    this.agriculturaApiService.obtenerSelectorList('aduana_de_ingreso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.aduanaList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de agropecuarias desde un archivo JSON.
   * @method getagropecuariaLista
   * @returns {void}
   */
  getagropecuariaLista() {
    this.agriculturaApiService.obtenerSelectorList('aduana_de_ingreso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.agropecuariaList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de puntos de verificación desde un archivo JSON.
   * @method getPuntoLista
   * @returns {void}
   */
  getPuntoLista() {
    this.agriculturaApiService.obtenerSelectorList('punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.puntoList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de regímenes desde un archivo JSON.
   * @method getRegimenLista
   * @returns {void}
   */
  getRegimenLista() {
    this.agriculturaApiService.obtenerSelectorList('regimen.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.regimeList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de fracciones arancelarias desde un archivo JSON.
   * @method getArancelariaLista
   * @returns {void}
   */
  getArancelariaLista() {
    this.agriculturaApiService.obtenerSelectorList('nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.arancelariaList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de NICO desde un archivo JSON.
   * @method getNicoLista
   * @returns {void}
   */
  getNicoLista() {
    this.agriculturaApiService.obtenerSelectorList('nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.nicoList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de unidades de medida de cantidad (UMC) desde un archivo JSON.
   * @method getUmCLista
   * @returns {void}
   */
  getUmCLista() {
    this.agriculturaApiService.obtenerSelectorList('nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.umcList = data as Catalogo[];
    })
  }

  /**
   * @description Obtiene la lista de usos desde un archivo JSON.
   * @method getusoLista
   * @returns {void}
   */
  getusoLista() {
    this.agriculturaApiService.obtenerSelectorList('nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.usoList = data as Catalogo[];
    });
  }

  /**
   * @description Obtiene la lista de productos desde un archivo JSON.
   * @method getProductoLista
   * @returns {void}
   */
  getProductoLista() {
    this.agriculturaApiService.obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
        this.productoList = data as Catalogo[];
      });
  }

  /**
   * @description Actualiza los datos almacenados en el store.
   * @method setValoresStore
   * @param {FormGroup} form - El formulario a obtener los valores.
   * @param {string} campo - El nombre del campo del formulario a obtener.
   */
  setValoresStore(
    form?: FormGroup,
    campo?: string
  ): void {
    const VALOR = this.forma.value;
    (this.agriculturaApiService.updateDatosForma as (value: DatosForma) => void)(VALOR);
  }

  /**
   * @description Destruye la suscripción cuando el componente es destruido.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
