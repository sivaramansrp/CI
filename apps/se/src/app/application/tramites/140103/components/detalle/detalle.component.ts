import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
 /**
 * Componente que gestiona el detalle de un formulario relacionado con datos de importación o exportación.
 * Este componente permite visualizar y modificar información sobre los detalles del producto
 * utilizando un formulario reactivo, y está compuesto por varios subcomponentes reutilizables.
 *
 * @component
 * @example
 * <app-detalle></app-detalle>
 * 
 * @imports
 * - `CommonModule`: Módulo común de Angular que proporciona directivas esenciales como `ngIf`, `ngFor`, entre otras.
 * - `TituloComponent`: Componente que muestra un título.
 * - `TablaDinamicaComponent`: Componente que gestiona la visualización de datos en una tabla dinámica.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores desde un catálogo.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  /**
   * Formulario reactivo que contiene todos los datos relacionados con el detalle de importación o exportación.
   * Contiene un formulario anidado llamado `DetalleData` que alberga campos relacionados con el régimen,
   * descripción, clasificación, unidad, mecanismo, entre otros.
   */
  DetalleForm!: FormGroup;

  /**
   * Constructor del componente. Inicializa el formulario reactivo utilizando el FormBuilder.
   * 
   * @param fb - FormBuilder utilizado para crear y gestionar el formulario reactivo.
   */
  constructor(private fb: FormBuilder) {
    // Initialization logic can be added here if needed
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo con todos los controles y validaciones necesarias.
   * También se llama al método `getFormData` para cargar valores por defecto en el formulario.
   */
  ngOnInit(): void {
    // Creación del formulario reactivo con todos los controles y validaciones
    this.DetalleForm = this.fb.group({
      DetalleData: this.fb.group({
        regimen: ['', Validators.required], // Campo para seleccionar el régimen, obligatorio
        descripcion: ['', Validators.required], // Campo para la descripción del producto, obligatorio
        clasificacion: ['', Validators.required], // Campo para la clasificación, obligatorio
        unidad: ['', Validators.required], // Campo para la unidad de medida, obligatorio
        mecanismo: ['', Validators.required], // Campo para el mecanismo, obligatorio
        tratado: ['', Validators.required], // Campo para el tratado del producto, obligatorio
        fracciones: ['', Validators.required], // Campo para las fracciones arancelarias, obligatorio
        paises: ['', Validators.required], // Campo para los países involucrados, obligatorio
        observaciones: ['', Validators.required],// Campo para las observaciones, obligatorio
        fundamentos: ['', Validators.required],// Campo para los fundamentos legales, obligatorio
        inicio: ['', Validators.required], // Campo para la fecha de inicio, obligatorio
        fecha: ['', Validators.required], // Campo para la fecha de vigencia, obligatorio
      })
    });

    // Llamada para cargar los datos en el formulario
    this.getFormData();
  }

  /**
   * Método que carga los datos por defecto en el formulario.
   * Los valores cargados son valores estáticos que representan un ejemplo de importación/exportación.
   * Este método también deshabilita el formulario para que los usuarios no puedan modificar los valores.
   */
  getFormData(): void {
    this.DetalleForm.disable(); // Deshabilita el formulario para que no se pueda modificar

    // Carga los valores por defecto en cada uno de los controles del formulario
    this.DetalleForm.get('DetalleData.regimen')?.setValue('EXPORTACION');
    this.DetalleForm.get('DetalleData.descripcion')?.setValue('TELAS Y BIENES TEXTILES SIMPLE');
    this.DetalleForm.get('DetalleData.unidad')?.setValue('Kilogramo');
    this.DetalleForm.get('DetalleData.mecanismo')?.setValue('Primero en tiempo primero en dere');
    this.DetalleForm.get('DetalleData.tratado')?.setValue('Tratado entre México, Estados Unid');
    this.DetalleForm.get('DetalleData.fracciones')?.setValue('6302530020, 6103230055, 6103432015, 6302100020, 6201407511');
    this.DetalleForm.get('DetalleData.paises')?.setValue('ESTADOS UNIDOS DE AMERICA');
    this.DetalleForm.get('DetalleData.observaciones')?.setValue('observaciones');
    this.DetalleForm.get('DetalleData.fundamentos')?.setValue('Fundamento de la vigencia del UPO');
    this.DetalleForm.get('DetalleData.inicio')?.setValue('2024-01-01');
    this.DetalleForm.get('DetalleData.fecha')?.setValue('2024-12-31');
  }
}
