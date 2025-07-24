import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, NotificacionesComponent, Notificacion, TipoNotificacionEnum, CategoriaMensaje } from '@libs/shared/data-access-user/src';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, NotificacionesComponent],
})
export class VehiculoDialogComponent implements OnInit {
  @Input() vehiculo: any;
  @Input() vehiculos: any[] = [];
  @Input() readonly = false;
  @Input() tipoDeVehiculoCatalogo: any[] = [];
  @Input() paisEmisorCatalogo: any[] = [];
  @Input() anoCatalogo: any[] = [];
  @Input() tipoArrastre: any[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  vehiculoForm!: FormGroup;
  showNotification: boolean = false;
  alertaNotificacion!: Notificacion;

  @ViewChild('vehiculoDialogModal') vehiculoDialogModal!: TemplateRef<unknown>;
  modalRef?: any; // Replace with BsModalRef if using ngx-bootstrap

  public destroyNotifier$: Subject<void> = new Subject();
  constructor(private fb: FormBuilder, private modificarTerrestreService: modificarTerrestreService) {}

  ngOnInit() {
    // Fetch catalogs if not provided
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

    // Calculate nextId logic (if not editing)
    let nextId = 1;
    if (Array.isArray(this.vehiculos) && this.vehiculos.length > 0) {
      const maxId = Math.max(...this.vehiculos.map(v => Number(v.idDeVehiculo) || 0));
      nextId = maxId + 1;
    }
    const isEdit = !!(this.vehiculo && this.vehiculo.idDeVehiculo);
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

  openModal(): void {
    // Implement modal open logic if using a modal service
    // this.modalRef = this.modalService.show(this.vehiculoDialogModal, { class: 'modal-xl' });
  }

  closeModal(): void {
    // Implement modal close logic if using a modal service
    // this.modalRef?.hide();
    this.cancel.emit();
  }

  limpiarVehiculoData(): void {
    if (!this.vehiculoForm) return;
    const idValue = this.vehiculoForm.get('idDeVehiculo')?.value;
    this.vehiculoForm.reset();
    this.vehiculoForm.get('idDeVehiculo')?.setValue(idValue);
    this.vehiculoForm.get('idDeVehiculo')?.disable();
    this.vehiculoForm.get('descripcion')?.disable();
  }

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

  isInvalid(controlName: string): boolean | null {
    const control = this.vehiculoForm.get(controlName);
    return control ? control.invalid && control.touched : null;
  }

  get getFormValues(): { [key: string]: AbstractControl } {
    return this.vehiculoForm.controls;
  }
}
