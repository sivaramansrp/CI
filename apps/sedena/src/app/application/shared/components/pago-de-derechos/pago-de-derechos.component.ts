import { CAMPO_OBLIGATORIO_DERECHOS } from '../../constants/datos-solicitud.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { EventEmitter } from '@angular/core';
import { FECHA_DE_PAGO } from '../../models/pago-de-derechos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { PagoDerechosFormState } from '../../models/pago-de-derechos.model';
import { REGEX_IMPORTE_PAGO } from '@ng-mf/data-access-user';
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
  styleUrl: './pago-de-derechos.component.scss',
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
   * @property {EventEmitter<PagoDerechosFormState>} updatePagoDerechos
   * @description Output property that emits the updated state of the payment form whenever changes occur.
   * This allows the parent component to stay synchronized with the form's state.
   */

  @Output() public updatePagoDerechos: EventEmitter<PagoDerechosFormState> =
    new EventEmitter<PagoDerechosFormState>();

    /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject utilizado para gestionar las desuscripciones automáticas y evitar fugas de memoria.
   * Se completa manualmente cuando el componente se destruye.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

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
  bancoDatos!: Catalogo[];

  /**
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;

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
    private datosSolicitudService: DatosSolicitudService // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Carga los datos iniciales desde el store, configura el formulario
   * con esos valores y suscribe a cambios para mantener el estado sincronizado.
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.cargarDatos();
    this.campoObligatorio = CAMPO_OBLIGATORIO_DERECHOS.includes(this.idProcedimiento)
  }

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.pagoDerechosForm = this.fb.group({
      claveReferencia: [
        this.pagoDerechoFormState?.claveReferencia || '',
        Validators.required,
      ],
      cadenaDependencia: [
        this.pagoDerechoFormState?.cadenaDependencia || '',
        Validators.required,
      ],
      llavePago: [
        this.pagoDerechoFormState?.llavePago || '',
        Validators.required,
      ],
      fechaPago: [
        this.pagoDerechoFormState?.fechaPago || '',
        Validators.required,
      ],
      importePago: [
        this.pagoDerechoFormState?.importePago || '',
        [Validators.required, Validators.pattern(REGEX_IMPORTE_PAGO)],
      ],
      banco: [this.pagoDerechoFormState?.banco || '', Validators.required],
    });

    this.pagoDerechosForm.valueChanges.subscribe((valores) => {
      this.updatePagoDerechos.emit(valores);
    });

    this.cargarDatos();
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de estados desde el servicio `DatosSolicitudService`
   * y la asigna a la propiedad `estadosDatos`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerBancos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.bancoDatos = data;
      });
  }

  /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  onReset(): void {
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
   * Hook del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   *
   * @method ngOnDestroy
   * @returns {void}
   */

  
  onImportePagoInput(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    INPUT.value = INPUT.value.replace(/[^0-9]/g, '').slice(0, 22);
    this.pagoDerechosForm.get('importePago')?.setValue(INPUT.value, { emitEvent: false });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
