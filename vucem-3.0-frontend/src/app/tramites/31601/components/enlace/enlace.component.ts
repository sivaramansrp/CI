import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import enlace from '../../../../../assets/json/31601/enlace.json';

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
  styleUrl: './enlace.component.scss' // Ruta al archivo de estilos SCSS
})
export class EnlaceComponent implements OnInit {

  /**
   * Encabezados de la tabla de enlace.
   */
  public enlaceHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de enlace, donde se almacenan los datos.
   */
  public enlanceBodyData: unknown = [];

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
  representativeData = {
    resigtro: "HEUE780514BVA",
    RFC: "HEUE780514BVA",
    Nombre: " ERNESTO",
    ApellidoPaterno: "HERNANDEZ",
    ApellidoMaterno: "URIBE",
    Cuidad:"CUIDAD DE MEXICO",
    Cargo:"",
    Telefono: "56457970",
    Correo: "VUCEM2.5@hotmail.com"
  };

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
      RFC: ['', Validators.required],
      Nombre: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      Cargo: ['', Validators.required],
      Cuidad: ['', Validators.required],
      Telefono: ['', Validators.required],
      Correo: ['', Validators.required],
      Suplente: ['', Validators.required],
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
    this.getregistroForm(); // Carga los datos en el formulario
  }

  /**
   * Método que configura el formulario con los datos del representante.
   */
  public getregistroForm() {
    this.represtantante = this.fb.group({
      resigtro: ['', Validators.required],
      RFC: ['', Validators.required],
      Nombre: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      Cargo: ['', Validators.required],
      Cuidad: ['', Validators.required],
      Telefono: ['', Validators.required],
      Correo: ['', Validators.required],
      Suplente: ['', Validators.required],
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
      RFC: this.representativeData.RFC,
      Nombre: this.representativeData.Nombre,
      ApellidoPaterno: this.representativeData.ApellidoPaterno,
      ApellidoMaterno: this.representativeData.ApellidoMaterno,
      Cuidad: this.representativeData.Cuidad,
      Cargo: this.representativeData.Cargo,
      Telefono: this.representativeData.Telefono,
      Correo: this.representativeData.Correo,
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('RFC')?.disable();
    this.represtantante.get('Nombre')?.disable();
    this.represtantante.get('ApellidoPaterno')?.disable();
    this.represtantante.get('ApellidoMaterno')?.disable();
    this.represtantante.get('Cuidad')?.disable();
  }
}
