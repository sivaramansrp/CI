import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HEADER_TABLA_AEREO,
  HEADER_TABLA_CARRETERO,
  HEADER_TABLA_FERROVIARIO,
  HEADER_TABLA_MARITIMO,
  HEADER_TABLA_OTRO,
  LABEL_HORA_ARRIBO,
} from '../../../core/enums/transporte-componente.enums';
import {
  ItemTransporte,
  TransporteAereo,
  TransporteCarretero,
  TransporteFerroviario,
  TransporteMaritimo,
  TransporteOtro,
  TransportePeatonal,
} from '../../../core/models/shared/agregar-trasnporte.model';
import {
  Notificacion,
  NotificacionesComponent,
} from '../notificaciones/notificaciones.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { BooleanoSiNoPipe } from '../../pipes/booleanoSiNo/booleano-si-no.pipe';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { HEADER_TABLA_PEATONAL } from '../../../core/enums/transporte-componente.enum';
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
    InputCheckComponent,
    InputHoraComponent,
    NotificacionesComponent,
    ReactiveFormsModule,
    BooleanoSiNoPipe,
  ],
})
export class TransporteComponent implements OnInit, OnChanges {
  @Input({ required: true }) catalogoTransporte!: Catalogo[];

  /**
   * Datos de la tabla de transporte.
   * @type {any[]}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() tablaTransporte!: any[];

  @Input() tipoTransporteSeleccionado!: string;

  /**
   * Emisor de eventos para enviar los datos de la tabla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() datosTabla: EventEmitter<any[]> = new EventEmitter<
    (
      | TransporteAereo
      | TransporteCarretero
      | TransporteFerroviario
      | TransporteMaritimo
      | TransporteOtro
      | TransportePeatonal
    )[]
  >();

  @Output() seleccionTipoTransporte: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('agregarTransporte') agregarTransporte!: ElementRef;
  @ViewChild('btnCerrarModal') btnCerrarModal!: ElementRef;
  @ViewChild('carretero') carretero!: TemplateRef<void>;
  @ViewChild('ferroviario') ferroviario!: TemplateRef<void>;
  @ViewChild('aereo') aereo!: TemplateRef<void>;
  @ViewChild('maritimo') maritimo!: TemplateRef<void>;
  @ViewChild('peatonal') peatonal!: TemplateRef<void>;
  @ViewChild('otro') otro!: TemplateRef<void>;

  /**
   * Cabecera de la tabla para el transporte ferroviario.
   */
  readonly HEADER_TABLA_FERROVIARIO: ItemTransporte[] =
    HEADER_TABLA_FERROVIARIO;

  /**
   * Cabecera de la tabla para el transporte carretero.
   */
  readonly HEADER_TABLA_CARRETERO: ItemTransporte[] = HEADER_TABLA_CARRETERO;

  /**
   * Cabecera de la tabla para el transporte peatonal.
   */
  readonly HEADER_TABLA_PEATONAL: ItemTransporte[] = HEADER_TABLA_PEATONAL;

  /**
   * Cabecera de la tabla para el transporte otro.
   */
  readonly HEADER_TABLA_OTRO: ItemTransporte[] = HEADER_TABLA_OTRO;

  /**
   * Cabecera de la tabla para el transporte aereo.
   */
  readonly HEADER_TABLA_AEREO: ItemTransporte[] = HEADER_TABLA_AEREO;

  /**
   * Cabecera de la tabla para el transporte maritimo.
   */
  readonly HEADER_TABLA_MARITIMO: ItemTransporte[] = HEADER_TABLA_MARITIMO;

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
  headerTabla!: ItemTransporte[];

  /**
   * Contenido de la tabla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyTabla: any[] = [];

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

  public tipoEquipoCatalogo: ICatalogo[] = [];

  anios!: Catalogo[];

  tipoTransporteForma: FormGroup = this.fb.group({
    tipoTransporte: [-1],
  });

  tituloModal!: string;
  mensajeModal!: string;
  tipoTransporte: string = '';

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
      this.onChangeTipoTransporte();
    }
  }

  onChangeTipoTransporte(): void {
    if (this.bodyTabla.length > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Se borraran los datos de la tabla.',
        cerrar: false,
        txtBtnAceptar: 'Sí',
        txtBtnCancelar: 'No',
      };
      return;
    }
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
      empTransportista: ['', [Validators.maxLength(80)]],
      numeroPorte: ['', [Validators.maxLength(50)]],
      fechaPorte: ['', [Validators.maxLength(10)]],
      marcaTransporte: ['', [Validators.maxLength(70)]],
      modeloTransporte: [-1],
      placasTransporte: ['', [Validators.maxLength(150)]],
      contenedorTransporte: ['', [Validators.maxLength(150)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte carretero.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearFerroviarioForm(): void {
    this.ferroviarioForma = this.fb.group({
      numeroBL: ['', [Validators.maxLength(25)]],
      tipoEquipo: [{ value: '-1', disabled: true }],
      inicialesEquipo: [
        { value: '', disabled: true },
        [Validators.maxLength(10)],
      ],
      numeroEquipo: [{ value: '', disabled: true }, [Validators.maxLength(15)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte peatonal.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearPeatonalForm(): void {
    this.peatonalForma = this.fb.group({
      rfcEmpresa: ['', [Validators.maxLength(13)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      nombreTransportista: ['', [Validators.maxLength(100)]],
      numGafete: ['', [Validators.maxLength(20)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte otro.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearOtroForm(): void {
    this.otroForma = this.fb.group({
      tipoTransporteDes: ['', [Validators.maxLength(100)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      datosTransporte: ['', [Validators.maxLength(250)]],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte áereo.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearAereoForm(): void {
    this.aereoForma = this.fb.group({
      arriboPendienteAereo: [''],
      guiaMasterAereo: ['', [Validators.maxLength(12)]],
      guiaHouseAereo: ['', [Validators.maxLength(25)]],
      fechaArriboAereo: ['', [Validators.maxLength(15)]],
      horaArriboAereo: ['', [Validators.maxLength(5)]],
      guiaValida: [{ value: false, disabled: true }],
    });
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte marítimo.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
  crearMaritimoForm(): void {
    this.maritimoForma = this.fb.group({
      guiaBLMaritimo: ['', [Validators.maxLength(15)]],
      guiaHouseMaritimo: ['', [Validators.maxLength(15)]],
      nombreBuqueMaritimo: ['', [Validators.maxLength(70)]],
      contenedorMaritimo: ['', Validators.maxLength(600)],
    });
  }

  /**
   * Determina el tipo de tabla y configura el formulario correspondiente según el tipo de transporte.
   *
   * @returns {ItemTransporte[]} Encabezados de la tabla correspondientes al tipo de transporte seleccionado.
   */
  tipoTabla(tipoTransporte: number): ItemTransporte[] {
    switch (tipoTransporte) {
      case 1:
        this.anios = TransporteComponent.obtenerAniosModelo();
        return this.HEADER_TABLA_CARRETERO;
      case 2:
        return this.HEADER_TABLA_FERROVIARIO;
      case 3:
        return this.HEADER_TABLA_AEREO;
        break;
      case 4:
        return this.HEADER_TABLA_MARITIMO;
        break;
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
   * Verifica si el valor proporcionado es un booleano.
   *
   * @param valor - Valor a verificar.
   * @returns {boolean} `true` si el valor es un booleano, de lo contrario `false`.
   */

  // eslint-disable-next-line class-methods-use-this
  esBooleano(valor: string | number | boolean): boolean {
    return typeof valor === 'boolean';
  }

  /**
   * Selecciona o deselecciona todos los checkboxes con la clase 'check-transporte'.
   *
   * @param event - Evento que contiene el estado del checkbox principal.
   * @returns void
   */
  // eslint-disable-next-line class-methods-use-this
  seleccionarTodos(event: Event): void {
    const CHECKBOXES = document.querySelectorAll('.check-transporte');
    CHECKBOXES.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = (
        event.target as HTMLInputElement
      ).checked;
    });
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

  eliminarElementoTabla(): void {}

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
        const TRANSPORTE: TransporteCarretero = this.carreteroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.carreteroForma.reset();
        break;
      }

      case 2: {
        const TRANSPORTE: TransporteFerroviario =
          this.ferroviarioForma.getRawValue();
        TRANSPORTE.tipoEquipo =
          TRANSPORTE.tipoEquipo === '-1' ? '' : TRANSPORTE.tipoEquipo;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.ferroviarioForma.reset();
        break;
      }

      case 3: {
        const TRANSPORTE: TransporteAereo = this.aereoForma.getRawValue();
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.aereoForma.reset();
        break;
      }

      case 4: {
        const TRANSPORTE: TransporteMaritimo = this.maritimoForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.maritimoForma.reset();
        break;
      }
      case 5: {
        const TRANSPORTE: TransportePeatonal = this.peatonalForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.peatonalForma.reset();
        break;
      }

      default: {
        const TRANSPORTE: TransporteOtro = this.otroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        this.otroForma.reset();
        break;
      }
    }

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
      this.ferroviarioForma.get('numeroBL')?.value,
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
              this.agregarValorCampoDisabled('tipoEquipo', DATOS.tipoEquipo);
              this.agregarValorCampoDisabled(
                'inicialesEquipo',
                DATOS.inicialesEquipo
              );
              this.agregarValorCampoDisabled(
                'numeroEquipo',
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
    const GUIA_MASTER = this.aereoForma.get('guiaMasterAereo')?.value;
    const GUIA_HOUSE = this.aereoForma.get('guiaHouseAereo')?.value;

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
            this.aereoForma.get('guiaValida')?.setValue(true);
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

  confirmacionModal(aceptar: boolean): void {
    if (aceptar) {
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
