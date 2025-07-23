
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

@Component({
    selector: 'app-unidad-dialog',
    templateUrl: './unidad-dialog.component.html',
    styleUrls: ['./unidad-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
})
export class UnidadDialogComponent implements OnInit {
    @Input() unidad: any;
    @Input() readonly = false;
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    unidadForm!: FormGroup;
    @Input() tipoDeUnidadCatalogo: any[] = [];
    @Input() paisEmisorCatalogo: any[] = [];
    @Input() anoCatalogo: any[] = [];
    @Input() tipoArrastre: any[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.unidadForm = this.fb.group({
            vinVehiculo: [this.unidad?.vinVehiculo || '', [Validators.required, Validators.maxLength(20)]],
            tipoDeUnidadArrastre: [this.unidad?.tipoDeUnidadArrastre || '', Validators.required],
            idDeVehiculo: [this.unidad?.idDeVehiculo || '', Validators.required],
            numeroPlaca: [this.unidad?.numeroPlaca || '', Validators.required],
            ano: [this.unidad?.ano || '', Validators.required],
            colorVehiculo: [this.unidad?.colorVehiculo || '', Validators.required],
            numeroEconomico: [this.unidad?.numeroEconomico || '', Validators.required],
            numero2daPlaca: [this.unidad?.numero2daPlaca || ''],
            estado2daPlaca: [this.unidad?.estado2daPlaca || ''],
            paisEmisor2daPlaca: [this.unidad?.paisEmisor2daPlaca || ''],
            descripcion: [this.unidad?.descripcion || '', Validators.maxLength(120)]
        });

        if (this.unidad) {
            this.unidadForm.patchValue(this.unidad);
        }
    }

    onSave() {
        if (this.unidadForm.valid) {
            this.save.emit(this.unidadForm.value);
        } else {
            this.unidadForm.markAllAsTouched();
        }
    }

    onCancel() {
        this.cancel.emit();
    }

    // Utility for ngClass validation
    isValid(form: FormGroup, controlName: string): boolean {
        const control = form.get(controlName);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    // Utility for (change) event to update store or perform side effects
    setValoresStore(form: FormGroup, controlName: string, action: string): void {
        // Implement your store update or side effect logic here if needed
        // For now, this is a placeholder to avoid template errors
    }

    // Save handler for Guardar button
    guardarUnidadData(): void {
        this.onSave();
    }

    // Limpiar handler for Limpiar button
    limpiarUnidadData(): void {
        this.unidadForm.reset();
    }
}
