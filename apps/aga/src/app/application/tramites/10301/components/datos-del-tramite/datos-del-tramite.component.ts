import {
  AlertComponent,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConsultaioQuery,
  ConsultaioState,
  CrosslistComponent,
  InputRadioComponent,
  TableBodyData,
  TableComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import {
  Catalogo,
  Solicitud10301State,
  Tramite10301Store,
} from '../../estados/tramite10301.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImportadorExportadorService } from '../../services/importador-exportador.service';
import { SELECCION } from '../../constantes/importador-exportador.enum';
import { Tramite10301Query } from '../../estados/tramite10301.query';
import mercanciaTable from '@libs/shared/theme/assets/json/10301/mercancia-table.json';

/**
 * Texto de adjuntar para terceros.
 */
const TERCEROS_TEXTO_DE_ADJUNTAR =
  'Debes capturar la descripción de la mercancía en los mismos términos de la carta de donación';
/**
 * Componente que representa los datos del trámite.
 */
@Component({
  selector: 'app-datos-del-tramite',
  templateUrl: './datos-del-tramite.component.html',
  styleUrls: ['./datos-del-tramite.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TableComponent,
    AlertComponent,
    CrosslistComponent,
    InputRadioComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * Suscripciones a observables.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud10301State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Suscripción para obtener el catálogo de aduanas.
   */
  getAduanaIngresaraSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de años.
   */
  getAnoSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de condiciones.
   */
  getCondicionSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de países.
   */
  getPaisSubscription!: Subscription;

  /**
   * Texto de adjuntar para terceros.
   */
  TEXTO_DE_ADJUNTAR: string = TERCEROS_TEXTO_DE_ADJUNTAR;

  /**
   * Indica si la tabla debe mostrarse.
   */
  showTabla = true;

  /**
   * Indica si el popup está abierto.
   */
  isPopupOpen = false;

  /**
   * Indica si el popup está cerrado.
   */
  isPopupClose = true;

  /**
   * Lista de fines elegidos.
   */
  finesElegidos: string[] = [];

  /**
   * Lista de fines elegidos seleccionados.
   */
  elegidosSeleccionados: string[] = [];

  /**
   * Catálogo de aduanas.
   */
  aduana!: CatalogosSelect;

  /**
   * Catálogo de años.
   */
  ano!: CatalogosSelect;

  /**
   * Catálogo de condiciones.
   */
  condicion!: CatalogosSelect;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Lista de rangos de días seleccionados.
   */
  selectRangoDias: [] = [];
  /**
   * Lista de fechas seleccionadas.
   */

  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Lista de datos de fechas disponibles.
   */
  fechasDatos: Catalogo[] = [];
  /**
   * Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');
  /**
   * Formulario de trámite.
   */
  tramiteForm!: FormGroup;

  /**
   * Valor seleccionado del radio.
   */
  valorSeleccionado!: string;

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: TableBodyData[] = [];

  /**
   * Datos de la tabla de mercancías obtenidos desde un archivo JSON.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Inicializa los datos de la tabla de mercancías.
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData?.mercanciaTable?.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData?.mercanciaTable?.tableBody;
  }

  esFormularioSoloLectura: boolean = false;
  /**
   * Indica si el formulario es de solo lectura.
   * 
   */
  formularioDeshabilitado: boolean = true;
  /**
   * Indicates whether the selected location is a country.
   * Set to `true` if the location is a country, otherwise `false`.
   */
  isPais: boolean = false;
    /**
   * Indicates whether the selected location is a country.
   * Set to `true` if the location is a country, otherwise `false`.
   */
  isDesplegableDepaises: boolean = false;
    /**
   * Indicates whether the selected location is a country.
   * Set to `true` if the location is a country, otherwise `false`.
   */
  isAdunaMarcancia: boolean = false;
  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  botonField = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: (): void => this.agregar(''),
    },
    {
      btnNombre: 'Agregar todo',
      class: 'btn-default',
      funcion: ():void => this.agregar(SELECCION.SELECT_ALL),
    },
    {
      btnNombre: 'Remover',
      class: 'btn-danger',
      funcion: ():void => this.quitar(''),
    },
    {
      btnNombre: 'Remover todo',
      class: 'btn-default',
      funcion: ():void => this.quitar(SELECCION.SELECT_ALL),
    },
  ];

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * Constructor que se utiliza para la inyección de dependencias.
   * @param importarExportar Servicio de importador/exportador.
   * @param importarExportar Servicio de importador/exportador.
   * @param store Store de Akita para gestionar el estado.
   * @param query Query de Akita para seleccionar el estado.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param validacionesService Servicio de validaciones de formularios.
   * * Este componente se encarga de manejar los datos del trámite 10301, incluyendo la gestión de fechas,
   * * la selección de aduanas, años, condiciones y países, así como la validación del formulario.
   * @remarks
   * Este componente se encarga de manejar los datos del trámite 10301, incluyendo la gestión de fechas,
   * la selección de aduanas, años, condiciones y países, así como la validación del formulario.
   * Este componente es parte de la aplicación de gestión de trámites aduaneros y se
   * utiliza para capturar y validar la información relacionada con el trámite 10301.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private importarExportar: ImportadorExportadorService,
    private store: Tramite10301Store,
    private query: Tramite10301Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 10301
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.getAduanaIngresara();
    this.getAno();
    this.getCondicion();
    this.getPais();
    this.obtenerMercancia();
    this.inicializarEstadoFormulario();

    this.subscriptions.push(
      this.query.selectFechasSeleccionadas$.subscribe((fechas) => {
        this.fechasSeleccionadas = fechas ?? [];
      })
    );
    this.subscriptions.push(
      this.query.selectAduana$.subscribe((aduana) => {
        this.aduana = {
          labelNombre: 'Aduana por la que ingresará la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: aduana ?? [],
        };
      })
    );
    this.subscriptions.push(
      this.query.selectAno$.subscribe((ano) => {
        this.ano = {
          labelNombre: 'Año',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: ano || [],
        };
      })
    );
    this.subscriptions.push(
      this.query.selectCondicion$.subscribe((condicion) => {
        this.condicion = {
          labelNombre: 'Condición de la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: condicion ?? [],
        };
      })
    );
    this.subscriptions.push(
      this.query.selectPais$.subscribe((pais) => {
        this.pais = {
          labelNombre: 'País',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: pais ?? [],
        };
      })
    );
  }
  /**
   * Inicializa el estado del formulario según si es de solo lectura o no.
   * Si es de solo lectura, guarda los datos del formulario; de lo contrario, inicializa el formulario con los datos del donante y domicilio.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosDelFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregar(tipo: string): void {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value;
      const SELECTEDFECHA = this.fechasDatos.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasSeleccionadas.push(SELECTEDFECHA);
        this.fechasDatos = this.fechasDatos.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value;
      const SELECTEDFECHA = this.fechasSeleccionadas.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasDatos.push(SELECTEDFECHA);
        this.fechasSeleccionadas = this.fechasSeleccionadas.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }

  /**
   * Opciones de radio.
   */
  radioOpcions = [
    { label: 'Sí', value: 'sí' },
    { label: 'No', value: 'no' },
  ];
  /**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */
  cambiarRadio(value: string | number):void {
    this.valorSeleccionado = value as string;
    this.store.setValorSeleccionado(this.valorSeleccionado);
  }

  /**
   * Obtiene el catálogo de años.
   */
  getAno(): void {
    this.getAnoSubscription = this.importarExportar
      .getAno()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setAno(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el catálogo de condiciones.
   */
  getCondicion(): void {
    this.getCondicionSubscription = this.importarExportar
      .getCondicion()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setCondicion(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el catálogo de países.
   */
  getPais(): void {
    this.getPaisSubscription = this.importarExportar
      .getPais()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setPais(RESPONSE);
        }
      });
  }


  /**
   * Obtiene la información de la aduana por la que ingresará la mercancía y actualiza el store con los datos obtenidos.
   * 
   * Este método se suscribe al observable `getAduanaIngresara` del servicio `importarExportar`.
   * Si la respuesta es exitosa (código HTTP 200), almacena los datos recibidos en el estado de la aplicación usando el método `store.setAduana`.
   * 
   * @returns void
   */
  getAduanaIngresara(): void {
    this.getAduanaIngresaraSubscription = this.importarExportar
      .getAduanaIngresara()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setAduana(RESPONSE);
        }
      });
  }

  /**
   * Abre el popup.
   */
  openPopup():void{
    this.isPopupOpen = true;
    this.store.setIsPopupOpen(this.isPopupOpen);
  }

  /**
   * Cierra el popup.
   */
  closePopup():void {
    this.isPopupOpen = false;
    this.isPopupClose = false;
    this.store.setIsPopupOpen(this.isPopupOpen);
    this.store.setIsPopupClose(this.isPopupClose);
  }

  /**
   * Muestra la siguiente tabla.
   */
  nextTabla():void{
    this.showTabla = false;
    this.store.setShowTabla(this.showTabla);
  }

  /**
   * Verifica si un campo del formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo.
   * @param {string} field - El nombre del campo a verificar.
   * @returns {boolean} - Retorna true si el campo es válido, de lo contrario false.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Habilita o deshabilita el formulario `tramiteForm` según el estado de solo lectura.
   * 
   * - Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), el formulario se deshabilita.
   * - De lo contrario, el formulario se habilita.
   */
  guardarDatosDelFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.tramiteForm.disable();
    } else {
      this.tramiteForm.enable();
    }
  }
  /**
   * Establece los valores en el store de tramite10301.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite10301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
     this.importadorExportador.get(campo)?.updateValueAndValidity();

  }
  /**
   * Obtiene el grupo de formulario de importador/exportador.
   *
   * @returns {FormGroup} - El grupo de formulario de importador/exportador.
   */
  get importadorExportador(): FormGroup {
    return this.tramiteForm.get('importadorExportador') as FormGroup;
  }
  /**
   * Inicializa el formulario de donante y domicilio con los valores del estado de la solicitud.
   */
  donanteDomicilio(): void {

    this.tramiteForm = this.fb.group({
      importadorExportador: this.fb.group({
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        nombre: [
          this.solicitudState?.nombre,
          [Validators.required, Validators.maxLength(50)],
        ],
        tipoMercancia: [
          this.solicitudState?.tipoMercancia,
          [Validators.required, Validators.maxLength(100)],
        ],
        usoEspecifico: [
          this.solicitudState?.usoEspecifico,
          [Validators.required, Validators.maxLength(512)],
        ],
        condicion: [this.solicitudState?.condicion, Validators.required],
        marca: [
          this.solicitudState?.marca,
          [Validators.required, Validators.maxLength(50)],
        ],
        ano: [this.solicitudState?.ano, [Validators.required]],
        modelo: [
          this.solicitudState?.modelo,
          [Validators.required, Validators.maxLength(50)],
        ],
        serie: [
          this.solicitudState?.serie,
          [Validators.required, Validators.maxLength(50)],
        ],
        manifesto: [this.solicitudState?.manifesto, Validators.required],
        calle: [
          this.solicitudState?.calle,
          [Validators.required, Validators.maxLength(100)],
        ],
        numeroExterior: [
          this.solicitudState?.numeroExterior,
          [Validators.required, Validators.maxLength(10)],
        ],
        numeroInterior: [
          this.solicitudState?.numeroInterior,
          [Validators.maxLength(10)],
        ],
        telefono: [
          this.solicitudState?.telefono,
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        correoElectronico: [
          this.solicitudState?.correoElectronico,
          [Validators.required, Validators.email],
        ],
        pais: [this.solicitudState?.pais, Validators.required],
        codigoPostal: [
          this.solicitudState?.codigoPostal,
          [Validators.required, Validators.pattern(/^\d{5}$/)],
        ],
        estado: [
          this.solicitudState?.estado,
          [Validators.required, Validators.maxLength(50)],
        ],
        colonia: [
          this.solicitudState?.colonia,
          [Validators.required, Validators.maxLength(50)],
        ],
        opcion: [this.solicitudState?.opcion],
      }),
    });
  }
  
  /**
   * Método de limpieza que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    if (this.getAduanaIngresaraSubscription) {
      this.getAduanaIngresaraSubscription.unsubscribe();
    }
    if (this.getAnoSubscription) {
      this.getAnoSubscription.unsubscribe();
    }
    if (this.getPaisSubscription) {
      this.getPaisSubscription.unsubscribe();
    }
    if (this.getCondicionSubscription) {
      this.getCondicionSubscription.unsubscribe();
    }
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}