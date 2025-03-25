/* eslint-disable no-console */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent {
  agregarFabricanteForm: FormGroup;
  public codigosPostalesDatos: Catalogo[] = [];
  public paisesDatos: Catalogo[] = [];
  public estadosDatos: Catalogo[] = [];
  public municipiosDatos: Catalogo[] = [];
  public localidadesDatos: Catalogo[] = [];
  public coloniasDatos: Catalogo[] = [];

  constructor(private fb: FormBuilder) {
    this.agregarFabricanteForm = this.fb.group({
      nacionalidad: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      rfc: ['', Validators.required],
      curp: ['', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      adunasDeEntradas: ['', Validators.required],
    });
  }
}
