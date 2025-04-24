import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultarequerimientosComponent } from "../consulta-requerimientos/consulta-requerimientos.component";
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-requerimientospaso1',
  standalone: true,
  imports: [CommonModule, ConsultarequerimientosComponent],
  templateUrl: './requerimientospaso1.component.html',
  styleUrl: './requerimientospaso1.component.scss',
})
export class Requerimientospaso1Component implements OnInit, OnDestroy {
  /**
     * Variable para almacenar el folio
     */
  public folio!: string;   
  private unsubscribe$ = new Subject<void>();
  /**
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  constructor(private folioQuery: FolioQuery) {
    /**
   * Constructor para la bandeja de requerimientos
   * @param folioQuery Consulta del folio
   * 
   */
  }
  ngOnInit(): void {
    /**
     * Recuperar el folio desde el store
     */    
    this.folioQuery.getFolio()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(folio => {
        this.folio = folio || '';
      });
  }
  /**
   * Índice de la pestaña seleccionada
   */
  indice: number = 1;
  
  /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método que se ejecuta cuando el componente se destruye
   */
  ngOnDestroy(): void {
    // Emitir un valor para completar todas las suscripciones activas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
