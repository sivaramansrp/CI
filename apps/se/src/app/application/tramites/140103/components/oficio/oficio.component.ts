import { BtnContinuarComponent, DatosPasos, ListaPasosWizard, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { CertificadosCancelar} from 'libs/shared/data-access-user/src/core/models/140103/cancelacion.model';

import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { DetalleComponent } from '../detalle/detalle.component';
import { HttpClient } from '@angular/common/http';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import oficiodata from 'libs/shared/theme/assets/json/140103/oficiotable.json';
interface ConfiguracionItem {
  folioOficioCertificado: string;
  nombreRazonSocial: string;
  estado: string;
  fabricante: string;
  importador: string;
  unidadPrimaria: number;
}
/**
 * Componente para gestionar la visualización y actualización de los datos de los oficios de certificados.
 * Este componente muestra una tabla con la información de los oficios y permite la interacción con un formulario
 * reactivo que captura datos relacionados con la asignación y monto a cancelar.
 *
 * @component
 * @example
 * <app-oficio></app-oficio>
 * 
 * @imports
 * - `TablaDinamicaComponent`: Componente para mostrar datos en formato de tabla dinámica.
 * - `DetalleComponent`: Componente que muestra detalles adicionales del certificado.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `BtnContinuarComponent`: Componente que permite la acción de continuar.
 */
@Component({
  selector: 'app-oficio',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    DetalleComponent,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    BtnContinuarComponent
  ],
  templateUrl: './oficio.component.html',
  styleUrls: ['./oficio.component.scss']
})

/**
 * Componente que gestiona la visualización y la actualización de datos relacionados con los oficios de certificados.
 * Este componente se encarga de mostrar una tabla dinámica con la información de los oficios y permite la interacción
 * con un formulario reactivo para capturar datos de asignación, monto y estado de cancelación.
 * Además, implementa la navegación por pasos dentro del proceso de gestión de los oficios.
 * 
 * @class
 * @implements OnInit
 * @example
 * <app-oficio></app-oficio>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo que incluye campos como 'asignado', 'monto', y 'cancelar'.
 * También carga los datos de los oficios a través de un archivo JSON y establece configuraciones para las columnas de la tabla.
 * 
 * @property {Facturas[]} Certificados - Lista vacía que almacena los certificados de los oficios.
 * @property {certificadosCancelar[]} oficio - Lista que contiene los oficios cargados desde un archivo JSON.
 * @property {ConfiguracionColumna<any>[]} configuracionTabla - Configuración de las columnas para la tabla de oficios.
 * @property {any[]} filteredData - Datos filtrados de los oficios para mostrar solo los que cumplen con un criterio específico.
 * @property {TablaSeleccion} TablaSeleccion - Tipo de selección de tabla (checkbox).
 * @property {FormGroup} OficioForm - Formulario reactivo que captura la información del oficio.
 * @property {ListaPasosWizard[]} pasos - Lista de pasos del asistente de navegación (wizard).
 * @property {number} indice - Índice del paso actual del asistente de navegación.
 * @property {DatosPasos} datosPasos - Datos del asistente de pasos que incluyen la cantidad de pasos, texto de los botones, etc.
 * 
 * @method ngOnInit() - Inicializa el formulario reactivo y llama a `updateformfied` para establecer valores predeterminados en los campos.
 * @method updateformfied() - Actualiza los valores del formulario y deshabilita los campos de entrada para evitar modificaciones del usuario.
 */
export class OficioComponent implements OnInit {

  /**
   * Lista de certificados cargados desde un archivo JSON.
   * Esta lista contiene la información de los oficios y su estado.
   */
  Certificados: [] = [];

  /**
   * Lista de datos de oficios, cada uno representando un certificado que será mostrado en la tabla.
   */
  oficio: CertificadosCancelar[] = oficiodata;

  /**
   * Configuración de las columnas para la tabla de oficios.
   * Define qué columnas mostrar y cómo extraer los datos de cada oficio.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = [
    { encabezado: 'Folio del oficio de certificado', clave: (item:ConfiguracionItem) => item.folioOficioCertificado, orden: 1 },
    { encabezado: 'Nombre, Denominación o Razón Social', clave: (item: ConfiguracionItem) => item.nombreRazonSocial, orden: 2 },
    { encabezado: 'Estado', clave: (item: ConfiguracionItem) => item.estado, orden: 3 },
    { encabezado: 'Fabricante', clave: (item: ConfiguracionItem) => item.fabricante, orden: 4 },
    { encabezado: 'Importador', clave: (item: ConfiguracionItem) => item.importador, orden: 5 },
    { encabezado: 'Unidad Primaria', clave: (item: ConfiguracionItem) => item.unidadPrimaria, orden: 6 },
  ];

  /**
   * Filtra los datos de los oficios para mostrar solo aquellos con unidadPrimaria igual a 12.
   */
  filteredData = this.oficio.filter(item => item.unidadPrimaria === 12);

  /**
   * Configuración del tipo de selección en la tabla (en este caso, se usa un checkbox).
   */
  TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Formulario reactivo que captura datos relacionados con el oficio, incluyendo
   * asignado, monto y cancelar.
   */
  OficioForm!: FormGroup;

  /**
   * Constructor del componente. Inicializa el formulario reactivo utilizando FormBuilder
   * y configura las dependencias necesarias como HttpClient.
   * 
   * @param http - HttpClient utilizado para hacer solicitudes HTTP.
   * @param fb - FormBuilder utilizado para crear y gestionar el formulario reactivo.
   */
  constructor(public http: HttpClient, public fb: FormBuilder) {
    // Initialization logic can be added here if needed
  }

  /**
   * Lista de pasos del asistente de navegación (wizard) que guiará al usuario a través de los pasos del proceso.
   */
  pasos: ListaPasosWizard[] = [];

  /**
   * Índice del paso actual en el asistente de navegación.
   */
  indice: number = 1;

  /**
   * Datos del asistente de pasos que contiene la cantidad de pasos y el índice del paso actual.
   * También contiene los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // El número de pasos se obtiene dinámicamente de la lista `pasos`
    indice: this.indice, // Índice del paso actual en el formulario
    txtBtnAnt: 'Anterior', // Texto para el botón de retroceso
    txtBtnSig: 'Continuar', // Texto para el botón de siguiente
  };

  /**
   * Método que se ejecuta al inicializar el componente. Este método crea el formulario reactivo
   * con los controles necesarios y las validaciones requeridas.
   */
  ngOnInit(): void {
    // Inicializa el formulario con los controles y validaciones necesarias
    this.OficioForm = this.fb.group({
      oficioData: this.fb.group({
        asignado: ['', Validators.required], // Campo obligatorio para el monto asignado
        monto: ['', Validators.required], // Campo obligatorio para el monto
        cancelar: ['', Validators.required],// Campo obligatorio para la acción de cancelar
      })
    });

    // Llama al método para actualizar el campo 'monto' con valores predeterminados
    this.updateformfied();
  }

  /**
   * Método que actualiza los valores del formulario con datos predeterminados.
   * También deshabilita los campos para que no puedan ser modificados por el usuario.
   */
  updateformfied(): void {
    this.OficioForm.get('oficioData.asignado')?.disable(); // Deshabilita el campo 'asignado'
    this.OficioForm.get('oficioData.monto')?.disable(); // Deshabilita el campo 'monto'
    this.OficioForm.get('oficioData.asignado')?.setValue('2500'); // Asigna un valor predeterminado al campo 'asignado'
    this.OficioForm.get('oficioData.monto')?.setValue('-3991'); // Asigna un valor predeterminado al campo 'monto'
    this.OficioForm.get('oficioData.cancelar')?.setValue('12'); // Asigna un valor predeterminado al campo 'cancelar'
  }

}
