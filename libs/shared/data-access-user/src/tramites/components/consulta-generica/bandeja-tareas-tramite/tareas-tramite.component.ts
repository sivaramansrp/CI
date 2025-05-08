import {
  BodyTablaTareasTramite,
  HeaderTablaTareasTramite,
} from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_TAREASTRAMITE } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { TareasTramiteService } from '../../../../core/services/consultagenerica/tareas-tramite-service';

@Component({
  selector: 'lib-tareas-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas-tramite.component.html',
  styleUrl: './tareas-tramite.component.scss',
})
export class TareasTramiteComponent implements OnInit, OnDestroy {
  /**
   * Variable para almacenar el folio
   */
  public folio!: string;
  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();
  /**
   * Encabezado de la tabla de tareas de trámite.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaTareasTramite[]}
   */
  readonly encabezadoTablaTareasTramite: HeaderTablaTareasTramite[] =
    CONSULTA_TAREASTRAMITE.encabezadoTablaTareasTramite;

  /**
   * Datos de la tabla de tareas de trámite.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaTareasTramite[]}
   */
  datosTablaTareasTramite: BodyTablaTareasTramite[] = [];

  /**
   * Constructor para la bandeja de tareas de trámite.
   * @param folioQuery Consulta del folio desde el store.
   * @param tareasTramiteService Servicio para obtener las tareas de trámite.
   */
  constructor(
    private folioQuery: FolioQuery,
    private tareasTramiteService: TareasTramiteService
  ) {}
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Recupera el folio desde el store y obtiene las tareas de trámite.
   */
  ngOnInit(): void {
    /**
     * Recuperar el folio desde el store
     */
    this.folioQuery
      .getFolio()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((folio) => {
        this.folio = folio || '';
      });

    /**
     * Llamar al método para obtener obtener las tareas de trámite
     */
    this.getTareas();
  }

  /**
   * Método para obtener los requerimientos desde el servicio.
   * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
   * suscribe - Se suscribe al observable del servicio para obtener los datos.
   */
  getTareas(): void {
    this.tareasTramiteService
      .getTareasTramite()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaTareasTramite = data;
      });
  }
  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof DetalleOpinionComponent
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}