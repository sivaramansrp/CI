import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agregar-facturador',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './agregar-facturador.component.html',
  styleUrl: './agregar-facturador.component.css',
})
export class AgregarFacturadorComponent {
  agregarFacturadorForm: FormGroup;

  paisesDatos = [];

  constructor(private fb: FormBuilder) {
    this.agregarFacturadorForm = this.fb.group({
      tipoPersona: ['Fisica', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }
}
