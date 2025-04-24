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
   * Variable para almacenar el folio
   */
  public folio!: string;
  public unsubscribe$ = new Subject<void>();
    /**
     * Subject para notificar la destrucción del componente.
     */
    public destroyNotifier$: Subject<void> = new Subject();
    
  /**
   * Implementación para la tabla de documentos de Opiniones.
   *
   */
  readonly encabezadoTablaOpiniones : HeaderTablaOpiniones[] = CONSULTA_OPINIONES.encabezadoTablaOpinion;  
  /**
     * Variable para almacenar los documentos
     */
  datosTablaOpiniones: BodyTablaOpiniones[] = [];

  constructor(private router: Router, private folioQuery: FolioQuery, private opinionesService: OpinionesService) {
      /** 
       * Se inyecta el Router para navegar a la vista de detalle de opinion
       * Se inyecta el FolioQuery para recuperar el folio desde el store
       * Se inyecta el CommonModule para usar las directivas de Angular
       * Se inyecta el HeaderTablaOpiniones y BodyTablaOpiniones para crear la tabla de opiniones
       * Se inyecta el CONSULTA_OPINIONES para crear la tabla de opiniones
       * Se inyecta el Validators para validar los campos del formulario
       */
    }

    ngOnInit(): void {
        /**
       * Recuperar el folio desde el store
       */
      this.folioQuery.getFolio().subscribe(folio => {
        this.folio = folio || '';
      });
      /**
     * Llamar al método para obtener las opiniones al inicializar el componente
     */
    this.getOpiniones();
    }
    
    /**
     * Abre una pestaña del navegador con las opiniones.
     *
     * @param {number} id - ID de la opinion.
     * @returns {void}
     */
    verDetalleOpinion(id: number): void {
      this.router.navigate(['/lib-detalle-opinion', id]);
    }
    /**
       * Método para obtener la lista de opiniones desde el servicio.
       * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
       * suscribe - Se suscribe al observable del servicio para obtener los datos.
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
       * Método `ngOnDestroy()`.
       * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
       * - Desuscribe la suscripción a los cambios en el formulario reactivo.
       *
       * @memberof OpinionComponent
       */
      ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
      }
}
