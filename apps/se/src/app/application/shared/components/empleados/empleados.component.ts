import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DIRECTOS } from '../../constantes/empleados.enum';
import { FECHA_DE_CEDULA } from '../../constantes/empleados.enum';
import { FECHA_DE_FIRMA } from '../../constantes/empleados.enum';
import { FECHA_FIN_VIGENCIA } from '../../constantes/empleados.enum';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { Location } from '@angular/common';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar la información de empleados.
 * @class EmpleadosComponent
 */
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  /**
   * Formulario para gestionar la información de empleados.
   * @property {FormGroup} empleadosForm
   */
  empleadosForm!: FormGroup;

  /**
   * Indica si el campo de razón social está deshabilitado.
   * @property {boolean} disableRazonSocial
   */
  disableRazonSocial: boolean = true;

  /**
   * Opciones disponibles para cédulas.
   * @property {Array} cedulasOptions
   */
  cedulasOptions = [];

  /**
   * Tipo de selección para la tabla de empleados directos.
   * @property {TablaSeleccion} directosTablaSeleccion
   */
  directosTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de empleados directos.
   * @property {any} directosEncabezado
   */
  directosEncabezado = DIRECTOS;

  /**
   * Datos para la tabla de empleados directos.
   * @property {Array} directosDatos
   */
  directosDatos = [];

  /**
   * Configuración de la fecha de cédula.
   * @property {any} fetchaDeCedula
   */
  fetchaDeCedula = FECHA_DE_CEDULA;

  /**
   * Configuración de la fecha de firma.
   * @property {any} fetchaDeFirma
   */
  fetchaDeFirma = FECHA_DE_FIRMA;

  /**
   * Configuración de la fecha de fin de vigencia.
   * @property {any} fetchaFinVigencia
   */
  fetchaFinVigencia = FECHA_FIN_VIGENCIA;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construcción de formularios
   */
  constructor(public fb: FormBuilder, private ubicaccion: Location) {
    this.crearFormularioEmpleados();
  }

  /**
   * Crea el formulario de empleados.
   * @method crearFormularioEmpleados
   * @returns {void}
   */
  crearFormularioEmpleados(): void {
    this.empleadosForm = this.fb.group({
      totalDeEmpleados: [''],
      directos: [''],
      cedulaDeCuotas: [''],
      fechaDeCedula: [''],
      indirectos: [''],
      contrato: [''],
      objetoDelContratoDelServicio: [''],
      fechaFirma: [''],
      fechaFinVigencia: [''],
      rfc: [''],
      razonSocial: [''],
    });
  }

  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
}
