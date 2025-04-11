import { BodyTablaOpinion, HeaderTablaOpinion, OpinionDetalleOpiniones,SolicitudDetalleOpiniones } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CONSULTA_DETALLEOPINIONES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DetalleOpinionesService } from '../../../../core/services/DetalleOpinionesService';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-detalle-opinion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './DetalleOpinion.component.html',
  styleUrl: './DetalleOpinion.component.css',
})
export class DetalleOpinionComponent implements OnInit {
  public folio!: string;
  id!: number;

  solicitudForm!: FormGroup;
  opinionForm!: FormGroup;
  
  public solicitud: SolicitudDetalleOpiniones [] = [];
  public opinion: OpinionDetalleOpiniones [] = [];
  public unsubscribe$ = new Subject<void>();
  
  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private solicitudService: DetalleOpinionesService,
      private folioQuery: FolioQuery
    ) {
      // Componente para consulta de opinion
    }
    ngOnInit(): void {
      // Obtener el parámetro 'id' de la URL
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      // Recuperar el folio desde el store
      this.folioQuery.getFolio().subscribe(folio => {
        this.folio = folio || '';
      });
      // Llamamos a los métodos para crear el formulario y obtener el rango de fechas
      this.getSolicitud();
      this.getOpinion();

      // Inicializar solicitudForm
      this.solicitudForm = this.fb.group({
        areaSolicitante: ['', Validators.required],
        estatus: ['', Validators.required],
        fechaCreacion: ['', Validators.required],
        fechaSolicitud: ['', Validators.required],
        justificacionOpinion: ['', Validators.required],
      });

      // Inicializar opinionForm
      this.opinionForm = this.fb.group({
        areaResponsable: ['', Validators.required],
        sentido: ['', Validators.required],
        generadoPor: ['', Validators.required],
        fechaGeneracion: ['', Validators.required],
        opinion: ['', Validators.required],
      });
    }
    /**
     * Implementación para la tabla de opiniones.
     *
     */
    readonly encabezadoTablaOpiones : HeaderTablaOpinion[] = CONSULTA_DETALLEOPINIONES.encabezadoTablaOpinion;  
    readonly datosTablaOpiniones: BodyTablaOpinion[] = CONSULTA_DETALLEOPINIONES.datosTablaOpinion;

    /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfOpinion(url: string): void {
    window.open(url, '_blank');
  }
  // Método para obtener la información de la solicitud para la opinión
  getSolicitud(): void {
    this.solicitudService.getSolicitudOpiniones()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.solicitud = data;

        // Verifica si hay datos y actualiza el formulario
      if (this.solicitud.length > 0) {
        const SOLICITUDDATA = this.solicitud[0]; // Suponiendo que solo necesitas el primer elemento
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

  // Método para obtener la opinión de la solicitud
  getOpinion(): void {
    this.solicitudService.getDetalleOpinion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.opinion = data;

         // Verifica si hay datos y actualiza el formulario
      if (this.solicitud.length > 0) {
        const OPINIONDATA = this.opinion[0]; // Suponiendo que solo necesitas el primer elemento
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
}