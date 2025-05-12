/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import DomiciliosTabla from 'libs/shared/theme/assets/json/90201/domicilios-de-plantas-tabla.json';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { DomiciliosDePlantasTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';



/**
 * Componente DomiciliosDePlantas que se utiliza para mostrar y gestionar los DomiciliosDePlantas.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * ReactiveFormsModule para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */

@Component({
  selector: 'app-domicilios-de-plantas',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,ReactiveFormsModule],
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss',
})
export class DomiciliosDePlantasComponent {


  /**
   * Un grupo de formularios que representa los domicilios de las plantas.
   * Este formulario se utiliza para capturar y validar la información de los domicilios.
   */
  public formDomiciliosDePlantas!: FormGroup;

  /**
   * Configuración de la tabla para los domicilios de plantas.
   * 
   * Esta configuración define las columnas que se mostrarán en la tabla, 
   * incluyendo el encabezado, la clave para acceder al valor en cada fila 
   * y el orden en que se mostrarán las columnas.
   * 
   * @type {ConfiguracionColumna<any>[]} configuracionTabla - Arreglo de configuraciones de columnas.
   * @property {string} encabezado - El texto que se mostrará en el encabezado de la columna.
   * @property {Function} clave - Función que recibe un elemento y devuelve el valor correspondiente a la columna.
   * @property {number} orden - El orden en que se mostrará la columna en la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'Calle', clave: (item: any) => item.calle, orden: 1 },
    { encabezado: 'Número exterior', clave: (item: any) => item.numero, orden: 2 },
    { encabezado: 'Número interior', clave: (item: any) => item.interior, orden: 3 },
    { encabezado: 'Código postal', clave: (item: any) => item.postal, orden: 4 },
    { encabezado: 'Colonia', clave: (item: any) => item.colonia, orden: 5 },
    { encabezado: 'Municipio o alcaldía', clave: (item: any) => item.municipio, orden: 6 },
    { encabezado: 'Estado', clave: (item: any) => item.estado, orden: 7 },
  ];

  /**
   * Un arreglo de objetos `DomiciliosDePlantasTabla` que representa la tabla de domicilios.
   * Inicializado con los valores de `DomiciliosTabla`.
   */
  public domiciliosTabla: DomiciliosDePlantasTabla[] = DomiciliosTabla;



  /**
   * Constructor de DomiciliosDePlantasComponent.
   * Inicializa el formulario para domicilios de plantas.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear el formulario.
   */
  constructor(private fb: FormBuilder) {
    this.establecerFormDomiciliosDePlantas();
  }

  /**
   * Inicializa el grupo de formularios para "Domicilios de Plantas" con valores predeterminados y campos deshabilitados.
   * 
   * El grupo de formularios contiene los siguientes controles:
   * - `representacionFederal`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   * - `actividadProductiva`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   */
  public establecerFormDomiciliosDePlantas() {
    this.formDomiciliosDePlantas = this.fb.group({
      representacionFederal: [{value: '',disabled: true}],
      actividadProductiva: [{value: '',disabled: true}]
    });
  }



}
