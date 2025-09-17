import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  BANCO_CATALOGOS,
  ESTADO_CATALOGOS
} from '../../constantes/pago-banco.enum';
import {
  Catalogo,
  ConsultaioQuery,
  InputFecha,
  InputFechaComponent,
  REGEX_LLAVE_DE_PAGO_DE_DERECHO,
  REGEX_PATRON_DECIMAL_2,
  TituloComponent
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FECHA_DE_PAGO,
  PagoDerechosFormState
} from '../../models/terceros-relacionados.model';
import {
  PagoDerechosState,
  PagoDerechosStore
} from '../../estados/stores/pago-de-derechos.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BANCO } from '../../constantes/datos-solicitud.enum';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { PagoDerechosQuery } from '../../estados/queries/pago-derechos.query';


/**
 * @component PagoDeDerechosComponent
 * @description Componente responsable de capturar y gestionar la información relacionada
 * con el pago de derechos. Utiliza formularios reactivos para validar los datos y
 * actualiza el estado del trámite automáticamente al detectar cambios.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    TituloComponent,
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * @method eliminarMercancia
   * @description Emits an event to delete one or more merchandise items.
   * This method is used to notify the parent component about the deletion of selected merchandise items.
   *
   * @param {DetalleMercancia[]} datos - An array of merchandise details to be deleted.
   * @returns {void} This method does not return any value.
   */
  @Input() public pagoDerechoFormState!: PagoDerechosFormState;

  /**
   * Identificador del procedimiento recibido como entrada desde un componente padre.
   * @type {number}
   */
  @Input() public idProcedimiento!: number;

  /**
   * Indica si sólo se requiere el campo "colón".
   *
   * @type {boolean}
   * @default false
   */
  @Input() onlyColonRequired: boolean = false;

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() public formularioDeshabilitado: boolean = false;
  
  /**
   * @property {boolean} campoRequerido - Indica si el campo es obligatorio.
   */
  @Input() public campoRequerido: boolean = false;
  /**
   * @property {EventEmitter<PagoDerechosFormState>} updatePagoDerechos
   * @description Output property that emits the updated state of the payment form whenever changes occur.
   * This allows the parent component to stay synchronized with the form's state.
   */

  @Output() public updatePagoDerechos: EventEmitter<PagoDerechosFormState> =
    new EventEmitter<PagoDerechosFormState>();

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject utilizado para gestionar las desuscripciones automáticas y evitar fugas de memoria.
   * Se completa manualmente cuando el componente se destruye.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Indica si se debe mostrar la sección de información bancaria en la interfaz.
   * @type {boolean}
   */
  public mostrarBanco = true;

  /**
   * @property {InputFecha} fechaInicioInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * @property {FormGroup} pagoDerechosForm
   * Formulario reactivo que captura los datos del pago de derechos.
   */
  pagoDerechosForm!: FormGroup;

  /**
   * @property {Catalogo[]} estadosDatos
   * Lista de estados obtenida desde el servicio de catálogos.
   */
  public estadosDatos: Catalogo[] = ESTADO_CATALOGOS;

  /**
   * Arreglo que contiene los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bancoDatos: Catalogo[] = BANCO_CATALOGOS;
  /**
   * Indica si el campo "banco" es obligatorio.
   * @type {boolean}
   */
  public bancoRequerido = true;

  /**
   * Indica si la fecha ingresada es válida (no es futura).
   * @type {boolean}
   */
  public esFechaValida: boolean = true;

  /**
   * Estado actual de la solicitud, obtenido del store.
   * @type {PagoDerechosState}
   */
  public solicitudState!: PagoDerechosState;

  /**
   * @constructor
   * Inicializa el formulario y las dependencias del componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener catálogos desde el backend.
   * @param tramiteStore - Store que administra el estado del trámite actual.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private pagoDerechosStore: PagoDerechosStore,
    private pagoDerechosQuery: PagoDerechosQuery,
    private consultaioQuery: ConsultaioQuery
  ) {

    // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => { 
          this.formularioDeshabilitado = seccionState.readonly;
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Carga los datos iniciales desde el store, configura el formulario
   * con esos valores y suscribe a cambios para mantener el estado sincronizado.
   */
  ngOnInit(): void {
    this.pagoDerechosQuery.selectSolicitud$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.mostrarBanco = BANCO.includes(this.idProcedimiento) ? true : false;
    this.pagoDerechosForm = this.fb.group({
      claveReferencia: [
        this.solicitudState?.claveReferencia || '',
        [Validators.maxLength(9)],
      ],
      cadenaDependencia: [
        this.solicitudState?.cadenaDependencia || '',
        [Validators.maxLength(14)],
      ],
      estado: [this.solicitudState?.estado || '', ],
      banco: [this.solicitudState?.banco || '', ],
      llavePago: [
        this.solicitudState?.llavePago || '',
        [
          Validators.pattern(REGEX_LLAVE_DE_PAGO_DE_DERECHO),
          Validators.maxLength(30),
        ],
      ],
      fechaPago: [this.solicitudState?.fechaPago || '', ],
      importePago: [
        this.solicitudState?.importePago || '',
        [
          decimalValidator(2),
          Validators.maxLength(16),
        ],
      ],
    });
    this.pagoDerechosForm.valueChanges.subscribe((valores) => {
      this.updatePagoDerechos.emit(valores);
    });
    this.formularioDeshabilitado = this.esFormularioSoloLectura
    if (this.formularioDeshabilitado) {
      this.pagoDerechosForm.disable();
    }

    setTimeout(() => {

      this.pagoDerechosForm.patchValue(this.pagoDerechoFormState);
    }, 0);
  }

  /**
   * Hook que se ejecuta cuando cambian las propiedades de entrada del componente.
   * Permite habilitar o deshabilitar los formularios según el modo de solo lectura.
   * @param {SimpleChanges} changes - Cambios detectados en las propiedades de entrada.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formularioDeshabilitado'] && this.pagoDerechosForm) {
      if (this.formularioDeshabilitado) {
        this.pagoDerechosForm.disable();
      } else {
        this.pagoDerechosForm.enable();
      }
    }
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de estados desde el servicio `DatosSolicitudService`
   * y la asigna a la propiedad `estadosDatos`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
        this.pagoDerechosForm.patchValue({
          estado: this.pagoDerechoFormState?.estado || '',
        });
      });
  }

  /**
   * @method getBancoDatos
   * Recupera los datos del banco desde el servicio `datosSolicitudService`
   * y los asigna a la propiedad `bancoDatos`.
   */
  getBancoDatos(): void {
    this.datosSolicitudService
      .getBancoDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.bancoDatos = data;
        this.pagoDerechosForm.patchValue({
          banco: this.solicitudState?.banco || '',
          estado: this.solicitudState?.estado || '',
        });
      });
  }

  /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  alReiniciar(): void {
    this.pagoDerechosForm.reset();
  }

  /**
   * @method onFechaCambiada
   * @description Actualiza la fecha de pago en el formulario.
   *
   * @param {string} fecha - Fecha seleccionada en el componente `InputFecha`.
   */
  onFechaCambiada(fecha: string): void {
    this.pagoDerechosForm.patchValue({ fechaPago: fecha });
    this.pagoDerechosForm.get('fechaPago')?.markAsTouched();
    this.pagoDerechosForm.get('fechaPago')?.markAsDirty();
    this.setValoresStore(this.pagoDerechosForm, 'fechaPago', 'setFechaPago');
  }

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    if (
      nombreControl === 'fechaPago' &&
      this.pagoDerechosForm.get('fechaPago')?.value !== '' &&
      this.pagoDerechosForm.get('fechaPago')?.value !== null
    ) {
      this.esFechaPasada(this.pagoDerechosForm.get('fechaPago')?.value);
      if (!this.esFechaValida) {
        this.pagoDerechosForm
          .get('fechaPago')
          ?.setErrors({ esFechaPasada: true });
        return true;
      }

      this.pagoDerechosForm
        .get('fechaPago')
        ?.setErrors({ esFechaPasada: false });
      return false;
    }
    const CONTROL = this.pagoDerechosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @method esFechaPasada
   * @description Verifica si una fecha proporcionada es anterior a la fecha actual.
   *
   * @param {string} fechaStr - La fecha en formato de cadena que se desea evaluar.
   *
   * @returns {void} No retorna ningún valor, pero actualiza la propiedad `esFechaValida`
   * indicando si la fecha proporcionada es una fecha pasada.
   *
   * @example
   * // Supongamos que la fecha actual es 2023-03-15
   * this.esFechaPasada('2023-03-14'); // esFechaValida será true
   * this.esFechaPasada('2023-03-16'); // esFechaValida será false
   */
  esFechaPasada(fechaStr: string): void {
    if (!fechaStr) {
      this.esFechaValida = false;
      return;
    }

    const [DAY, MONTH, YEAR] = fechaStr.split('/').map(Number);

    const FECHA_ENTRADA = new Date(YEAR, MONTH - 1, DAY);
    const HOY = new Date();
    if (isNaN(FECHA_ENTRADA.getTime())) {
      this.esFechaValida = false;
      return;
    }
    HOY.setHours(0, 0, 0, 0);
    FECHA_ENTRADA.setHours(0, 0, 0, 0);
    this.esFechaValida = FECHA_ENTRADA <= HOY;
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof PagoDerechosStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.pagoDerechosStore[metodoNombre] as (
        value: string | number | null
      ) => void
    )(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se encarga de liberar las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}

export function decimalValidator(maxDecimals: number = 2) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;
    
    const VALOR = control.value.toString();
    
    if (isNaN(parseFloat(VALOR))) {
      return { invalidNumber: true };
    }
    
    const decimalParts = VALOR.split('.');
    if (decimalParts.length > 1 && decimalParts[1].length > maxDecimals) {
      return { tooManyDecimals: { max: maxDecimals, actual: decimalParts[1].length } };
    }
    
    return null;
  };
}
