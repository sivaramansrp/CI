/* eslint-disable @nx/enforce-module-boundaries */
import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { MENSAJE_ALERTA_TRATADOS } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import tratadosDropdown from 'libs/shared/theme/assets/json/110101/tratdos-dropdown.json';
import tratadosTable from 'libs/shared/theme/assets/json/110101/tratados-table.json';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Componente Tratados que se utiliza para mostrar y gestionar los tratados.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, SelectCatalogosComponent, CommonModule,
 * TableComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */
@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    TableComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ]
})
export class TratadosComponent implements OnInit {
  /**
   * Formulario reactivo para gestionar los tratados.
   * 
   * @property {FormGroup} formularioTratados - El formulario reactivo que contiene los campos para los tratados.
   */
  formularioTratados!: FormGroup;

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Llama al método `inicializarFormularioTratados` para configurar el formulario reactivo.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.inicializarFormularioTratados();
  }

  /**
   * Inicializa el formulario reactivo para los tratados.
   * 
   * Este método configura el formulario reactivo con los campos `pais`, `tratado` y `origen`,
   * todos ellos con validadores requeridos.
   * 
   * @method inicializarFormularioTratados
   */

  inicializarFormularioTratados(): void {
    this.formularioTratados = this.fb.group({
      pais: ['', Validators.required],
      tratado: ['', Validators.required],
      origen: ['', Validators.required]
    });
  }

  /**
   * Mensaje de alerta para tratados.
   * 
   * @property {string} alert - El mensaje de alerta que se mostrará en el componente.
   */

  alerta = MENSAJE_ALERTA_TRATADOS;



  /**
   * Configuraciones de los menús desplegables.
   * 
   * @property {Array} configuracionesDropdown - Array de objetos que contienen los catálogos para los menús desplegables.
   */
  configuracionesDropdown = [
    { catalogos: tratadosDropdown.pais },
    { catalogos: tratadosDropdown.tratado },
    { catalogos: tratadosDropdown.origen }
  ];

 

  /**
   * Método para seleccionar un tratado.
   * 
   * Este método actualmente no tiene implementación. Puede ser implementado según los requisitos
   * o eliminado si no es necesario.
   * 
   * @method seleccionar
   */
    // eslint-disable-next-line class-methods-use-this
  seleccionar(): void {
    // Implementar el método o eliminarlo si no es necesario
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} encabezadosComunesTabla - Array de cadenas de encabezados de tabla.
   */
  encabezadosComunesTabla = tratadosTable.tableHeader;

  /**
   * Cuerpo de la tabla de tratados.
   * 
   * @property {any[]} cuerpoTabla - Array de datos del cuerpo de la tabla.
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cuerpoTabla: any[] = tratadosTable.tableBody;


  // eslint-disable-next-line class-methods-use-this
  /**
   * Agrega un nuevo tratado a la tabla.
   * 
   * Este método verifica si el formulario es válido, y si lo es, agrega el nuevo tratado
   * al cuerpo de la tabla y reinicia el formulario.
   * 
   * @method agregarTratado
   */
  agregarTratado(): void {
    if (this.formularioTratados.valid) {
      const NUEVOTRATADO = this.formularioTratados.value;
      this.cuerpoTabla.push(NUEVOTRATADO);
      this.formularioTratados.reset();
    } 
  }

}
