import { ActivatedRoute } from '@angular/router';
import { AgregarDestinatarioCustomComponent } from '../../../../shared/components/agregar-destinatario-custom/agregar-destinatario-custom.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite240321Query } from '../../estados/tramite240321Query.query';
import { Tramite240321Store } from '../../estados/tramite240321Store.store';
import { takeUntil } from 'rxjs';


/**
 * @title Agregar Destinatario Final Contenedora
 * @description Componente contenedor que gestiona la integración del componente de destinatario final con el store.
 * @summary Encapsula el componente de agregar destinatario final y propaga los datos al estado global.
 */

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioCustomComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent implements OnInit, OnDestroy {
   /**
     * Subject utilizado para gestionar la desuscripción de observables.
     * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
     * @property {Subject<void>} unsubscribe$
     * @private
     */
    private unsubscribe$ = new Subject<void>();
    /**
     * Almacena el índice del destinatario actual.
     * @property {string} destinatarioIndice
     */

    destinatarioIndice: string= '';

    /**
   * Datos de la tabla de destinatarios finales.
   * @property {DestinoFinal[]} destinatarioFinalTablaDatos
   */
  destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240321Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */
  constructor(public tramiteStore: Tramite240321Store,private route: ActivatedRoute,private tramiteQuery: Tramite240321Query) {
    // 
  }

  /**
   * Actualiza la lista de destinatarios finales en el store del trámite.
   *
   * @method updateDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
  /**
   * Actualiza los datos de un destinatario final existente en el store.
   *
   * @method actualizaExistenteEnDestinatarioDatos
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */


  actualizaExistenteEnDestinatarioDatos(event: DestinoFinal[]): void {
    this.tramiteStore.actualizaExistenteEnDestinatarioDatos(event);
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a los parámetros de la ruta y actualiza el estado del destinatario final.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.route.queryParams
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(params => {
          const INDICE = String(params['destinario']);
          this.destinatarioIndice = INDICE;
          this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
      });
        });
     
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   *
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
