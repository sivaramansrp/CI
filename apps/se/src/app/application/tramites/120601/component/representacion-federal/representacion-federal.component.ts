import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, DATOS_GENERALES_REPRESENTACION, SelectCatalogosComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { representacionFederal } from '@ng-mf/data-access-user';
import { representacionFederalTable } from '@ng-mf/data-access-user';
import { tipoDeEmpresa } from '@ng-mf/data-access-user';

/**
 * Componente que representa la representación federal en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    SelectCatalogosComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TableComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.css',
})
export class RepresentacionFederalComponent implements OnInit {

  /**
   * Datos del encabezado de la tabla.
   */
  tableHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla.
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   */
  public formulario!: FormGroup;

  /**
   * Representa el estado seleccionado del catálogo.
   * Se espera que esta propiedad sea del tipo 'Catalogo[]'.
   */
  public estado!: Catalogo[];

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  selectedRow: number = 1;

  /**
   * Configuración de la tabla para los socios.
   */
  configuracionTabla = DATOS_GENERALES_REPRESENTACION;

  /**
   * Arreglo de datos para los socios.
   */
  datos_Socios = representacionFederalTable;

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'Catalogo[]'.
   */
  public representacion!: Catalogo[];

  /**
   * Constructor de la clase.
   * @param fb El servicio FormBuilder.
   */
  constructor(private fb: FormBuilder) {
    // Initialization logic can be added here if needed
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
      estado: [''],
      representacion: ['', Validators.required],
    });
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.estado = tipoDeEmpresa;
  }

  /**
   * Recupera y establece la información de la representación federal.
   * @returns {void}
   */
  public getRepresentacionFederal(): void {
    this.representacion = representacionFederal;
  }

  /**
   * Método para validar la representación federal.
   * @param _e El evento de selección de documento.
   * @returns {void}
   */
   // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // Esta es una función dinámica; una vez que obtengamos la API, la implementaremos.
  }

  /**
   * Método para validar la representación federal.
   * @param _e El evento de validación de representación federal.
   * @returns {void}
   */
   // eslint-disable-next-line class-methods-use-this
  public validarRepresentacionFederalIDCSECEROR_(_e: Event): void {
    // Esta es una función dinámica; una vez que obtengamos la API, la implementaremos.
  }
}
