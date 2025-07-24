
import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
export class UnidadDialogComponent implements OnInit {
  @Input() unidad: any;
  @Input() unidades: any[] = [];
  @Input() readonly = false;
  @Input() tipoDeUnidadCatalogo: any[] = [];
  @Input() paisEmisorCatalogo: any[] = [];
  @Input() anoCatalogo: any[] = [];
  @Input() tipoArrastre: any[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  unidadForm!: FormGroup;
  showNotification: boolean = false;
  alertaNotificacion!: Notificacion;

  @ViewChild('unidadDialogModal') unidadDialogModal!: TemplateRef<unknown>;
  modalRef?: any; // Replace with BsModalRef if using ngx-bootstrap

  public destroyNotifier$: Subject<void> = new Subject();
  constructor(private fb: FormBuilder, private modificarTerrestreService: modificarTerrestreService) {}

  ngOnInit() {
    // Fetch catalogs if not provided
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
    const isEdit = !!(this.unidad && this.unidad.idDeUnidad);
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

  openModal(): void {
    // Implement modal open logic if using a modal service
    // this.modalRef = this.modalService.show(this.unidadDialogModal, { class: 'modal-xl' });
  }

  closeModal(): void {
    // Implement modal close logic if using a modal service
    // this.modalRef?.hide();
    this.cancel.emit();
  }

  limpiarUnidadData(): void {
    if (!this.unidadForm) return;
    const idValue = this.unidadForm.get('idDeUnidad')?.value;
    this.unidadForm.reset();
    this.unidadForm.get('idDeUnidad')?.setValue(idValue);
    this.unidadForm.get('idDeUnidad')?.disable();
    this.unidadForm.get('descripcion')?.disable();
  }

  guardarUnidadData(): void {
    this.unidadForm.markAllAsTouched();
    this.unidadForm.updateValueAndValidity();
    if (this.unidadForm.valid) {
      const unidadData = {
        ...this.unidadForm.getRawValue()
      };
      this.save.emit(unidadData);
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
    const control = this.unidadForm.get(controlName);
    return control ? control.invalid && control.touched : null;
  }

  get getFormValues(): { [key: string]: AbstractControl } {
    return this.unidadForm.controls;
  }
}
