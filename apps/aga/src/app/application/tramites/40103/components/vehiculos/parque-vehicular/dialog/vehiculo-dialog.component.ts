/**
 * Componente de diálogo para la gestión de vehículos en el trámite 40103.
 *
 * Permite crear, editar y validar la información de un vehículo, así como mostrar notificaciones y manejar catálogos relacionados.
 *
 * @module VehiculoDialogComponent
 */
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, CategoriaMensaje, Notificacion, NotificacionesComponent, TipoNotificacionEnum } from '@libs/shared/data-access-user/src';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, NotificacionesComponent],
})
/**
 * Componente de diálogo para agregar o editar información de vehículos.
 *
 * @class
 * @implements {OnInit}
 */
export class VehiculoDialogComponent implements OnInit {
  /**
   * Vehículo a editar (si aplica).
   * @type {*}
   * @memberof VehiculoDialogComponent
   */
  @Input() vehiculo: any;

  /**
   * Lista de vehículos existentes.
   * @type {any[]}
   */
  @Input() vehiculos: any[] = [];

  /**
   * Indica si el formulario es de solo lectura.
   * @type {boolean}
   */
  @Input() readonly = false;

  /**
   * Catálogo de tipos de vehículo.
   * @type {any[]}
   */
  @Input() tipoDeVehiculoCatalogo: any[] = [];

  /**
   * Catálogo de países emisores.
   * @type {any[]}
   */
  @Input() paisEmisorCatalogo: any[] = [];

  /**
   * Catálogo de años.
   * @type {any[]}
   */
  @Input() anoCatalogo: any[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {any[]}
   */
  @Input() tipoArrastre: any[] = [];

  /**
   * Evento emitido al guardar el vehículo.
   * @type {EventEmitter<any>}
   */
  @Output() save = new EventEmitter<any>();

  /**
   * Evento emitido al cancelar la operación.
   * @type {EventEmitter<void>}
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Formulario reactivo para el vehículo.
   * @type {FormGroup}
   */
  vehiculoForm!: FormGroup;

  /**
   * Indica si se debe mostrar la notificación.
   * @type {boolean}
   */
  showNotification: boolean = false;

  /**
   * Objeto de notificación para alertas.
   * @type {Notificacion}
   */
  alertaNotificacion!: Notificacion;

  /**
   * Referencia a la plantilla del modal.
   * @type {TemplateRef<unknown>}
   */
  @ViewChild('vehiculoDialogModal') vehiculoDialogModal!: TemplateRef<unknown>;

  /**
   * Referencia al modal (si se usa un servicio de modal).
   * @type {*}
   */
  modalRef?: any; 

  /**
   * Notificador para destruir suscripciones.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb
   * @param {modificarTerrestreService} modificarTerrestreService
   */
  constructor(private fb: FormBuilder, private modificarTerrestreService: modificarTerrestreService) {}

  /**
   * Inicializa el componente, catálogos y formulario.
   * @returns {void}
   */
  ngOnInit() {
    if (!this.tipoDeVehiculoCatalogo || this.tipoDeVehiculoCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerTipoDeVehiculo()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: any) => {
          this.tipoDeVehiculoCatalogo = datos.datos;
        });
    }
    if (!this.tipoArrastre || this.tipoArrastre.length === 0) {
      this.modificarTerrestreService.obtenerTipoArrastre()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: any) => {
          this.tipoArrastre = datos.datos;
        });
    }
    if (!this.anoCatalogo || this.anoCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerAno()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: any) => {
          this.anoCatalogo = datos.datos;
        });
    }
    if (!this.paisEmisorCatalogo || this.paisEmisorCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerPaisEmisor()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: any) => {
          this.paisEmisorCatalogo = datos.datos;
        });
    }

    let nextId = 1;
    if (Array.isArray(this.vehiculos) && this.vehiculos.length > 0) {
      const maxId = Math.max(...this.vehiculos.map(v => Number(v.idDeVehiculo) || 0));
      nextId = maxId + 1;
    }
    const isEdit = Boolean(this.vehiculo && this.vehiculo.idDeVehiculo);
    this.vehiculoForm = this.fb.group({
      numero: [this.vehiculo?.numero || '', [Validators.required, Validators.maxLength(20)]],
      tipoDeVehiculo: [this.vehiculo?.tipoDeVehiculo || '', Validators.required],
      idDeVehiculo: [{ value: isEdit ? this.vehiculo.idDeVehiculo : nextId, disabled: true }, Validators.required],
      numeroPlaca: [this.vehiculo?.numeroPlaca || '', Validators.required],
      paisEmisor: [this.vehiculo?.paisEmisor || '', Validators.required],
      estado: [this.vehiculo?.estado || '', Validators.required],
      marca: [this.vehiculo?.marca || '', Validators.required],
      modelo: [this.vehiculo?.modelo || '', Validators.required],
      ano: [this.vehiculo?.ano || '', Validators.required],
      transponder: [this.vehiculo?.transponder || '', Validators.required],
      colorVehiculo: [this.vehiculo?.colorVehiculo || '', Validators.required],
      numeroEconomico: [this.vehiculo?.numeroEconomico || '', Validators.required],
      numero2daPlaca: [this.vehiculo?.numero2daPlaca || ''],
      estado2daPlaca: [this.vehiculo?.estado2daPlaca || ''],
      paisEmisor2daPlaca: [this.vehiculo?.paisEmisor2daPlaca || ''],
      descripcion: [this.vehiculo?.descripcion || '', Validators.maxLength(120)]
    });
    this.vehiculoForm.get('descripcion')?.disable();
    this.vehiculoForm.get('tipoDeVehiculo')?.valueChanges.subscribe((selectedValue) => {
      const id = Number(selectedValue);
      if (id === 1) {
        this.vehiculoForm.get('descripcion')?.enable();
      } else {
        this.vehiculoForm.get('descripcion')?.disable();
      }
    });
  }

  /**
   * Abre el modal de diálogo (si se implementa con un servicio de modal).
   * @returns {void}
   */
  openModal(): void {
    // Este método debería abrir el diálogo modal.
}

  /**
   * Cierra el modal de diálogo y emite el evento de cancelación.
   * @returns {void}
   */
  closeModal(): void {
    this.cancel.emit();
  }

  /**
   * Limpia los datos del formulario de vehículo, manteniendo el id.
   * @returns {void}
   */
  limpiarVehiculoData(): void {
    if (!this.vehiculoForm) {return;}
    const idValue = this.vehiculoForm.get('idDeVehiculo')?.value;
    this.vehiculoForm.reset();
    this.vehiculoForm.get('idDeVehiculo')?.setValue(idValue);
    this.vehiculoForm.get('idDeVehiculo')?.disable();
    this.vehiculoForm.get('descripcion')?.disable();
  }

  /**
   * Guarda los datos del vehículo si el formulario es válido, emite el evento y cierra el modal.
   * Si el formulario es inválido, muestra una notificación de alerta.
   * @returns {void}
   */
  guardarVehiculoData(): void {
    this.vehiculoForm.markAllAsTouched();
    this.vehiculoForm.updateValueAndValidity();
    if (this.vehiculoForm.valid) {
      const vehiculoData = {
        ...this.vehiculoForm.getRawValue()
      };
      this.save.emit(vehiculoData);
      this.closeModal();
    } else {
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Alert',
        mensaje: 'Formulario inválido, por favor verifica los campos.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.showNotification = true;
    }
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido tocado.
   * @param {string} controlName - Nombre del control a verificar.
   * @returns {boolean | null} True si es inválido y tocado, null si no existe.
   */
  isInvalid(controlName: string): boolean | null {
    const control = this.vehiculoForm.get(controlName);
    return control ? control.invalid && control.touched : null;
  }

  /**
   * Obtiene los controles del formulario de vehículo.
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.vehiculoForm.controls;
  }
}
