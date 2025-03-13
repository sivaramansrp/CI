import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosDeFila } from '../../models/220202/fitosanitario.model';
import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/220202/fitosanitario.enums';
import { Subject, takeUntil } from 'rxjs';

/**
 * @component DatosDeLaSolicitudComponent
 * @description Componente para la sección de datos de la solicitud en el formulario de fitosanitarios.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss']
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
  forma?: FormGroup;

  /** 
   * @description Formulario para las mercancías. 
   * Este `FormGroup` se utiliza para gestionar los controles relacionados con la información de las mercancías.
   */
  mercanciaForma?: FormGroup;

  /** 
   * @description Formulario para el transporte. 
   * Este `FormGroup` contiene los controles para los campos del formulario relacionados con la información de transporte.
   */
  formularioDeTransporte?: FormGroup;

  private destroyNotifier$ = new Subject<void>();

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio FormBuilder para crear y gestionar formularios reactivos.
   * @param {AgriculturaApiService} agriculturaApiService - Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly agriculturaApiService: AgriculturaApiService
  ) {
    this.createFromFields();
  }

  /**
   * @description Inicializa el componente.
   * Este método se llama automáticamente después de que se crea el componente.
   * Llama a otros métodos para obtener los datos iniciales que se mostrarán en el formulario y la tabla.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.forma?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        datosFormaValidacion: false,
      };
      FORMA_VALIDA_ACTUALIZADA.datosFormaValidacion = this.forma?.valid ? true : FORMA_VALIDA_ACTUALIZADA.datosFormaValidacion;
      this.agriculturaApiService.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    })
    this.obtenerTodosLosDatosDeLaLista();
  }

  /**
   * @description Crea los campos del formulario y los agrupa en un `FormGroup`.
   * Inicializa el formulario principal (`forma`) con los controles para los datos de la solicitud, 
   * incluyendo un `FormArray` para las mercancías.
   * @method createFromFields
   * @returns {void}
   */
  createFromFields() {
    this.forma = this.fb.group({
      aduana: [''],
      agropecuaria: [''],
      punto: [''],
      guia: [''],
      regimen: [''],
      ferrocarril: [''],
      mercancias: this.fb.array([]),
      aduanaMercancia: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      arancelaria: [''],
      descFraccionArancelaria: [{ value: '', disabled: true }],
      nico: [''],
      descNico: [{ value: '', disabled: true }],
      descripcion: [''],
      cantidadUMT: [''],
      umt: [{ value: '', disabled: true }],
      cantidadUMC: [''],
      umc: [''],
      uso: [''],
      producto: [''],
    });
    const MERCANCIAS_ARRAY = this.forma.get('mercancias') as FormArray;
    MERCANCIAS_ARRAY.push(this.fb.group({
      seleccionado: [''],
      noPartida: [''],
      tipoRequisito: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      fraccionArancelaria: [''],
      descFraccion: [''],
      nico: [''],
    }));
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
    form: FormGroup,
    campo: string
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.agriculturaApiService.updateDatosForma as (value: any) => void)(VALOR);
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
