import { BodyTablaOpiniones, HeaderTablaOpiniones } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_OPINIONES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { OpinionesService } from '../../../../core/services/consultagenerica/opiniones-service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-opinion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opiniones.component.html',
  styleUrl: './opiniones.component.scss',
})
export class OpinionComponent implements OnInit, OnDestroy {
  /**
   * Variable para almacenar el folio recuperado desde el store.
   * @type {string}
   */
  public folio!: string;

  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * Encabezado de la tabla de opiniones.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaOpiniones[]}
   */
  readonly encabezadoTablaOpiniones: HeaderTablaOpiniones[] = CONSULTA_OPINIONES.encabezadoTablaOpinion;

  /**
   * Datos de la tabla de opiniones.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaOpiniones[]}
   */
  public datosTablaOpiniones: BodyTablaOpiniones[] = [];

  /**
   * Constructor de la clase OpinionComponent.
   * @param router Router para navegar a la vista de detalle de opinión.
   * @param folioQuery Consulta del folio desde el store.
   * @param opinionesService Servicio para obtener las opiniones.
   */
  constructor(
    private router: Router,
    private folioQuery: FolioQuery,
    private opinionesService: OpinionesService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Recupera el folio y obtiene las opiniones desde el servicio.
   */
  ngOnInit(): void {
    /** 
     * Recuperar el folio desde el store.
     */
    this.folioQuery.getFolio().subscribe((folio) => {
      this.folio = folio || '';
    });

    /** 
     * Llamar al método para obtener las opiniones al inicializar el componente.
     */
    this.getOpiniones();
  }

  /**
   * Abre una pestaña del navegador con el detalle de la opinión.
   * @param {number} id - ID de la opinión.
   * @returns {void}
   */
  verDetalleOpinion(id: number): void {
    this.router.navigate(['/lib-detalle-opinion', id]);
  }

  /**
   * Método para obtener la lista de opiniones desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  getOpiniones(): void {
    this.opinionesService
      .getOpiniones()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaOpiniones = data;
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
