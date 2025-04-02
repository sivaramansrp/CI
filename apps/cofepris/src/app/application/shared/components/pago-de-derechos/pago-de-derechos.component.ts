import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FECHA_DE_PAGO,
  PagoDerechosFormState,
} from '../../models/terceros-relacionados.model';
import { Catalogo } from '@ng-mf/data-access-user';
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
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit {
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
  estadosDatos!: Catalogo[];

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
  ) {}

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
        Validators.required,
      ],
      cadenaDependencia: [
        this.pagoDerechoFormState?.cadenaDependencia || '',
        Validators.required,
      ],
      estado: [this.pagoDerechoFormState?.estado || '', Validators.required],
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
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
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
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
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
}
