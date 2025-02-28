import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';

/**
 * Componente para gestionar los datos de prórroga de muestras de mercancías.
 * 
 * Este componente permite capturar y validar la información relacionada con la solicitud
 * de prórroga para muestras de mercancías en el trámite 30901.
 * 
 * @component
 * @templateUrl ./datos-prorroga-muestras-mercancias.component.html
 * @styleUrl ./datos-prorroga-muestras-mercancias.component.scss
 */
@Component({
  selector: 'app-datos-prorroga-muestras-mercancias',
  templateUrl: './datos-prorroga-muestras-mercancias.component.html',
  styleUrl: './datos-prorroga-muestras-mercancias.component.scss',
})
export class DatosProrrogaMuestrasMercanciasComponent implements OnInit {
  /**
   * Formulario reactivo para los datos de prórroga de muestras de mercancías.
   * 
   * Este formulario se utiliza para capturar y validar la información relacionada
   * con la solicitud de prórroga para muestras de mercancías en el trámite 30901.
   * 
   * @type {FormGroup}
   */
  formDatosProrroga!: FormGroup;

  /**
   * Etiqueta que representa la vigencia actual.
   * @type {string}
   */
  vigenciaActualLabel: string = 'Vigencia actual';
  /**
   * Etiqueta que contiene el texto informativo sobre la fecha actual de inicio y fin de vigencia de la autorización.
   * @type {string}
   */
  vigenciaActualTextoLabel: string =
    'La fecha actual de inicio y fin de vigencia de su authorización es la siguiente:';
  /**
   * Etiqueta para la fecha de inicio de vigencia.
   * @type {string}
   */
  fechaInicioVigenciaLabel: string = 'Fecha de Inicio de Vigencia';
  /**
   * Etiqueta para la fecha de fin de vigencia.
   * @type {string}
   */
  fechaFinVigenciaLabel: string = 'Fecha de Fin de Vigencia';

  /**
   * Configuración para la fecha de fin de vigencia.
   * 
   * @property {string} labelNombre - Etiqueta para el nombre de la fecha.
   * @property {boolean} required - Indica si el campo es obligatorio.
   * @property {boolean} habilitado - Indica si el campo está habilitado.
   */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha de Inicio de Vigencia',
    required: false,
    habilitado: false,
  };

  /**
   * Configuración para la fecha de inicio de vigencia.
   * 
   * @property {string} labelNombre - Etiqueta del nombre para la fecha de fin de vigencia.
   * @property {boolean} required - Indica si el campo es obligatorio.
   * @property {boolean} habilitado - Indica si el campo está habilitado.
   */
  configuracionFechaInicioVigencia: InputFecha = {
    labelNombre: 'Fecha de fin de Vigencia',
    required: false,
    habilitado: false,
  };

  /**
   * Constructor de la clase DatosProrrogaMuestrasMercanciasComponent.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder para crear y gestionar formularios reactivos.
   */
  constructor(public fb: FormBuilder) {
       // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario `formDatosProrroga` con los campos `fechaInicioVigencia` y `fechaFinVigencia`,
   * estableciendo valores predeterminados y deshabilitándolos.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.formDatosProrroga = this.fb.group({
      fechaInicioVigencia: [{ value: '01/01/2024', disabled: true }],
      fechaFinVigencia: [{ value: '31/12/2024', disabled: true }],
    });
  }

  /**
   * Maneja el evento de cambio de fecha de fin de vigencia.
   * 
   * @param date - La nueva fecha de fin de vigencia en formato de cadena.
   * 
   * Este método actualiza el valor del campo `fechaInicioVigencia` en el formulario `formDatosProrroga`
   * con la nueva fecha proporcionada.
   */
  onFechaFinVigenciaChange(date: string): void {
    this.formDatosProrroga.patchValue({
      fechaInicioVigencia: date,
    });
  }

  /**
   * Maneja el evento de cambio de fecha de inicio.
   * 
   * @param date - La nueva fecha de inicio en formato de cadena.
   * 
   * Actualiza el campo `fechaFinVigencia` del formulario `formDatosProrroga` con la nueva fecha proporcionada.
   */
  onFechaInicioChange(date: string): void {
    this.formDatosProrroga.patchValue({
      fechaFinVigencia: date,
    });
  }
}
