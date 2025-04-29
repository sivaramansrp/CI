import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDelTramiteFormState } from '../../../../shared/models/datos-del-tramite.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ID_PROCEDIMIENTO } from '../../constantes/exportacion-armas-explosivo.enum';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Tramite240121Query } from '../../estados/tramite240121Query.query';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';
/**
 * @title Datos del Trámite Contenedora
 * @description Componente contenedor que se encarga de enlazar el estado del trámite con el componente de datos del trámite.
 * @summary Maneja la suscripción al estado y propaga los cambios a través del store.
 */

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  standalone: true,
  imports: [CommonModule, DatosDelTramiteComponent, ReactiveFormsModule],
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.scss',
})
/**
 * Componente que representa la contenedora de datos del trámite.
 * Este componente se encarga de gestionar el formulario y los datos relacionados
 * con el trámite, incluyendo la tabla de mercancías y el estado del formulario.
 *
 * @export
 * @class DatosDelTramiteContenedoraComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class DatosDelTramiteContenedoraComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la combinación de datos del trámite.
   * 
   * @type {FormGroup}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public formCombinacion!: FormGroup;

  /**
   * Observable para gestionar la limpieza de suscripciones activas al destruir el componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Datos de la tabla de mercancías que se muestran en el formulario.
   * 
   * @type {MercanciaDetalle[]}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
   * Estado actual del formulario de datos del trámite.
   * 
   * @type {DatosDelTramiteFormState}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Identificador del procedimiento actual.
   * 
   * @readonly
   * @type {string}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Constructor del componente.
   * Inicializa el formulario y configura las dependencias necesarias.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite240121Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240121Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   * @memberof DatosDelTramiteContenedoraComponent
   */
  constructor(
    private fb: FormBuilder,
    private tramiteQuery: Tramite240121Query,
    private tramiteStore: Tramite240121Store,
    private validacionesService: ValidacionesFormularioService,
  ) {
    this.crearFormCombinacion();
  }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del estado para mostrar los datos en la vista.
   *
   * @returns {void}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  ngOnInit(): void {
    this.crearFormCombinacion();
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosMercanciaTabla = data;
      });

    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });
  }

  /**
   * Verifica si un campo del formulario es válido.
   *
   * @param {string} field - Nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public isValid(field: string): boolean {
    return this.validacionesService.isValid(this.formCombinacion, field) ?? false;
  }

  /**
   * Crea el formulario reactivo para la combinación de datos del trámite.
   *
   * @returns {void}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  public crearFormCombinacion(): void {
    this.formCombinacion = this.fb.group({
    });
  }

  /**
   * Actualiza el estado del formulario de datos del trámite en el store.
   *
   * @param {DatosDelTramiteFormState} event - Estado actualizado del formulario.
   * @returns {void}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  updateDatosDelTramiteFormulario(event: DatosDelTramiteFormState): void {
    this.tramiteStore.updateDatosDelTramiteFormState(event);
  }

  /**
   * Hook del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   *
   * @returns {void}
   * @memberof DatosDelTramiteContenedoraComponent
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
