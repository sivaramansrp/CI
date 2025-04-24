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
   * Variable para almacenar el folio
   */
  public folio!: string;
  /**
   * Variable para almacenar el Id de la opinion
   */
  id!: number;
  /**
   * Declaracion de los formularios reactivos
   * @param solicitudForm FormGroup para la solicitud de opinión
   * @param opinionForm FormGroup para la opinión
   */
  solicitudForm!: FormGroup;
  opinionForm!: FormGroup;
  
  public solicitud!: SolicitudDetalleOpinion | null;
  public opinion!: OpinionDetalleOpinion | null;
  public unsubscribe$ = new Subject<void>();
   /**
   * Subject para notificar la destrucción del componente.
   */
   public destroyNotifier$: Subject<void> = new Subject();
  
  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private detallesService: DetallesOpinionService,
      private folioQuery: FolioQuery
    ) {
      /**
       * Constructor para la consulta de opiniones
       * @param fb FormBuilder para crear formularios reactivos
       * @param route ActivatedRoute para acceder a los parámetros de la ruta
       * @param solicitudService Servicio para obtener datos de la solicitud
       * @param folioQuery Consulta del folio
       * 
       */
    }
    ngOnInit(): void {
      /**
       * Obtener el parámetro 'id' de la URL
       * @param id Número de identificación de la opinión
       * 
       */
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      /**
       * Recuperar el folio desde el store
       */
      this.folioQuery.getFolio().subscribe(folio => {
        this.folio = folio || '';
      });      
      
      /**
       * Formulario reactivo para la solicitud de opinión
       * @param areaSolicitante Área solicitante
       * @param estatus Estado de la solicitud
       * @param fechaCreacion Fecha de creación de la solicitud
       * @param fechaSolicitud Fecha de la solicitud
       * @param justificacionOpinion Justificación de la opinión
       * 
       */
      this.solicitudForm = this.fb.group({
        areaSolicitante: ['', Validators.required],
        estatus: ['', Validators.required],
        fechaCreacion: ['', Validators.required],
        fechaSolicitud: ['', Validators.required],
        justificacionOpinion: ['', Validators.required],
      });
      
      /**
       * Formulario reactivo para la opinión
       * @param areaResponsable Área responsable de la opinión
       * @param sentido Sentido de la opinión
       * @param generadoPor Generado por
       * @param fechaGeneracion Fecha de generación de la opinión
       * @param opinion Contenido de la opinión
       */
      this.opinionForm = this.fb.group({
        areaResponsable: ['', Validators.required],
        sentido: ['', Validators.required],
        generadoPor: ['', Validators.required],
        fechaGeneracion: ['', Validators.required],
        opinion: ['', Validators.required],
      });
      /**
     * Llamar al método para obtener los datos de la solicitud en la opinion al inicializar el componente
     */
    this.getSolicitud();

    /**
     * Llamar al método para obtener los datos de la opinion al inicializar el componente
     */
    this.getOpinion();
    /**
     * Llamar al método para obtener los documentos de la opinion al inicializar el componente
     */
    this.getDocumentosOpinion();
    }
    /**
     * Implementación para la tabla de opiniones.
     *
     */
    readonly encabezadoTablaOpiones : HeaderTablaOpinion[] = CONSULTA_DETALLEOPINIONES.encabezadoTablaOpinion;  
    /**
       * Variable para almacenar los documentos de la opinion
       */
    datosTablaOpiniones: BodyTablaOpinion[] = [];

    /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfOpinion(url: string): void {
    window.open(url, '_blank');
  }
  
  /**
   * Método para obtener la información de la solicitud para la opinión
   * @returns {void}
   * 
   */
  getSolicitud(): void {
    this.detallesService
      .getSolicitudDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.solicitud = data;
        
      /**
       * Verifica si hay datos y actualiza el formulario
       * 
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
   * Método para obtener la información de la opinión de la solicitud 
   */
  getOpinion(): void {
    this.detallesService
      .getOpinionDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.opinion = data;
         
         /**
          * Verifica si hay datos y actualiza el formulario
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
   * Método para obtener los documentos de la opinion desde el servicio.
   * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
   * suscribe - Se suscribe al observable del servicio para obtener los datos.
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
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof DetalleOpinionComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete()
  }
}