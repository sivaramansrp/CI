/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableBodyData, TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import enlace from 'libs/shared/theme/assets/json/31601/enlace.json';
import enlaceData from 'libs/shared/theme/assets/json/31601/enlace-data.json';

/**
 * Componente para gestionar el enlace de un representante, incluyendo su información en un formulario.
 */
@Component({
  selector: 'app-enlace', // Selector del componente en la plantilla HTML
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [
    TableComponent, // Componente para mostrar tablas
    TituloComponent, // Componente para mostrar un título
    ReactiveFormsModule, // Módulo para trabajar con formularios reactivos
    FormsModule, // Módulo para trabajar con formularios
  ],
  templateUrl: './enlace.component.html', // Ruta a la plantilla HTML
  styleUrl: './enlace.component.scss', // Ruta al archivo de estilos SCSS
})
export class EnlaceComponent implements OnInit {
  /**
   * Encabezados de la tabla de enlace.
   */
  public enlaceHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de enlace, donde se almacenan los datos.
   */
  public enlanceBodyData: TableBodyData[] = [];

  /**
   * Datos de la tabla de enlace que se cargan desde un archivo JSON.
   */
  public enlaceTableData = enlace;

  /**
   * Formulario reactivo para el representante.
   */
  public represtantante!: FormGroup;

  /**
   * Datos predefinidos de un representante, que se cargan en el formulario.
   */
  representativeData = enlaceData;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y carga los encabezados de la tabla.
   */
  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.represtantante = this.fb.group({
      resigtro: ['', Validators.required],
      rfc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      cargo: ['', Validators.required],
      cuidad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      suplente: ['', Validators.required],
    });

    // Carga los datos de la tabla
    this.getEnlace();
  }

  /**
   * Método que obtiene los encabezados de la tabla de enlace.
   */
  public getEnlace() {
    this.enlaceHeaderData = this.enlaceTableData.tableHeader;
  }

  /**
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
  public abrirModal() {
    this.modal = 'show'; // Muestra el modal
    this.getRegistroForm(); // Carga los datos en el formulario
  }

  /**
   * Método que configura el formulario con los datos del representante.
   */
  public getRegistroForm() {
    this.represtantante = this.fb.group({
      resigtro: ['', Validators.required],
      rfc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      cargo: ['', Validators.required],
      cuidad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      suplente: ['', Validators.required],
    });

    // Rellena el formulario con los datos del representante
    this.patchData();
  }

  /**
   * Método que parchea los datos en el formulario, cargando la información del representante.
   */
  public patchData() {
    // Se insertan los valores en los campos del formulario
    this.represtantante.patchValue({
      resigtro: this.representativeData.resigtro,
      rfc: this.representativeData.rfc,
      nombre: this.representativeData.nombre,
      apellidoPaterno: this.representativeData.apellidoPaterno,
      apellidoMaterno: this.representativeData.apellidoMaterno,
      cuidad: this.representativeData.cuidad,
      cargo: this.representativeData.cargo,
      telefono: this.representativeData.telefono,
      correo: this.representativeData.correo,
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('rfc')?.disable();
    this.represtantante.get('nombre')?.disable();
    this.represtantante.get('apellidoPaterno')?.disable();
    this.represtantante.get('apellidoMaterno')?.disable();
    this.represtantante.get('cuidad')?.disable();
  }
}
