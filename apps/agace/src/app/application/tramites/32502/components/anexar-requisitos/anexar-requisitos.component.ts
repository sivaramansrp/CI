/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent, TEXTOS } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@ng-mf/data-access-user';
import documentosTable from 'libs/shared/theme/assets/json/32502/anexar.json';

/**
 * @Component - AnexarRequisitosComponent
 *
 * Este componente proporciona funcionalidad para adjuntar (anexar) los documentos requeridos.
 * Incluye un formulario con un desplegable para seleccionar un documento y un campo de entrada de archivo
 * para cargar un archivo relacionado con el documento seleccionado.
 */
@Component({
  selector: 'app-anexar-requisitos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule, AlertComponent],
  templateUrl: './anexar-requisitos.component.html',
  styleUrl: './anexar-requisitos.component.scss',
})
export class AnexarRequisitosComponent implements OnInit {
  /**
     * Obtener el valor de la instrucción e inicializar la variable
     */
    TEXTOS = TEXTOS;
  /**
   *Formar grupo para el componente anexar-requisitos.
   * Este grupo de formulario se utiliza para administrar los controles del formulario y sus valores,
   *validación y estatus del componente anexar-requisitos.
   */
  anexarForm!: FormGroup;
  /**
   * Relación de documentos del componente anexar-requisitos.
   * Esta lista se completa a partir de un archivo JSON externo.
   */
  documentos = documentosTable.documentos;

  /**
   * Constructor para AnexarEquisitosComponent.
   * @param fb: instancia de FormBuilder utilizada para crear controles de formulario.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) {}
  /**
   * Enlace de ciclo de vida que se llama después de que se inicializan las propiedades vinculadas a datos de una directiva.
   * Inicializa el componente llamando al método `anexarEquisitosForm`.
   *
   */
  ngOnInit(): void {
    this.anexarEquisitosForm();
  }

  /**
   * Inicializa el grupo de formularios `anexarForm` con un único control de formulario `valorSeleccionado`.
   * El control de formulario se inicializa con una cadena vacía como valor predeterminado.
   *
   * @returns {nulo}
   */

  anexarEquisitosForm(): void {
    const GROUP: any = {};
    this.documentos.forEach((_, index) => {
      GROUP['valorSeleccionado' + index] = new FormControl('');
    });
    this.anexarForm = this.fb.group(GROUP);
  }

  cambioDeArchivo(event: any, index: number): void {
    const FILE = event.target.files[0]; // Get the selected file
    if (FILE) {
      const FILE_URL = URL.createObjectURL(FILE); // Create a URL for the selected file
      this.documentos[index].archivoDisponible.descripcion = FILE.name;
      this.documentos[index].fileUrl = FILE_URL;
      this.anexarForm.patchValue({ ['valorSeleccionado' + index]: FILE });
    }
  }

  verDocumento(index: number): void {
    const FILE_URL = this.documentos[index].fileUrl;
    if (FILE_URL) {
      window.open(FILE_URL, '_blank');
    }
  }
}
