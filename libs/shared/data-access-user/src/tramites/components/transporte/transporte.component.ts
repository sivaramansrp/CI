import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HEADER_TABLA_AEREO,
  HEADER_TABLA_CARRETERO,
  HEADER_TABLA_FERROVIARIO,
  HEADER_TABLA_MARITIMO,
  HEADER_TABLA_OTRO,
  HEADER_TABLA_PEATONAL,
  LABEL_HORA_ARRIBO,
  LISTA_TIPO_TRANSPORTE,
  MSG_AGREGA_TRANSPORTE_EXITOSAMENTE,
  MSG_CAMBIO_TIPO_TRANSPORTE,
} from '../../../core/enums/transporte-componente.enum';
import {
  ItemTransporteDespacho,
  TransporteDespacho,
} from '../../../core/models/shared/agregar-transporte.model';
import {
  Notificacion,
  NotificacionesComponent,
} from '../notificaciones/notificaciones.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ICatalogo } from '../../../core/models/shared/catalogo.model';
import { InputCheckComponent } from '../input-check/input-check.component';
import { InputHoraComponent } from '../input-hora/input-hora.component';
import { Modal } from 'bootstrap';
import { TIPO_TRANSPORTE } from '../../constantes/agregar-transporte.enum';
import { TipoEquipoService } from '../../../core/services/shared/catalogos/tipo-equipo.service';
import { ValidaTransporteService } from '../../../core/services/shared/api-validaciones/valida-transporte.service';

@Component({
  selector: 'lib-transporte',
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    FormsModule,
    InputCheckComponent,
    InputHoraComponent,
    NotificacionesComponent,
    ReactiveFormsModule,
  ],
})
export class TransporteComponent implements OnInit, OnChanges {
  /**
   * Datos de entrada del catalogo de transporte.
   * @type {Catalogo[]}
   */
  @Input({ required: true }) catalogoTransporte!: Catalogo[];

  /**
   * Datos de la tabla de transporte.
   * @type {TransporteDespacho[]}
   */
  @Input() tablaTransporte!: TransporteDespacho[];

  /**
   * Tipo de transporte seleccionado.
   * @type {string}
   */
  @Input() tipoTransporteSeleccionado!: string;

  /**
   * Emisor de eventos para enviar los datos de la tabla.
   */
  @Output() datosTabla: EventEmitter<TransporteDespacho[]> = new EventEmitter<
    TransporteDespacho[]
  >();

  /**
   * Referencia al elemento del modal para agregar transporte.
   */
  @ViewChild('agregarTransporte') agregarTransporte!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('btnCerrarModal') btnCerrarModal!: ElementRef;

  /**
   * Emisor de eventos para enviar el tipo de transporte seleccionado.
   * @type {EventEmitter<string>}
   */
  @Output() seleccionTipoTransporte: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Cabecera de la tabla para el transporte ferroviario.
   */
  readonly HEADER_TABLA_FERROVIARIO: ItemTransporteDespacho[] =
    HEADER_TABLA_FERROVIARIO;

  /**
   * Cabecera de la tabla para el transporte carretero.
   */
  readonly HEADER_TABLA_CARRETERO: ItemTransporteDespacho[] =
    HEADER_TABLA_CARRETERO;

  /**
   * Cabecera de la tabla para el transporte peatonal.
   */
  readonly HEADER_TABLA_PEATONAL: ItemTransporteDespacho[] =
    HEADER_TABLA_PEATONAL;

  /**
   * Cabecera de la tabla para el transporte otro.
   */
  readonly HEADER_TABLA_OTRO: ItemTransporteDespacho[] = HEADER_TABLA_OTRO;

  /**
   * Cabecera de la tabla para el transporte aereo.
   */
  readonly HEADER_TABLA_AEREO: ItemTransporteDespacho[] = HEADER_TABLA_AEREO;

  /**
   * Cabecera de la tabla para el transporte maritimo.
   */
  readonly HEADER_TABLA_MARITIMO: ItemTransporteDespacho[] =
    HEADER_TABLA_MARITIMO;

  /**
   * Etiqueta para la hora de arribo.
   */
  readonly LABEL_HORA_ARRIBO: string = LABEL_HORA_ARRIBO;

  /**
   * Formulario para el transporte carretero.
   */
  carreteroForma!: FormGroup;

  /**
   * Formulario para el transporte ferroviario.
   */
  ferroviarioForma!: FormGroup;

  /**
   * Formulario para el transporte peatonal.
   */
  peatonalForma!: FormGroup;

  /**
   * Formulario para el transporte otro.
   */
  otroForma!: FormGroup;

  /**
   * Formulario para el transporte maritimo.
   */
  maritimoForma!: FormGroup;

  /**
   * Formulario para el transporte aereo.
   */
  aereoForma!: FormGroup;

  /**
   * Cabecera de la tabla.
   */
  headerTabla!: ItemTransporteDespacho[];

  /**
   * Contenido de la tabla.
   */
  bodyTabla: TransporteDespacho[] = [];

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Control para las observaciones.
   */
  public observaciones: FormControl = new FormControl('', [
    Validators.maxLength(500),
  ]);

  /**
   * @description Notificador para destruir el observable al finalizar el componente.
   * Se utiliza para evitar fugas de memoria y asegurar que los recursos se liberen adecuadamente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista del catalogo tipo de equipo
   * @type {ICatalogo[]}
   */
  public tipoEquipoCatalogo: ICatalogo[] = [];

  /**
   *  @description Lista de modelos de carros respecto al año.
   *  @type {Catalogo[]}
   */
  anios!: Catalogo[];

  /**
   * @description Formulario para seleccionar el tipo de transporte.
   * @type {FormGroup}
   */
  tipoTransporteForma: FormGroup = this.fb.group({
    tipoTransporte: [-1],
  });

  /**
   * @description Titulo del modal.
   * @type {string}
   */
  tituloModal!: string;

  /**
   * @description Mensaje del modal.
   * @type {string}
   */
  mensajeModal!: string;

  /**
   * @description Tipo de transporte seleccionado.
   * @type {string}
   */
  tipoTransporte: string = '';

  /**
   * @description Lista que contiene los tipos de transporte.
   * @type {ICatalogo[]}
   */
  readonly LISTA_TIPO_TRANSPORTE = LISTA_TIPO_TRANSPORTE;

  /**
   * @description Indica si se deben seleccionar todos los checkboxes de la tabla.
   * @type {boolean}
   */
  checkSeleccionarTodos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tipoEquipoServicio: TipoEquipoService,
    private validaTransporteService: ValidaTransporteService
  ) {}

  ngOnInit(): void {
    this.crearLosFormularios();
    this.getTipoEquipo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tablaTransporte'] && changes['tablaTransporte'].currentValue) {
      this.bodyTabla = [...this.tablaTransporte];
    }

    if (
      changes['tipoTransporteSeleccionado'] &&
      changes['tipoTransporteSeleccionado'].currentValue
    ) {
      this.tipoTransporteForma
        .get('tipoTransporte')
        ?.setValue(this.tipoTransporteSeleccionado);

      this.creaTablaTransporte();
    }
  }

  onChangeTipoTransporte(): void {
    if (this.bodyTabla.length > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: MSG_CAMBIO_TIPO_TRANSPORTE,
        cerrar: false,
        txtBtnAceptar: 'Sí',
        txtBtnCancelar: 'No',
      };
      return;
    }

    this.creaTablaTransporte();
  }

  /**
   * Crea la tabla de transporte según el tipo seleccionado.
   * @returns {void} No retorna ningún valor.
   */
  creaTablaTransporte(): void {
    const TIPO_TRANSPORTE = parseInt(
      this.tipoTransporteForma.get('tipoTransporte')?.value,
      10
    );
    this.seleccionTipoTransporte.emit(TIPO_TRANSPORTE.toString());
    this.headerTabla = this.tipoTabla(TIPO_TRANSPORTE);
  }

  /**
   * Crea los formularios para cada tipo de transporte.
   * @returns void
   */
  crearLosFormularios(): void {
    this.crearCarreteroForm();
    this.crearFerroviarioForm();
    this.crearPeatonalForm();
    this.crearOtroForm();
    this.crearAereoForm();
    this.crearMaritimoForm();
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte carretero.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearCarreteroForm(): void {
    this.carreteroForma = this.fb.group({
      emp_transportista: ['', [Validators.maxLength(80)]],
      numero_porte: ['', [Validators.maxLength(50)]],
      fecha_porte: ['', [Validators.maxLength(10)]],
      marca_transporte: ['', [Validators.maxLength(70)]],
      modelo_transporte: [-1],
      placas_transporte: ['', [Validators.maxLength(150)]],
      contenedor_transporte: ['', [Validators.maxLength(150)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte carretero.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearFerroviarioForm(): void {
    this.ferroviarioForma = this.fb.group({
      numero_bl: ['', [Validators.maxLength(25)]],
      tipo_equipo: [{ value: '-1', disabled: true }],
      iniciales_equipo: [
        { value: '', disabled: true },
        [Validators.maxLength(10)],
      ],
      numero_equipo: [
        { value: '', disabled: true },
        [Validators.maxLength(15)],
      ],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte peatonal.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearPeatonalForm(): void {
    this.peatonalForma = this.fb.group({
      rfc_empresa: ['', [Validators.maxLength(13)]],
      emp_transportista: ['', [Validators.maxLength(80)]],
      nombre_transportista: ['', [Validators.maxLength(100)]],
      num_gafete: ['', [Validators.maxLength(20)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte otro.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearOtroForm(): void {
    this.otroForma = this.fb.group({
      tipo_transporte_des: ['', [Validators.maxLength(100)]],
      emp_transportista: ['', [Validators.maxLength(80)]],
      datos_transporte: ['', [Validators.maxLength(250)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte áereo.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearAereoForm(): void {
    this.aereoForma = this.fb.group({
      arribo_pendiente_aereo: [''],
      guia_master_aereo: ['', [Validators.maxLength(12)]],
      guia_house_aereo: ['', [Validators.maxLength(25)]],
      fecha_arribo_aereo: ['', [Validators.maxLength(15)]],
      hora_arribo_aereo: ['', [Validators.maxLength(5)]],
      guia_valida: [{ value: false, disabled: true }],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte marítimo.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearMaritimoForm(): void {
    this.maritimoForma = this.fb.group({
      guia_bl_Maritimo: ['', [Validators.maxLength(15)]],
      guia_house_maritimo: ['', [Validators.maxLength(15)]],
      nombre_buque_maritimo: ['', [Validators.maxLength(70)]],
      contenedor_maritimo: ['', Validators.maxLength(600)],
    });
  }

  /**
   * Determina el tipo de tabla y configura el formulario correspondiente según el tipo de transporte.
   *
   * @returns {ItemTransporte[]} Encabezados de la tabla correspondientes al tipo de transporte seleccionado.
   */
  tipoTabla(tipoTransporte: number): ItemTransporteDespacho[] {
    switch (tipoTransporte) {
      case 1:
        this.anios = TransporteComponent.obtenerAniosModelo();
        return this.HEADER_TABLA_CARRETERO;
      case 2:
        return this.HEADER_TABLA_FERROVIARIO;
      case 3:
        return this.HEADER_TABLA_AEREO;
      case 4:
        return this.HEADER_TABLA_MARITIMO;
      case 5:
        return this.HEADER_TABLA_PEATONAL;
      default:
        return this.HEADER_TABLA_OTRO;
    }
  }

  /**
   * Obtiene el catálogo de tipo de equipo para el tipo de transporte ferroviario.
   * return {void} No retorna ningún valor.
   */
  getTipoEquipo(): void {
    this.tipoEquipoServicio
      .getTipoEquipo()
      .pipe(
        tap((response) => {
          if (response) {
            this.tipoEquipoCatalogo = response.datos;
          }
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
   * @description Esta función genera un array de años desde 1980 hasta el año actual.
   * @returns {Catalogo[]} - Devuelve un array de años desde 1980 hasta el año actual.
   */
  static obtenerAniosModelo(): Catalogo[] {
    const ANIO_ACTUAL = new Date().getFullYear();
    const ANIOS: Catalogo[] = [];
    for (let i = 1980; i <= ANIO_ACTUAL; i++) {
      const ANIO: Catalogo = {
        id: i,
        descripcion: i.toString(),
      };

      ANIOS.push(ANIO);
    }

    return ANIOS;
  }

  /**
   * Selecciona o deselecciona todos los checkboxes con la clase 'check-transporte'.
   *
   * @param event - Evento que contiene el estado del checkbox principal.
   * @returns void
   */
  seleccionarTodos(event: Event): void {
    this.checkSeleccionarTodos = !this.checkSeleccionarTodos;
    const CHECKBOXES = (event.target as HTMLInputElement).checked;
    this.bodyTabla.forEach((item) => {
      item.seleccionado = CHECKBOXES;
    });
  }

  /**
   * Selecciona uno o varios checkboxes con la clase 'check-transporte'.
   */
  seleccionarItemTabla(i: number): void {
    const ITEM = this.bodyTabla[i];
    ITEM.seleccionado = !ITEM.seleccionado;
  }

  /**
   * Elimina los elementos seleccionados de la tabla de transporte.
   * @returns {void} No retorna ningún valor.
   */
  eliminarSeleccionados(): void {
    const SELECCIONADOS = this.bodyTabla.every((item) => item.seleccionado);

    if (SELECCIONADOS) {
      this.bodyTabla = [];
      this.checkSeleccionarTodos = false;
    }

    this.datosTabla.emit(this.bodyTabla);
  }

  /**
   * Abre el modal para agregar un documento.
   * @returns {void}
   */
  abrirModal(): void {
    const MODAL_AGREGA = new Modal(this.agregarTransporte.nativeElement);
    MODAL_AGREGA.show();
  }

  /**
   * Restablece el formulario carretero a su estado inicial.
   * @returns {void}
   */
  limpiarFormulario(): void {
    const FORMULARIOS = [
      this.carreteroForma,
      this.ferroviarioForma,
      this.peatonalForma,
      this.otroForma,
      this.aereoForma,
      this.maritimoForma,
    ];

    FORMULARIOS.forEach((form) => form?.reset());

    this.observaciones.setValue('');
  }

  /**
   * Cierra el modal.
   * @returns {void}
   */
  cerrarModal(): void {
    this.btnCerrarModal.nativeElement.click();
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  /**
   * Agrega un tipo de transporte a la tabla según el tipo seleccionado.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregarTipoTransporte(): void {
    const TIPO_TRANSPORTE = parseInt(
      this.tipoTransporteForma.get('tipoTransporte')?.value,
      10
    );
    switch (TIPO_TRANSPORTE) {
      case 1: {
        const TRANSPORTE: TransporteDespacho = this.carreteroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;
        this.bodyTabla.push(TRANSPORTE);
        this.carreteroForma.reset();
        break;
      }

      case 2: {
        const TRANSPORTE: TransporteDespacho =
          this.ferroviarioForma.getRawValue();
        TRANSPORTE.tipo_equipo =
          TRANSPORTE.tipo_equipo === '-1' ? '' : TRANSPORTE.tipo_equipo;
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;

        this.bodyTabla.push(TRANSPORTE);
        this.ferroviarioForma.reset();
        break;
      }

      case 3: {
        const TRANSPORTE: TransporteDespacho = this.aereoForma.getRawValue();
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;

        this.bodyTabla.push(TRANSPORTE);
        this.aereoForma.reset();
        break;
      }

      case 4: {
        const TRANSPORTE: TransporteDespacho = this.maritimoForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;

        this.bodyTabla.push(TRANSPORTE);
        this.maritimoForma.reset();
        break;
      }
      case 5: {
        const TRANSPORTE: TransporteDespacho = this.peatonalForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;

        this.bodyTabla.push(TRANSPORTE);
        this.peatonalForma.reset();
        break;
      }

      default: {
        const TRANSPORTE: TransporteDespacho = this.otroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        TRANSPORTE.seleccionado = false;

        this.bodyTabla.push(TRANSPORTE);
        this.otroForma.reset();
        break;
      }
    }

    const DESCRIPCION_TIPO_TRANSPORTE =
      this.LISTA_TIPO_TRANSPORTE.find((item) => item.id === TIPO_TRANSPORTE)
        ?.nombre ?? '';

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: 'Aviso',
      mensaje: MSG_AGREGA_TRANSPORTE_EXITOSAMENTE.replace(
        '{tipoTransporte}',
        DESCRIPCION_TIPO_TRANSPORTE
      ),
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };

    this.observaciones.setValue('');
    this.enviarTransporteTabla();
    this.cerrarModal();
  }

  /**
   * Emite los datos de transporte a la tabla.
   *
   * @returns {void} No retorna ningún valor.
   */
  enviarTransporteTabla(): void {
    this.datosTabla.emit(this.bodyTabla);
  }

  /**
   * Valida el número BL para el transporte ferroviario, si s valido, regresa los datos de tipo equipo, Iniciales de quipo y Número de equipo.
   * @returns {void} No retorna ningún valor.
   */
  postValidarNumeroBL(): void {
    const NUMERO_BL = parseInt(
      this.ferroviarioForma.get('numero_bl')?.value,
      10
    );
    if (NUMERO_BL) {
      this.validaTransporteService
        .getValidaTransporte(TIPO_TRANSPORTE.FERRO, {
          numeroBL: NUMERO_BL,
        })
        .pipe(
          tap((response) => {
            if (response.codigo === '00') {
              const DATOS = response.datos;
              this.agregarValorCampoDisabled('tipo_equipo', DATOS.tipoEquipo);
              this.agregarValorCampoDisabled(
                'iniciales_equipo',
                DATOS.inicialesEquipo
              );
              this.agregarValorCampoDisabled(
                'numero_equipo',
                DATOS.numeroEquipo
              );
            } else {
              this.nuevaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: '',
                modo: 'action',
                titulo: 'Aviso',
                mensaje: 'Número BL es inválido.',
                cerrar: false,
                txtBtnAceptar: 'Cerrar',
                txtBtnCancelar: '',
              };
            }
          }),
          takeUntil(this.destroyNotifier$)
        )
        .subscribe();
    } else {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Debes agregar un número BL.',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
    }
  }

  /**
   * Valida la guía aérea, si es válida, se habilita el campo de guía válida.
   * @returns {void} No retorna ningún valor.
   */
  postValidarGuiaAerea(): void {
    const GUIA_MASTER = this.aereoForma.get('guia_master_aereo')?.value;
    const GUIA_HOUSE = this.aereoForma.get('guia_house_aereo')?.value;

    if (GUIA_HOUSE && GUIA_MASTER) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Debes registar una sola guía.',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      return;
    }

    if (!GUIA_MASTER && !GUIA_HOUSE) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Debes registrar la guía master o la guía house.',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      return;
    }

    const GUIA = GUIA_MASTER ? GUIA_MASTER : GUIA_HOUSE;
    this.validaTransporteService
      .getValidaTransporte(TIPO_TRANSPORTE.AEREO, { guiaHouseAereo: GUIA })
      .pipe(
        tap((response) => {
          if (response.codigo === '00') {
            this.aereoForma.get('guia_valida')?.setValue(true);
          }
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
   * Agrega un valor a un campo del formulario que esta desactivado.
   * @param campo {string} - Nombre del campo en el formulario.
   * @param valor {string | null} - Valor a establecer en el campo.
   */
  agregarValorCampoDisabled(campo: string, valor: string | null): void {
    this.ferroviarioForma.get(campo)?.enable();
    this.ferroviarioForma.get(campo)?.setValue(valor);
    this.ferroviarioForma.get(campo)?.disable();
  }

  /**
   * Metodo para manejar la confirmación del modal.
   * @param aceptar {boolean} - Indica si se acepta la acción.
   */
  confirmacionModal(aceptar: boolean): void {
    if (aceptar && this.nuevaNotificacion.txtBtnCancelar !== '') {
      this.bodyTabla = [];
      this.datosTabla.emit(this.bodyTabla);
      const TIPO_TRANSPORTE = parseInt(
        this.tipoTransporteForma.get('tipoTransporte')?.value,
        10
      );
      this.headerTabla = this.tipoTabla(TIPO_TRANSPORTE);
    } else {
      this.tipoTransporteForma
        .get('tipoTransporte')
        ?.setValue(this.tipoTransporteSeleccionado);
    }
  }
}
