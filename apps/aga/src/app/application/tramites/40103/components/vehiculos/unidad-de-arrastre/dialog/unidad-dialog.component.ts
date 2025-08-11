/**
 * Componente utilizado para la gestión del formulario de unidad de arrastre en el trámite correspondiente.
 *
 * Este archivo contiene la lógica para inicializar, limpiar, validar y guardar los datos de la unidad de arrastre,
 * así como la gestión de catálogos y notificaciones asociadas al formulario.
 *
 * El componente permite la edición y creación de unidades, controlando el estado de los campos y la interacción con el usuario.
 *
 * @component
 * @class
 * @implements {OnInit}
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, NotificacionesComponent, Notificacion, TipoNotificacionEnum, CategoriaMensaje } from '@libs/shared/data-access-user/src';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-unidad-dialog',
  templateUrl: './unidad-dialog.component.html',
  styleUrls: ['./unidad-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, NotificacionesComponent],
})
export class UnidadDialogComponent implements OnInit, OnDestroy {
  /**
   * Datos de la unidad a editar o visualizar.
   * @type {any}
   * @public
   */
  @Input() unidad: any;
  /**
   * Listado de unidades existentes para calcular el siguiente identificador.
   * @type {any[]}
   * @public
   */
  @Input() unidades: any[] = [];
  /**
   * Indica si el formulario es de solo lectura.
   * @type {boolean}
   * @public
   */
  @Input() readonly = false;
  /**
   * Catálogo de tipos de unidad disponibles.
   * @type {any[]}
   * @public
   */
  @Input() tipoDeUnidadCatalogo: any[] = [];
  /**
   * Catálogo de países emisores disponibles.
   * @type {any[]}
   * @public
   */
  @Input() paisEmisorCatalogo: any[] = [];
  /**
   * Catálogo de años disponibles.
   * @type {any[]}
   * @public
   */
  @Input() anoCatalogo: any[] = [];
  /**
   * Catálogo de tipos de arrastre disponibles.
   * @type {any[]}
   * @public
   */
  @Input() tipoArrastre: any[] = [];
  /**
   * Evento emitido al guardar los datos de la unidad.
   * @event
   */
  @Output() guardar = new EventEmitter<any>();
  /**
   * Evento emitido al cancelar la operación o cerrar el modal.
   * @event
   */
  @Output() cancelar = new EventEmitter<void>();

  /**
   * Formulario reactivo que contiene los controles de la unidad.
   * @type {FormGroup}
   * @public
   */
  unidadForm!: FormGroup;
  /**
   * Indica si se debe mostrar la notificación.
   * @type {boolean}
   * @public
   */
  showNotification: boolean = false;
  /**
   * Objeto de notificación para mostrar mensajes al usuario.
   * @type {Notificacion}
   * @public
   */
  alertaNotificacion!: Notificacion;

  /**
   * Referencia al template del modal de la unidad.
   * @type {TemplateRef<unknown>}
   * @public
   */
  @ViewChild('unidadDialogModal') unidadDialogModal!: TemplateRef<unknown>;
  /**
   * Referencia al modal abierto (si se utiliza una librería de modales).
   * @type {any}
   * @public
   */
  modalRef?: any; // Reemplazar con BsModalRef si se usa ngx-bootstrap

  /**
   * Subject utilizado para destruir las suscripciones al destruir el componente.
   * @type {Subject<void>}
   * @public
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * Constructor del componente. Inicializa el FormBuilder y el servicio de modificación terrestre.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {modificarTerrestreService} modificarTerrestreService - Servicio para obtener catálogos.
   */
  constructor(private fb: FormBuilder, private modificarTerrestreService: modificarTerrestreService) { }

  /**
   * Inicializa el formulario y carga los catálogos necesarios.
   * Si se está editando una unidad, carga sus datos en el formulario.
   */
  ngOnInit() {
    // Restablecer estado de notificación
    this.showNotification = false;

    if (!this.tipoDeUnidadCatalogo || this.tipoDeUnidadCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerTipoArrastre()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: any) => {
          this.tipoDeUnidadCatalogo = datos.datos;
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

    // Calcular lógica de próximo ID (si no se está editando)
    let nextId = 1;
    if (Array.isArray(this.unidades) && this.unidades.length > 0) {
      const maxId = Math.max(...this.unidades.map(u => Number(u.idDeUnidad) || 0));
      nextId = maxId + 1;
    }
    const isEdit = !!(this.unidad && this.unidad.idDeUnidad);
    this.unidadForm = this.fb.group({
      numero: [this.unidad?.numero || '', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      tipoDeUnidad: [this.unidad?.tipoDeUnidad || '', Validators.required],
      idDeUnidad: [{ value: isEdit ? this.unidad.idDeUnidad : nextId, disabled: true }, Validators.required],
      numeroPlaca: [this.unidad?.numeroPlaca || '', [Validators.required, Validators.maxLength(10)]],
      paisEmisor: [this.unidad?.paisEmisor || '', Validators.required],
      estado: [this.unidad?.estado || '', Validators.required],
      marca: [this.unidad?.marca || '', [Validators.required, Validators.maxLength(50)]],
      modelo: [this.unidad?.modelo || '', [Validators.required, Validators.maxLength(50)]],
      ano: [this.unidad?.ano || '', Validators.required],
      transponder: [this.unidad?.transponder || '', [Validators.required, Validators.maxLength(50)]],
      colorUnidad: [this.unidad?.colorUnidad || '', Validators.required],
      numeroEconomico: [this.unidad?.numeroEconomico || '', [Validators.required, Validators.maxLength(50)]],
      numero2daPlaca: [this.unidad?.numero2daPlaca || '', Validators.maxLength(20)],
      estado2daPlaca: [this.unidad?.estado2daPlaca || '', Validators.maxLength(50)],
      paisEmisor2daPlaca: [this.unidad?.paisEmisor2daPlaca || ''],
      descripcion: [this.unidad?.descripcion || '', Validators.maxLength(200)]
    });
    
    // Configurar suscripciones de valores del formulario
    this.setupFormValueSubscriptions();
  }

  /**
   * Configura las suscripciones de cambio de valor del formulario con temporización mejorada y manejo de errores
   */
  private setupFormValueSubscriptions(): void {
    // Inicialmente deshabilitar campo descripción
    this.unidadForm.get('descripcion')?.disable();
    
    // Configurar suscripción con takeUntil para limpieza adecuada
    this.unidadForm.get('tipoDeUnidad')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const id = Number(selectedValue);
        const descripcionControl = this.unidadForm.get('descripcion');
        
        if (id === 1) { 
          descripcionControl?.enable();
        } else {
          descripcionControl?.disable();
          descripcionControl?.setValue(''); // Limpiar valor cuando esté deshabilitado
        }
      });
    
    // También verificar valor inicial en caso de que el formulario esté pre-poblado
    setTimeout(() => {
      const currentValue = this.unidadForm.get('tipoDeUnidad')?.value;
      if (currentValue) {
        const id = Number(currentValue);
        const descripcionControl = this.unidadForm.get('descripcion');
        
        if (id === 1) {
          descripcionControl?.enable();
        } else {
          descripcionControl?.disable();
        }
      }
    }, 100);
  }

  /**
   * Abre el modal de la unidad.
   * (Implementar lógica de apertura si es necesario)
   */
  abiertoModal(): void {
    // Este método debería abrir el diálogo modal.
  }

  /**
   * Cierra el modal y emite el evento de cancelación.
   */
  cerrarModal(): void {
    this.showNotification = false;
    this.cancelar.emit();
  }

  /**
   * Limpia los datos del formulario de unidad, manteniendo el idDeUnidad y deshabilitando los campos necesarios.
   */
  limpiarDatosUnidad(): void {
    if (!this.unidadForm) return;
    
    // Limpiar notificaciones
    this.showNotification = false;
    
    const idValue = this.unidadForm.get('idDeUnidad')?.value;
    this.unidadForm.reset();
    this.unidadForm.get('idDeUnidad')?.setValue(idValue);
    this.unidadForm.get('idDeUnidad')?.disable();
    this.unidadForm.get('descripcion')?.disable();
  }

  /**
   * Guarda los datos del formulario de unidad si es válido.
   * Si el formulario es inválido, muestra una notificación de alerta.
   */
  guardarDatosUnidad(): void {
    this.unidadForm.markAllAsTouched();
    this.unidadForm.updateValueAndValidity();
  

    // Verificación detallada de validación de campos
    Object.keys(this.unidadForm.controls).forEach(key => {
      const control = this.unidadForm.get(key);
      if (control && control.invalid) {
          // Log para depuración
      }
    });
    if (this.unidadForm.valid) {
      this.showNotification = false; // Limpiar notificaciones previas
      const raw = this.unidadForm.getRawValue();
      const datosUnidad = {
        ...raw,
        tipoDeUnidadArrastre: raw.tipoDeUnidad,
        vinVehiculo: raw.numero
      };
      this.guardar.emit(datosUnidad);
      // Cerrar modal después de guardar exitosamente
      this.cancelar.emit();
    } else {
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Alerta',
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
   * @param controlName Nombre del control a verificar
   * @returns true si el control es inválido y tocado, de lo contrario null
   */
  isInvalid(controlName: string): boolean | null {
    const control = this.unidadForm.get(controlName);
    return control ? control.invalid && control.touched : null;
  }

  /**
   * Devuelve los controles actuales del formulario de unidad.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.unidadForm.controls;
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Used to clean up subscriptions and prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
