import { BodyTablaDictamenes, HeaderTablaDictamenes } from '../../../../core/models/shared/consulta-generica.model';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_DICTAMENES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DictamenesResponse } from "../../../../core/models/130118/dictamenes-response.model";
import { DictamenesService } from '../../../../core/services/consultagenerica/dictamenes-service';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-dictamenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictamenes.component.html',
  styleUrl: './dictamenes.component.scss',
})
export class DictamenesComponent implements OnInit, OnChanges, OnDestroy {
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
   * Encabezado de la tabla de dictámenes.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaDictamenes[]}
   */
  readonly encabezadoTablaDictamen: HeaderTablaDictamenes[] = CONSULTA_DICTAMENES.encabezadoTablaDictamen;

  /**
   * Datos de la tabla de dictámenes.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaDictamenes[]}
   */
  datosTablaDictamen: BodyTablaDictamenes[] = [];

  /**
   * Método para abrir el detalle del dictamen.
   */
  public verDetalle = DictamenesComponent.verDetalle;

  /**
    * @property {DictamenesResponse[]} dictamenes
    * @description Dictamenes de solicitud.
  */
  @Input() dictamenes: DictamenesResponse[] = [];

  /**
   * Constructor de la clase DictamenesComponent.
   * @param folioQuery Consulta del folio desde el store.
   * @param dictamenService Servicio para obtener los dictámenes.
   */
  constructor(private folioQuery: FolioQuery, private dictamenService: DictamenesService) {}

  /**
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Se suscribe al observable del servicio para obtener los datos.
    * @returns {void}
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dictamenes'] && changes['dictamenes'].currentValue?.length > 0) {
      this.getDictamenes();
    } else {
      this.dictamenService
      .getDictamenes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaDictamen = data;
      });
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Recupera el folio desde el store y obtiene los dictámenes.
   */
  ngOnInit(): void {
   /**
   * Recuperar el folio desde el store y asignarlo a la variable folio.
   */
    this.folioQuery.getFolio().pipe(takeUntil(this.unsubscribe$)).subscribe((folio) => {
      this.folio = folio || '';
    });

   /**
   * Llamar al método para obtener los dictámenes desde el servicio.
   */
    this.getDictamenes();
  }

  /**
   * Método para obtener los dictámenes desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   */
  getDictamenes(): void {
    this.datosTablaDictamen = this.dictamenes.map((dictamen) => ({
      id: dictamen.id_dictamen,
      fechaCreacion: dictamen.fecha_creacion,
      fechaGeneracion: dictamen.fecha_emision ?? '', 
      fechaAutorizacion: dictamen.fecha_autorizacion ?? '',
      tipo: dictamen.tipo,
      estatus: dictamen.estado_dictamen,
      sentido: dictamen.sentido_dictamen,
      urlPdf: ''
    }));
  }

  /**
   * Abre la pestaña para mostrar el detalle del dictamen.
   * @param {number} _id - Es el Id del dictamen.
   * @returns {void}
   */
  static verDetalle(_id: number): void {
    // Lógica para abrir el detalle del dictamen
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