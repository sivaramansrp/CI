import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
})
export class VehiculoDialogComponent implements OnInit {
  // Add missing methods for template
  limpiarVehiculoData() {
    this.vehiculoForm.reset();
    if (this.vehiculo) {
      this.vehiculoForm.patchValue(this.vehiculo);
    }
  }

  guardarVehiculoData() {
    if (this.vehiculoForm.valid) {
      this.save.emit(this.vehiculoForm.value);
    } else {
      this.vehiculoForm.markAllAsTouched();
    }
  }
  @Input() vehiculo: any;
  @Input() readonly = false;
  @Input() tipoDeVehiculoCatalogo: any[] = [];
  @Input() paisEmisorCatalogo: any[] = [];
  @Input() anoCatalogo: any[] = [];
  @Input() tipoArrastre: any[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  vehiculoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.vehiculoForm = this.fb.group({
      numero: [this.vehiculo?.numero || '', [Validators.required, Validators.maxLength(20)]],
      tipoDeVehiculo: [this.vehiculo?.tipoDeVehiculo || '', Validators.required],
      idDeVehiculo: [this.vehiculo?.idDeVehiculo || '', Validators.required],
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

    // Patch form if vehiculo input changes
    if (this.vehiculo) {
      this.vehiculoForm.patchValue(this.vehiculo);
    }

    // TODO: Load catalogs from service or @Input() as needed
    // this.tipoDeVehiculoCatalogo = ...
    // this.paisEmisorCatalogo = ...
    // this.anoCatalogo = ...
    // this.tipoArrastre = ...
  }

  onSave() {
    if (this.vehiculoForm.valid) {
      this.save.emit(this.vehiculoForm.value);
    } else {
      this.vehiculoForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
