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

import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, CategoriaMensaje, Notificacion, NotificacionesComponent, TipoNotificacionEnum } from '@libs/shared/data-access-user/src';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unidad-dialog',
  templateUrl: './unidad-dialog.component.html',
  styleUrls: ['./unidad-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, NotificacionesComponent],
})
export class UnidadDialogComponent implements OnInit {
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
  @Output() save = new EventEmitter<any>();
  /**
   * Evento emitido al cancelar la operación o cerrar el modal.
   * @event
   */
  @Output() cancel = new EventEmitter<void>();

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
  modalRef?: any; // Replace with BsModalRef if using ngx-bootstrap

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

    // Calculate nextId logic (if not editing)
    let nextId = 1;
    if (Array.isArray(this.unidades) && this.unidades.length > 0) {
      const maxId = Math.max(...this.unidades.map(u => Number(u.idDeUnidad) || 0));
      nextId = maxId + 1;
    }
    const isEdit = Boolean(this.unidad && this.unidad.idDeUnidad);
    this.unidadForm = this.fb.group({
      numero: [this.unidad?.numero || '', [Validators.required, Validators.maxLength(20)]],
      tipoDeUnidad: [this.unidad?.tipoDeUnidad || '', Validators.required],
      idDeUnidad: [{ value: isEdit ? this.unidad.idDeUnidad : nextId, disabled: true }, Validators.required],
      numeroPlaca: [this.unidad?.numeroPlaca || '', Validators.required],
      paisEmisor: [this.unidad?.paisEmisor || '', Validators.required],
      estado: [this.unidad?.estado || '', Validators.required],
      marca: [this.unidad?.marca || '', Validators.required],
      modelo: [this.unidad?.modelo || '', Validators.required],
      ano: [this.unidad?.ano || '', Validators.required],
      transponder: [this.unidad?.transponder || '', Validators.required],
      colorUnidad: [this.unidad?.colorUnidad || '', Validators.required],
      numeroEconomico: [this.unidad?.numeroEconomico || '', Validators.required],
      numero2daPlaca: [this.unidad?.numero2daPlaca || ''],
      estado2daPlaca: [this.unidad?.estado2daPlaca || ''],
      paisEmisor2daPlaca: [this.unidad?.paisEmisor2daPlaca || ''],
      descripcion: [this.unidad?.descripcion || '', Validators.maxLength(120)]
    });
    this.unidadForm.get('descripcion')?.disable();
    this.unidadForm.get('tipoDeUnidad')?.valueChanges.subscribe((selectedValue) => {
      const id = Number(selectedValue);
      if (id === 1) {
        this.unidadForm.get('descripcion')?.enable();
      } else {
        this.unidadForm.get('descripcion')?.disable();
      }
    });
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
    this.cancel.emit();
  }

  /**
   * Limpia los datos del formulario de unidad, manteniendo el idDeUnidad y deshabilitando los campos necesarios.
   */
  limpiarUnidadData(): void {
    if (!this.unidadForm) {return;}
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
  guardarUnidadData(): void {
    this.unidadForm.markAllAsTouched();
    this.unidadForm.updateValueAndValidity();
    if (this.unidadForm.valid) {
      const raw = this.unidadForm.getRawValue();
      const unidadData = {
        ...raw,
        tipoDeUnidadArrastre: raw.tipoDeUnidad,
        vinVehiculo: raw.numero
      };
      this.save.emit(unidadData);
      this.cerrarModal();
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
}
