import {
  ALERTA_DE_MATERIAL,
  Catalogo,
  CatalogoPaises,
  CrossListLable,
  SeccionLibQuery,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import {
  CONTINUAR,
  CROSLISTA_DE_PAISES,
  LISTA_DE_ENTRADA_PERSONALIZADA,
} from '../../enum/pantallas-constante.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Solicitud230401State,
  Tramite230401Store,
} from '../../estados/tramite230401.store';
import {
  delay,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import {PantallasActionService } from '../../services/pantallas-action.service';
import { SeccionLibState } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  FormSolicitud!: FormGroup;
  tipoSolicitudSeleccionada!: number;
  paisesOrigen!: CatalogoPaises[];
  paisesProcedencia!: CatalogoPaises[];
  aduanas!: Catalogo[];
  seccionAduanera!: Catalogo[];
  tipoOperacion!: Catalogo[];

  public crosListaDePaises = CROSLISTA_DE_PAISES;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud230401State;
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
  public paisDelProductoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País donde se elabora el producto',
    derecha: 'País(es) seleccionado(s)',
  };
  public aduanasDeEntradaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas de entrada disponibles',
    derecha: 'Aduanas de entrada seleccionadas',
  };

  /**
   * Lista de fechas paisDeProcedenciaSeleccionadas.
   */
  paisDeProcedenciaSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas paisDeProcedenciaDatos.
   */
  paisDeProcedenciaDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
  /**crosListaDePaises
   * Control de formulario para la paisDeProcedenciaFecha.
   */
  paisDeProcedenciaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDeProcedenciaFechaSeleccionada.
   */
  paisDeProcedenciaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(CONTINUAR),
    },
  ];

  /**
   * Lista de fechas paisDelProductoSeleccionadas.
   */
  paisDelProductoSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas paisDelProductoDatos.
   */
  paisDelProductoDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  listaPaisDelProducto: string[] = this.crosListaDePaises;
  /**
   * Control de formulario para la paisDelProductoFecha.
   */
  paisDelProductoFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDelProductoFechaSeleccionada.
   */
  paisDelProductoFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  paisDelProductoBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarDos(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarDos(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarDos(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarDos(CONTINUAR),
    },
  ];

  /**
   * Lista de fechas aduanasDeEntradaSeleccionadas.
   */
  aduanasDeEntradaSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas aduanasDeEntradaDatos.
   */
  aduanasDeEntradaDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  listaDeEntradaPersonalizada = LISTA_DE_ENTRADA_PERSONALIZADA;
  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  aduanasDeEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarTres(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarTres(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarTres(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarTres(CONTINUAR),
    },
  ];
  private seccion!: SeccionLibState;

  constructor(public pantallasActionService:PantallasActionService,
    public validacionesService:ValidacionesFormularioService,
    public tramite230401Store:Tramite230401Store,public fb:FormBuilder,
  public solicitud230401Query: Solicitud230401Query,
    private seccionQuery: SeccionLibQuery,private seccionStore: SeccionLibStore) {
    // do nothing
  }

  ngOnInit(): void {
    this.solicitud230401Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
    this.pantallasActionService.inicializaPasoUnoDatosCatalogos();
    this.creatFormSolicitud();
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.FormSolicitud.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 1;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_FORM = this.esFormValido();
          if (this.FormSolicitud.valid || (ES_VALIDO_EL_FORM)) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }

  /**
   * Verifica si el formulario es válido.
   * 
   * Recorre todos los controles del formulario y verifica si alguno de ellos
   * está habilitado e inválido. Si encuentra un control que cumple con estas
   * condiciones, retorna `false`. Si todos los controles habilitados son válidos,
   * retorna `true`.
   * 
   * @returns {boolean} `true` si todos los controles habilitados son válidos, 
   *                    `false` si al menos uno de los controles habilitados es inválido.
   */
  esFormValido(): boolean {
    
    for (const NOMBRE_DEL_CONTROL in this.FormSolicitud.controls) {
      const CONTROL = this.FormSolicitud.get(NOMBRE_DEL_CONTROL);
      if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
        return false;
      }
    }
    return true;
  }

  /**
   * Una constante que contiene el valor del objeto 'PROTESTA'.
   * Se utiliza para almacenar datos adicionales relacionados con el componente.
   */

  TEXTOS = ALERTA_DE_MATERIAL;
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isValid(form: FormGroup, field: string): any {
    return this.validacionesService.isValid(form, field);
  }
  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.paisDeProcedenciaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.paisDeProcedenciaDatos = [];
    } else {
      const FECHAVALOR = this.paisDeProcedenciaFecha.value.map(Number);
      this.paisDeProcedenciaSeleccionadas.push(
        this.paisDeProcedenciaDatos[FECHAVALOR]
      );
      this.paisDeProcedenciaDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.paisDeProcedenciaDatos = [...this.paisDeProcedenciaSeleccionadas];
      this.paisDeProcedenciaSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
      this.paisDeProcedenciaDatos.push(
        this.paisDeProcedenciaSeleccionadas[FECHAVALOR]
      );
      this.paisDeProcedenciaSeleccionadas.splice(FECHAVALOR, 1);
    }
  }
  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregarDos(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.paisDelProductoSeleccionadas = [...this.listaPaisDelProducto];
      this.paisDelProductoDatos = [];
    } else {
      const FECHAVALOR = this.paisDelProductoFecha.value.map(Number);
      this.paisDelProductoSeleccionadas.push(
        this.paisDelProductoDatos[FECHAVALOR]
      );
      this.paisDelProductoDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarDos(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.paisDelProductoDatos = [...this.paisDelProductoSeleccionadas];
      this.paisDelProductoSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
      this.paisDelProductoDatos.push(
        this.paisDelProductoSeleccionadas[FECHAVALOR]
      );
      this.paisDelProductoSeleccionadas.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregarTres(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.aduanasDeEntradaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.aduanasDeEntradaDatos = [];
    } else {
      const FECHAVALOR = this.aduanasDeEntradaFecha.value.map(Number);
      this.aduanasDeEntradaSeleccionadas.push(
        this.aduanasDeEntradaDatos[FECHAVALOR]
      );
      this.aduanasDeEntradaDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarTres(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.aduanasDeEntradaDatos = [...this.aduanasDeEntradaSeleccionadas];
      this.aduanasDeEntradaSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.aduanasDeEntradaFechaSeleccionada.value.map(Number);
      this.aduanasDeEntradaDatos.push(
        this.aduanasDeEntradaSeleccionadas[FECHAVALOR]
      );
      this.aduanasDeEntradaSeleccionadas.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a pantallas con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    const VALRO = form.get(campo)?.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.tramite230401Store as any)[metodoNombre](VALRO);
        if (campo === 'cantidad' && VALRO !== null && VALRO !== undefined) {
      const NUMERO_ACTIVO = Number(VALRO);
      const VALOR_FORMATEDO = String.fromCharCode(NUMERO_ACTIVO);
      this.tramite230401Store.setCantidadLetra(VALOR_FORMATEDO);
    }
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   *
   * Este método obtiene el valor del tipo de solicitud del formulario,
   * lo convierte a un número entero y lo asigna a la propiedad
   * `tipoSolicitudSeleccionada`. Luego, actualiza el estado del
   * `tramite230401Store` con el tipo de solicitud seleccionado.
   */
  tipoSolicitudSeleccion(): void {
    this.tipoSolicitudSeleccionada = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );
    const TIPO_SOLICITUD = this.FormSolicitud.get('tipoSolicitud')?.value;
    this.tramite230401Store.setTipoSolicitud(TIPO_SOLICITUD);
  }

  /**
   * Selecciona el número de permiso de coferprise y actualiza el estado correspondiente.
   */
  noDePermisocoferpriseSeleccion(): void {
    const NO_DE_PERMISOCOFERPRISE = this.FormSolicitud.get(
      'noDePermisocoferprise'
    )?.value;
    this.tramite230401Store.setNoDePermisocoferprise(NO_DE_PERMISOCOFERPRISE);
  }

  /**
   * Selecciona la fracción arancelaria y actualiza el estado correspondiente.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION_ARANCELARIA = this.FormSolicitud.get(
      'fraccionArancelaria'
    )?.value;
    this.tramite230401Store.setFraccionArancelaria(FRACCION_ARANCELARIA);
  }

  /**
   * Selecciona la autorización y actualiza el estado correspondiente.
   */
  seleccioneAutorizacion(): void {
    const AUTORIZACION = this.FormSolicitud.get('autorizacion')?.value;
    this.tramite230401Store.setAutorizacion(AUTORIZACION);
  }

  /**
   * Selecciona el número CAS y actualiza el estado correspondiente.
   */
  numeroCasSeleccione(): void {
    const NUMERO_CAS = this.FormSolicitud.get('numeroCas')?.value;
    this.tramite230401Store.setNumeroCas(NUMERO_CAS);
  }

  /**
   * Selecciona la clasificación y actualiza el estado correspondiente.
   */
  clasificacionSeleccione(): void {
    const CLASIFICACION = this.FormSolicitud.get('clasificacion')?.value;
    this.tramite230401Store.setClasificacion(CLASIFICACION);
  }

  /**
   * Selecciona el estado físico y actualiza el estado correspondiente.
   */
  estadoFisicoSeleccione(): void {
    const ESTADO_FISICO = this.FormSolicitud.get('estadoFisico')?.value;
    this.tramite230401Store.setEstadoFisico(ESTADO_FISICO);
  }

  /**
   * Selecciona los datos del objeto y actualiza el estado correspondiente.
   */
  datosObjectoSeleccione(): void {
    const DAT_OS_OBJECTO = this.FormSolicitud.get('datosObjecto')?.value;
    this.tramite230401Store.setDatosObjecto(DAT_OS_OBJECTO);
  }

  /**
   * Selecciona la unidad de medida y actualiza el estado correspondiente.
   */
  unidadDeMedidaSeleccione(): void {
    const UNIDAD_DE_MEDIDA = this.FormSolicitud.get('unidadDeMedida')?.value;
    this.tramite230401Store.setUnidadDeMedida(UNIDAD_DE_MEDIDA);
  }

  /**
   * Crea el formulario de solicitud.
   * @return {void} No retorna ningún valor.
   */
  creatFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      tipoSolicitud: [
        this.solicitudState?.tipoSolicitud,
        [Validators.required],
      ],
      autorizacion: [this.solicitudState?.autorizada],
      noDePermisocoferprise: [
        this.solicitudState?.noDePermisocoferprise,
        [Validators.required],
      ],
      nombreComercial: [
        { value: this.solicitudState?.nombreComercial, disabled: true },
      ],
      cantidadAutorizada: [
        { value: this.solicitudState?.cantidadAutorizada, disabled: true },
      ],
      fraccionArancelaria: [
        this.solicitudState?.fraccionArancelaria,
        [Validators.required],
      ],
      descripcionDeLaFraccion: [
        { value: this.solicitudState?.descripcionDeLaFraccion, disabled: true },
      ],
      descripcionNoArancelaria: [
        {
          value: this.solicitudState?.descripcionNoArancelaria,
          disabled: true,
        },
      ],
      nombreQuimico: [
        { value: this.solicitudState?.nombreQuimico, disabled: true },
      ],
      numeroCas: [this.solicitudState?.numeroCas, [Validators.required]],
      nombreDeLaMercancia: [
        this.solicitudState?.nombreDeLaMercancia,
        [Validators.maxLength(50)],
      ],
      unNumero: [
        this.solicitudState?.unNumero,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      datosNombreComercial: [
        this.solicitudState?.datosNombreComercial,
        [Validators.maxLength(50)],
      ],
      datosNumeroComun: [
        this.solicitudState?.datosNumeroComun,
        [Validators.maxLength(50)],
      ],
      datosPorcentaje: [
        this.solicitudState?.datosPorcentaje,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      datosComponentes: [
        this.solicitudState?.datosComponentes,
        [Validators.maxLength(50)],
      ],
      clasificacion: [
        this.solicitudState?.clasificacion,
        [Validators.required],
      ],
      estadoFisico: [this.solicitudState?.estadoFisico, [Validators.required]],
      datosObjecto: [this.solicitudState?.datosObjecto, [Validators.required]],
      especifique: [
        this.solicitudState?.especifique,
        [Validators.maxLength(50)],
      ],
      especifiqueDos: [
        this.solicitudState?.especifiqueDos,
        [Validators.maxLength(50)],
      ],
      cantidad: [
        this.solicitudState?.cantidad,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      cantidadLetra: [
        { value: this.solicitudState?.cantidadLetra, disabled: true },
      ],
      unidadDeMedida: [
        this.solicitudState?.unidadDeMedida,
        [Validators.required],
      ],
    });
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
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
