import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})

export class DatosParaMovilizacionNacionalComponent {
  movilizacionForm: FormGroup;
  /**
   * Constructor de la clase DatosParaMovilizacionNacionalComponent.
   * 
   * @param fb - Inyección de dependencia del servicio FormBuilder para la creación de formularios reactivos.
   * 
   * Inicializa el formulario `movilizacionForm` con los siguientes controles:
   * - `coordenadas`: Campo requerido para las coordenadas.
   * - `nombre`: Campo requerido para el nombre.
   * - `medio`: Campo requerido para el medio de transporte, con valor predeterminado 'Aereo'.
   * - `transporte`: Campo requerido para el tipo de transporte.
   * - `punto`: Campo requerido para el punto de movilización. --220201
   */
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