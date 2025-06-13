import { Catalogo, REGEX_LLAVE_DE_PAGO_DE_DERECHO, REGEX_PATRON_DECIMAL_2 } from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FECHA_DE_PAGO,
  PagoDerechosFormState,
} from '../../models/terceros-relacionados.model';
import { BANCO } from '../../constantes/datos-solicitud.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
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
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
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
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

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
  estadosDatos!: Catalogo[];

  /**
   * Arreglo que contiene los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bancoDatos!: Catalogo[];

  /**
   * Indica si el campo "banco" es obligatorio.
   * @type {boolean}
   */
  public bancoRequerido = true;

  public esFechaValida: boolean = true;

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
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.cargarDatos();
    this.getBancoDatos();
  }

  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Carga los datos iniciales desde el store, configura el formulario
   * con esos valores y suscribe a cambios para mantener el estado sincronizado.
   */
  ngOnInit(): void {
    this.pagoDerechosForm = this.fb.group({
      claveReferencia: [
        this.pagoDerechoFormState?.claveReferencia || '',
        [Validators.required, Validators.maxLength(9)],
      ],
      cadenaDependencia: [
        this.pagoDerechoFormState?.cadenaDependencia || '',
        [Validators.required, Validators.maxLength(14)],
      ],
      estado: [this.pagoDerechoFormState?.estado || '', Validators.required],
      banco: [this.pagoDerechoFormState?.banco || '', Validators.required],
      llavePago: [
        this.pagoDerechoFormState?.llavePago || '',
        [
          Validators.required,
           Validators.pattern(REGEX_LLAVE_DE_PAGO_DE_DERECHO),
          Validators.maxLength(30),
         
        ],
      ],
      fechaPago: [
        this.pagoDerechoFormState?.fechaPago || '',
        Validators.required,
      ],
      importePago: [
        this.pagoDerechoFormState?.importePago || '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATRON_DECIMAL_2),
          Validators.maxLength(16),
        ],
      ],
    });
    this.pagoDerechosForm.valueChanges.subscribe((valores) => {
      this.updatePagoDerechos.emit(valores);
    });
    this.mostrarBanco = BANCO.includes(this.idProcedimiento) ? true : false;
    this.patchForm();
    if (this.formularioDeshabilitado) {
      this.pagoDerechosForm.disable();
    }
  }

  /**
   * Initializes the reactive form `pagoDerechosForm` with controls and validators
   * for the payment of rights form. Each form control is set with initial values
   * from `pagoDerechoFormState` if available, or defaults to an empty string.
   * Validators are applied to enforce required fields, maximum lengths, and
   * specific patterns for certain fields.
   *
   * If the `formularioDeshabilitado` flag is set to true, the entire form is disabled
   * after creation to prevent user interaction.
   *
   * Form controls:
   * - `claveReferencia`: Required, max length 9.
   * - `cadenaDependencia`: Required, max length 14.
   * - `estado`: Required.
   * - `banco`: Required.
   * - `llavePago`: Required, must match `REGEX_LLAVE_DE_PAGO_DE_DERECHO`, max length 30.
   * - `fechaPago`: Required.
   * - `importePago`: Required, must match `REGEX_PATRON_DECIMAL_2`, max length 16.
   */
  patchForm(): void {
    this.pagoDerechosForm.patchValue({
      claveReferencia: this.pagoDerechoFormState?.claveReferencia || '',  
      cadenaDependencia: this.pagoDerechoFormState?.cadenaDependencia || '',
      estado: this.pagoDerechoFormState?.estado || '',
      banco: this.pagoDerechoFormState?.banco || '',
      llavePago: this.pagoDerechoFormState?.llavePago || '',
      fechaPago: this.pagoDerechoFormState?.fechaPago || '',
      importePago: this.pagoDerechoFormState?.importePago || '',
    });

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
          estado: this.pagoDerechoFormState?.estado || this.estadosDatos[0]?.clave,
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
          banco: this.pagoDerechoFormState?.banco || this.bancoDatos[0]?.clave,
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
   * Método que se ejecuta al destruir el componente.
   * Se encarga de liberar las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
