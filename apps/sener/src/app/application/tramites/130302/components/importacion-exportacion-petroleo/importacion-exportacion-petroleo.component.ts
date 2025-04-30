import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-importacion-exportacion-petroleo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent],
  templateUrl: './importacion-exportacion-petroleo.component.html',
  styleUrls: ['./importacion-exportacion-petroleo.component.css']
})
export class ImportacionExportacionPetroleoComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      folioTramite: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacionRegimen: ['', Validators.required],
      periodoVigencia: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      cantidadAutorizada: ['', Validators.required],
      valorAutorizado: ['', Validators.required],
      nico: ['', Validators.required],
      descripcionNico: ['', Validators.required],
      acotacion: [''],
      permisoValidoDesde: ['', Validators.required],
      permisoValidoHasta: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    }
  }
}
