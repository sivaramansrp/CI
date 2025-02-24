import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import RepresentantanteData from '../../../../../assets/json/31601/represtantante-data.json';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * Componente para gestionar la información del representante del importador/exportador.
 */
@Component({
  selector: 'app-represtantante', // Selector del componente en la plantilla HTML
  templateUrl: './represtantante.component.html', // Ruta a la plantilla HTML
  styleUrl: './represtantante.component.scss', // Ruta al archivo de estilos SCSS
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule], // Módulos y componentes necesarios
})
export class ReprestantanteComponent implements OnInit {
  /**
   * Formulario reactivo para los datos del representante.
   */
  represtantante!: FormGroup;

  /**
   * Datos predefinidos del representante.
   */
  representativeData = RepresentantanteData;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y carga los datos predefinidos del representante.
   */
  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.represtantante = this.fb.group({
      datosImportadorExportador: this.fb.group({
        resigtro: ['', Validators.required],
        rfc: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required],
      }),
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('datosImportadorExportador.rfc')?.disable();
    this.represtantante.get('datosImportadorExportador.nombre')?.disable();
    this.represtantante
      .get('datosImportadorExportador.apellidoPaterno')
      ?.disable();
    this.represtantante
      .get('datosImportadorExportador.apellidoMaterno')
      ?.disable();

    // Rellena el formulario con los datos del representante
    this.represtantante.patchValue({
      datosImportadorExportador: {
        resigtro: this.representativeData.resigtro,
        rfc: this.representativeData.rfc,
        nombre: this.representativeData.nombre,
        apellidoPaterno: this.representativeData.apellidoPaterno,
        apellidoMaterno: this.representativeData.apellidoMaterno,
        telefono: this.representativeData.telefono,
        correo: this.representativeData.correo,
      },
    });
  }
}
