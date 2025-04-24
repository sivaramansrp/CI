import { BodyTablaTareasTramite, HeaderTablaTareasTramite } from '../../../../core/models/shared/consulta-generica.model';
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
    public unsubscribe$ = new Subject<void>();
    /**
     * Subject para notificar la destrucción del componente.
     */
    public destroyNotifier$: Subject<void> = new Subject();
    /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */

  constructor(private folioQuery: FolioQuery, private tareasTramiteService: TareasTramiteService) {
    /**
     * Constructor para la bandeja de tareas de tramite
     * @param folioQuery Consulta del folio
     * 
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
     * Llamar al método para obtener los requerimientos al inicializar el componente
     */
    this.getTareas();
  }
  /**
       * Configuración para la tabla del componente tareasTramite.
       * @param encabezadoTablaTareasTramite Encabezado de la tabla de tareas de tramite
       * @param datosTablaTareasTramite Datos de la tabla de tareas de tramite
       */
      readonly encabezadoTablaTareasTramite : HeaderTablaTareasTramite[] = CONSULTA_TAREASTRAMITE.encabezadoTablaTareasTramite;  
      /**
         * Variable para almacenar los documentos
         */
      datosTablaTareasTramite: BodyTablaTareasTramite[] = [];  
      
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
          this.destroyNotifier$.next();
          this.destroyNotifier$.complete();
        }
}