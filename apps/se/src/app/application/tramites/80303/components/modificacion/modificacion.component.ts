import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent {
  modificacionForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormaulario();
  }

  crearFormaulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [{ value: 'AAL0409235E6', disabled: true }],
      representacionFederal: [{ value: 'CULIACAN', disabled: true }],
      tipoModificacion: [{ value: 'Baja', disabled: true }],
      modificacionPrograma: [
        { value: 'Empresa submanufacturera', disabled: true },
      ],
    });
  }
}
