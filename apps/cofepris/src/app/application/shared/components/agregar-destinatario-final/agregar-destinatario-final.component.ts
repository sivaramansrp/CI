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
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.css',
})
export class AgregarDestinatarioFinalComponent {
  agregarDestinatarioFinal: FormGroup;
  public paisesDatos: Catalogo[] = [];
  public estadosDatos: Catalogo[] = [];
  public municipiosDatos: Catalogo[] = [];
  public localidadesDatos: Catalogo[] = [];
  public coloniasDatos: Catalogo[] = [];
  public codigosPostalesDatos: Catalogo[] = [];

  constructor(private fb: FormBuilder) {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: ['', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
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
    });
  }
}
