import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css',
})
export class AgregarProveedorComponent {
  agregarProveedorForm: FormGroup;
  public paisesDatos: Catalogo[] = [];

  constructor(private fb: FormBuilder) {
    this.agregarProveedorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
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
