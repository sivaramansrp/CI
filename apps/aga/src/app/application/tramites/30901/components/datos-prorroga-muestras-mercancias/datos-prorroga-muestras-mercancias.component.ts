import { Component, OnDestroy } from '@angular/core';
import { DatosProrrogaMuestrasMercanciasQuery } from '../../estados/renovaciones/datos-prorroga-muestras-mercancias.query';
import { DatosProrrogaMuestrasMercanciasStore } from '../../estados/renovaciones/datos-prorroga-muestras-mercancias.store';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ListaDeFechas } from '../../models/registro-muestras-mercancias.model';
import { InputFecha } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
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
export class DatosProrrogaMuestrasMercanciasComponent implements OnInit, OnDestroy {
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
     * Subject para desuscribirse de los observables.
     * @type {Subject<void>}
     */ 
    private destroyed$ = new Subject<void>();

  /**
   * Constructor de la clase DatosProrrogaMuestrasMercanciasComponent.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder para crear y gestionar formularios reactivos.
   */
  constructor(
    public fb: FormBuilder,
    public query: DatosProrrogaMuestrasMercanciasQuery,
    public store: DatosProrrogaMuestrasMercanciasStore
  ) {
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
      fechaInicioVigencia: [{ value: '', disabled: true }],
      fechaFinVigencia: [{ value: '', disabled: true }],
    });

    /**
     * Observable que obtiene las fechas de inicio y fin de vigencia.
     */
    this.query.obtenerFechas$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: ListaDeFechas) => {
          this.formDatosProrroga.patchValue({
            fechaInicioVigencia: seccionState.fechaInicioVigencia,
            fechaFinVigencia: seccionState.fechaFinVigencia,
          });
        })
      )
      .subscribe();
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

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   * */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
