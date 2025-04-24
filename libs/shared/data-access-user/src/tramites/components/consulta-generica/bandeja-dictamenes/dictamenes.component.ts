import { BodyTablaDictamenes, HeaderTablaDictamenes } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_DICTAMENES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DictamenesService } from '../../../../core/services/consultagenerica/dictamenes-service';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-dictamenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictamenes.component.html',
  styleUrl: './dictamenes.component.scss',
})
export class DictamenesComponent implements OnInit, OnDestroy {
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
     * Implementación para la tabla de documentos de dictamenes.
     *
     */
    readonly encabezadoTablaDictamen : HeaderTablaDictamenes[] = CONSULTA_DICTAMENES.encabezadoTablaDictamen;
    /**
       * Variable para almacenar los documentos
       */
    datosTablaDictamen: BodyTablaDictamenes[] = [];

    constructor(
        private folioQuery: FolioQuery,
        private dictamenService: DictamenesService
      ) {
        /**
       * Constructor por si lo requiremos en el futuro
       */
      }
    ngOnInit(): void {
      /**
       * Recuperar el folio desde el store
       */
      this.folioQuery.getFolio().subscribe((folio) => {
        this.folio = folio || '';
      });
      /**
       * Llamar al método para obtener los requerimientos al inicializar el componente
       */
      this.getDictamenes();
    }
  
    /**
    * Abre la pestaña para mostrar el detalle del dictamen.
    *
    * @param {number} id - Es el Id del dictamen.
    * @returns {void}
    */
    verDetalle(id: number): void {
      /**
       * Lógica para abrir el detalle del dictamen
       * @param id Número de identificación del dictamen
       * 
       */
    }
    /**
       * Método para obtener los dictamenes desde el servicio.
       * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
       * suscribe - Se suscribe al observable del servicio para obtener los datos.
       */
    getDictamenes(): void {
        this.dictamenService
          .getDictamenes()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((data) => {
            this.datosTablaDictamen = data;
          });
      }
      /**
       * Método `ngOnDestroy()`.
       * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
       * - Desuscribe la suscripción a los cambios en el formulario reactivo.
       *
       * @memberof DictamenesComponent
       */
      ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
      }
}