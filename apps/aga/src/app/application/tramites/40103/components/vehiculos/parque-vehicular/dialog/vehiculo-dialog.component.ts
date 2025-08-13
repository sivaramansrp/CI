/**
 * Componente de diálogo para la gestión de vehículos en el trámite 40103.
 *
 * Permite crear, editar y validar la información de un vehículo, así como mostrar notificaciones y manejar catálogos relacionados.
 *
 * @module VehiculoDialogComponent
 */
import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosVehiculo } from '../../../../models/registro-muestras-mercancias.model';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';

// Use imported interfaces for type consistency
type CatalogoItem = Catalogo;
type VehiculoData = DatosVehiculo;
@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TooltipModule],
})
/**
 * Componente de diálogo para agregar o editar información de vehículos.
 *
 * @class
 * @implements {OnInit}
 * @implements {OnChanges}
 */
export class VehiculoDialogComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Vehículo a editar (si aplica).
   * @type {VehiculoData}
   * @memberof VehiculoDialogComponent
   */
  @Input() vehiculo: VehiculoData | null = null;

  /**
   * Lista de vehículos existentes.
   * @type {VehiculoData[]}
   */
  @Input() vehiculos: VehiculoData[] = [];

  /**
   * Indica si el formulario es de solo lectura.
   * @type {boolean}
   */
  @Input() readonly = false;

  /**
   * Catálogo de tipos de vehículo.
   * @type {CatalogoItem[]}
   */
  @Input() tipoDeVehiculoCatalogo: CatalogoItem[] = [];

  /**
   * Catálogo de países emisores.
   * @type {CatalogoItem[]}
   */
  @Input() paisEmisorCatalogo: CatalogoItem[] = [];

  /**
   * Catálogo de años.
   * @type {CatalogoItem[]}
   */
  @Input() anoCatalogo: CatalogoItem[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {CatalogoItem[]}
   */
  @Input() tipoArrastre: CatalogoItem[] = [];

  /**
   * Catálogo de colores de vehículos.
   * @type {CatalogoItem[]}
   */
  @Input() colorVehiculoCatalogo: CatalogoItem[] = [];

  /**
   * Evento emitido al guardar el vehículo.
   * @type {EventEmitter<VehiculoData>}
   */
  @Output() save = new EventEmitter<VehiculoData>();

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
   * Referencia a la plantilla del modal.
   * @type {TemplateRef<unknown>}
   */
  @ViewChild('vehiculoDialogModal') vehiculoDialogModal!: TemplateRef<unknown>;

  /**
   * Referencia al modal (si se usa un servicio de modal).
   * @type {unknown}
   */
  modalRef?: unknown; 

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
   * Detecta cambios en las propiedades de entrada y actualiza el formulario.
   * @param {SimpleChanges} changes - Cambios detectados en las propiedades.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Si la lista de vehículos cambia, recalcular el ID siguiente
    if (changes['vehiculos'] && this.vehiculoForm) {
      this.actualizarIdSiguiente();
    }
  }

  /**
   * Inicializa el componente, catálogos y formulario.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadCatalogData();
    this.initializeForm();
    this.setupFormValueSubscriptions();
  }

  /**
   * Carga los datos de catálogos si no están disponibles
   */
  private loadCatalogData(): void {
    if (!this.tipoDeVehiculoCatalogo || this.tipoDeVehiculoCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerTipoDeVehiculo()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: { datos: CatalogoItem[] }) => {
          this.tipoDeVehiculoCatalogo = datos.datos;
        });
    }
    if (!this.tipoArrastre || this.tipoArrastre.length === 0) {
      this.modificarTerrestreService.obtenerTipoArrastre()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: { datos: CatalogoItem[] }) => {
          this.tipoArrastre = datos.datos;
        });
    }
    if (!this.anoCatalogo || this.anoCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerAno()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: { datos: CatalogoItem[] }) => {
          this.anoCatalogo = datos.datos;
        });
    }
    if (!this.paisEmisorCatalogo || this.paisEmisorCatalogo.length === 0) {
      this.modificarTerrestreService.obtenerPaisEmisor()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: { datos: CatalogoItem[] }) => {
          this.paisEmisorCatalogo = datos.datos;
        });
    }
  }

  /**
   * Inicializa el formulario con datos del vehículo
   */
  private initializeForm(): void {
    let siguienteId = 1;
    if (Array.isArray(this.vehiculos) && this.vehiculos.length > 0) {
      const ID_MAXIMO = Math.max(...this.vehiculos.map(v => Number(v['idDeVehiculo' as keyof VehiculoData]) || 0));
      siguienteId = ID_MAXIMO + 1;
    }
    const ES_EDICION = Boolean(this.vehiculo && this.vehiculo['idDeVehiculo' as keyof VehiculoData]);
    this.vehiculoForm = this.fb.group({
      numero: [this.vehiculo?.['numero' as keyof VehiculoData] || '', [Validators.required, Validators.maxLength(20)]],
      tipoDeVehiculo: [this.vehiculo?.['tipoDeVehiculo' as keyof VehiculoData] || '', Validators.required],
      idDeVehiculo: [{ value: ES_EDICION ? this.vehiculo?.['idDeVehiculo' as keyof VehiculoData] : siguienteId, disabled: true }, Validators.required],
      numeroPlaca: [this.vehiculo?.['numeroPlaca' as keyof VehiculoData] || '', Validators.required],
      paisEmisor: [this.vehiculo?.['paisEmisor' as keyof VehiculoData] || '', Validators.required],
      estado: [this.vehiculo?.['estado' as keyof VehiculoData] || '', Validators.required],
      marca: [this.vehiculo?.['marca' as keyof VehiculoData] || '', Validators.required],
      modelo: [this.vehiculo?.['modelo' as keyof VehiculoData] || '', Validators.required],
      ano: [this.vehiculo?.['ano' as keyof VehiculoData] || '', Validators.required],
      transponder: [this.vehiculo?.['transponder' as keyof VehiculoData] || '', Validators.required],
      colorVehiculo: [this.vehiculo?.['colorVehiculo' as keyof VehiculoData] || '', Validators.required],
      numeroEconomico: [this.vehiculo?.['numeroEconomico' as keyof VehiculoData] || '', Validators.required],
      numero2daPlaca: [this.vehiculo?.['numero2daPlaca' as keyof VehiculoData] || ''],
      estado2daPlaca: [this.vehiculo?.['estado2daPlaca' as keyof VehiculoData] || ''],
      paisEmisor2daPlaca: [this.vehiculo?.['paisEmisor2daPlaca' as keyof VehiculoData] || ''],
      descripcion: [this.vehiculo?.['descripcion' as keyof VehiculoData] || '', Validators.maxLength(120)]
    });
  }

  /**
   * Actualiza el ID siguiente en el formulario cuando cambia la lista de vehículos.
   * @returns {void}
   */
  private actualizarIdSiguiente(): void {
    if (!this.vehiculoForm) {
      return;
    }
    
    // Solo actualizar si no es un modo de edición
    const ES_EDICION = Boolean(this.vehiculo && this.vehiculo['idDeVehiculo' as keyof VehiculoData]);
    if (ES_EDICION) {
      return;
    }
    
    let siguienteId = 1;
    if (Array.isArray(this.vehiculos) && this.vehiculos.length > 0) {
      const ID_MAXIMO = Math.max(...this.vehiculos.map(v => Number(v['idDeVehiculo' as keyof VehiculoData]) || 0));
      siguienteId = ID_MAXIMO + 1;
    }
    
    // Actualizar el valor del campo idDeVehiculo en el formulario
    const CONTROL_ID = this.vehiculoForm.get('idDeVehiculo');
    if (CONTROL_ID) {
      CONTROL_ID.setValue(siguienteId);
    }
  }

  /**
   * Configura las suscripciones de cambio de valor del formulario con temporización mejorada y manejo de errores
   */
  private setupFormValueSubscriptions(): void {
    this.vehiculoForm.get('descripcion')?.disable();
    
    this.vehiculoForm.get('tipoDeVehiculo')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const IDENTIFICADOR = Number(selectedValue);
        const DESCRIPCION_CONTROL = this.vehiculoForm.get('descripcion');
        
        if (IDENTIFICADOR === 1) { // OTROS
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
          DESCRIPCION_CONTROL?.setValue('');
        }
      });
    
    setTimeout(() => {
      const VALOR_ACTUAL = this.vehiculoForm.get('tipoDeVehiculo')?.value;
      if (VALOR_ACTUAL) {
        const IDENTIFICADOR = Number(VALOR_ACTUAL);
        const DESCRIPCION_CONTROL = this.vehiculoForm.get('descripcion');
        
        if (IDENTIFICADOR === 1) {
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
        }
      }
    }, 100);
  }

  /**
   * Abre el modal de diálogo (si se implementa con un servicio de modal).
   * @returns {void}
   */
  static abiertoModal(): void {
    // Este método debería abrir el diálogo modal.
  }

  /**
   * Cierra el modal de diálogo y emite el evento de cancelación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.cancel.emit();
    this.vehiculoForm.reset();
  }

  /**
   * Limpia los datos del formulario de vehículo, manteniendo el id.
   * @returns {void}
   */
  limpiarVehiculoData(): void {
    if (!this.vehiculoForm) {
      return;
    }
    const VALOR_ID = this.vehiculoForm.get('idDeVehiculo')?.value;
    this.vehiculoForm.reset();
    this.vehiculoForm.get('idDeVehiculo')?.setValue(VALOR_ID);
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
      const DATOS_VEHICULO = {
        ...this.vehiculoForm.getRawValue()
      };
      this.save.emit(DATOS_VEHICULO);
      // Cerrar modal después de guardar exitosament
      this.cancel.emit();
    } else {
      // El formulario es inválido, los errores de validación se mostrarán en la plantilla
    }
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido tocado.
   * @param {string} controlName - Nombre del control a verificar.
   * @returns {boolean | null} True si es inválido y tocado, null si no existe.
   */
  isInvalid(controlName: string): boolean | null {
    const CONTROL_FORMULARIO = this.vehiculoForm.get(controlName);
    return CONTROL_FORMULARIO ? CONTROL_FORMULARIO.invalid && CONTROL_FORMULARIO.touched : null;
  }

  /**
   * Obtiene los controles del formulario de vehículo.
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.vehiculoForm.controls;
  }

  /**
   * Gancho del ciclo de vida que se llama cuando se destruye el componente.
   * Se utiliza para limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
