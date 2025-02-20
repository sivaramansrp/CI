import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * Componente para gestionar la información del representante del importador/exportador.
 */
@Component({
  selector: 'app-represtantante', // Selector del componente en la plantilla HTML
  templateUrl: './represtantante.component.html', // Ruta a la plantilla HTML
  styleUrl: './represtantante.component.scss', // Ruta al archivo de estilos SCSS
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule] // Módulos y componentes necesarios
})
export class ReprestantanteComponent implements OnInit {

  /**
   * Formulario reactivo para los datos del representante.
   */
  represtantante!: FormGroup;

  /**
   * Datos predefinidos del representante.
   */
  representativeData = {
    resigtro: "HEUE780514BVA",
    RFC: "HEUE780514BVA",
    Nombre: " ERNESTO",
    ApellidoPaterno: "HERNANDEZ",
    ApellidoMaterno: "URIBE",
    Telefono: "56457970",
    Correo: "VUCEMcbp@vuem2_5@hotmail.com.com"
  };

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y carga los datos predefinidos del representante.
   */
  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.represtantante = this.fb.group({
      datosImportadorExportador: this.fb.group({
        resigtro: ['', Validators.required],
        RFC: ['', Validators.required],
        Nombre: ['', Validators.required],
        ApellidoPaterno: ['', Validators.required],
        ApellidoMaterno: ['', Validators.required],
        Telefono: ['', Validators.required],
        Correo: ['', Validators.required],
      }),
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('datosImportadorExportador.RFC')?.disable();
    this.represtantante.get('datosImportadorExportador.Nombre')?.disable();
    this.represtantante.get('datosImportadorExportador.ApellidoPaterno')?.disable();
    this.represtantante.get('datosImportadorExportador.ApellidoMaterno')?.disable();

    // Rellena el formulario con los datos del representante
    this.represtantante.patchValue({
      datosImportadorExportador: {
        resigtro: this.representativeData.resigtro,
        RFC: this.representativeData.RFC,
        Nombre: this.representativeData.Nombre,
        ApellidoPaterno: this.representativeData.ApellidoPaterno,
        ApellidoMaterno: this.representativeData.ApellidoMaterno,
        Telefono: this.representativeData.Telefono,
        Correo: this.representativeData.Correo
      }
    });
  }
}
