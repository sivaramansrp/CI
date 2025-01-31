import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})

export class DatosParaMovilizacionNacionalComponent {
  movilizacionForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.movilizacionForm = this.fb.group({
      coordenadas: ['', Validators.required],
      nombre: ['', Validators.required],
      medio: ['Aereo', Validators.required],
      transporte: ['', [Validators.required]],
      punto: ['', [Validators.required]]
    });
  }
}