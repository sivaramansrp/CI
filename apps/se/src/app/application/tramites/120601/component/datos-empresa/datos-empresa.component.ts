import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, SelectCatalogosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    SelectCatalogosComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.css',
})
export class DatosEmpresaComponent implements OnInit {
  
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;
  /**
   * Representa la entidad seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} entidad - La entidad seleccionada.
   */
  public entidad!: Catalogo[];

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} representacion - La representación seleccionada.
   */

  public representacion!: Catalogo[];
  
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
    // eslint-disable-next-line no-empty-function
) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
  }
  /**
   * Crea el formulario con los campos necesarios y sus validaciones.
   * @returns {void}
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      entidad: [''],
      representacion: ['', Validators.required],
    });
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.entidad = [
      {
        id: 1,
        descripcion: 'SINALOA',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getRepresentacionFederal(): void {
    this.representacion = [
      {
        id: 1,
        descripcion: 'CULIACAN',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  /**
  * Método para validar la representación federal.
  * @param _e - Objeto de tipo 'Catalogo'.
  * @returns {void}
  */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // this is a dynamic function once we get the api will implement it
  }

  /**
   * Método para validar la representación federal.
   * @param _e - Objeto de tipo 'Catalogo'.
   * @returns {void}
   */

  // eslint-disable-next-line class-methods-use-this
  public validarRepresentacionFederalIDCSECEROR_(_e: Event): void {
    // this is a dynamic function once we get the api will implement it

  }

  
}
