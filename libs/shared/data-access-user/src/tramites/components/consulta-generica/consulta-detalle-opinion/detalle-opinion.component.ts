import { BodyTablaOpinion, HeaderTablaOpinion, OpinionDetalleOpinion, SolicitudDetalleOpinion } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CONSULTA_DETALLEOPINIONES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DetallesOpinionService } from '../../../../core/services/consultagenerica/detalles-opinion-service';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-detalle-opinion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalle-opinion.component.html',
  styleUrl: './detalle-opinion.component.scss',
})
export class DetalleOpinionComponent implements OnInit, OnDestroy {
  /**
   * Variable para almacenar el folio.
   * @type {string}
   */
  public folio!: string;

  /**
   * Variable para almacenar el Id de la opinión.
   * @type {number}
   */
  public id!: number;

  /**
   * Formulario reactivo para la solicitud de opinión.
   * @type {FormGroup}
   */
  public solicitudForm!: FormGroup;

  /**
   * Formulario reactivo para la opinión.
   * @type {FormGroup}
   */
  public opinionForm!: FormGroup;

  /**
   * Variable para almacenar los datos de la solicitud.
   * @type {SolicitudDetalleOpinion | null}
   */
  public solicitud!: SolicitudDetalleOpinion | null;

  /**
   * Variable para almacenar los datos de la opinión.
   * @type {OpinionDetalleOpinion | null}
   */
  public opinion!: OpinionDetalleOpinion | null;

  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * Encabezado de la tabla de opiniones.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaOpinion[]}
   */
  readonly encabezadoTablaOpiones: HeaderTablaOpinion[] = CONSULTA_DETALLEOPINIONES.encabezadoTablaOpinion;

  /**
   * Datos de la tabla de opiniones.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaOpinion[]}
   */
  public datosTablaOpiniones: BodyTablaOpinion[] = [];

  /**
   * Constructor para la consulta de opiniones.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param route ActivatedRoute para acceder a los parámetros de la ruta.
   * @param detallesService Servicio para obtener datos de la solicitud y opinión.
   * @param folioQuery Consulta del folio desde el store.
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private detallesService: DetallesOpinionService,
    private folioQuery: FolioQuery
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura los formularios reactivos, recupera el folio y los datos de la solicitud y opinión.
   */
  ngOnInit(): void {
    /** 
     * Obtener el parámetro 'id' de la URL.
     */
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    /** 
     * Recuperar el folio desde el store.
     */
    this.folioQuery
      .getFolio()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((folio) => {
        this.folio = folio || '';
      });

    /** 
     * Formulario reactivo para la solicitud de opinión.
     */
    this.solicitudForm = this.fb.group({
      areaSolicitante: ['', Validators.required],
      estatus: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      justificacionOpinion: ['', Validators.required],
    });

    /** 
     * Formulario reactivo para la opinión.
     */
    this.opinionForm = this.fb.group({
      areaResponsable: ['', Validators.required],
      sentido: ['', Validators.required],
      generadoPor: ['', Validators.required],
      fechaGeneracion: ['', Validators.required],
      opinion: ['', Validators.required],
    });

    /** 
     * Llamar a los métodos para obtener los datos.
     */
    this.getSolicitud();
    this.getOpinion();
    this.getDocumentosOpinion();
  }

  /**
   * Método para obtener la información de la solicitud para la opinión.
   * @returns {void}
   */
  getSolicitud(): void {
    this.detallesService
      .getSolicitudDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.solicitud = data;

        /** 
         * Verifica si hay datos y actualiza el formulario.
         */
        if (this.solicitud !== null) {
          const SOLICITUDDATA = this.solicitud;
          this.solicitudForm.patchValue({
            areaSolicitante: SOLICITUDDATA.areaSolicitante,
            estatus: SOLICITUDDATA.estatus,
            fechaCreacion: SOLICITUDDATA.fechaCreacion,
            fechaSolicitud: SOLICITUDDATA.fechaSolicitud,
            justificacionOpinion: SOLICITUDDATA.justificacionOpinion,
          });
        }
      });
  }

  /**
   * Método para obtener la información de la opinión de la solicitud.
   * @returns {void}
   */
  getOpinion(): void {
    this.detallesService
      .getOpinionDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.opinion = data;

        /** 
         * Verifica si hay datos y actualiza el formulario.
         */
        if (this.opinion !== null) {
          const OPINIONDATA = this.opinion;
          this.opinionForm.patchValue({
            areaResponsable: OPINIONDATA.areaResponsable,
            sentido: OPINIONDATA.sentido,
            generadoPor: OPINIONDATA.generadoPor,
            fechaGeneracion: OPINIONDATA.fechaGeneracion,
            opinion: OPINIONDATA.opinion,
          });
        }
      });
  }

  /**
   * Método para obtener los documentos de la opinión desde el servicio.
   * @returns {void}
   */
  getDocumentosOpinion(): void {
    this.detallesService
      .getDocumentosDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaOpiniones = data;
      });
  }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfOpinion(url: string): void {
    window.open(url, '_blank');
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