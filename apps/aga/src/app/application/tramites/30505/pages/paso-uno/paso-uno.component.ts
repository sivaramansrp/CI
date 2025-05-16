import { Component, OnInit } from '@angular/core';
import { Solicitud30505State, Solicitud30505Store } from '../../../../core/estados/tramites/tramites30505.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud30505Query } from '../../../../core/queries/tramites30505.query';
/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
/**
 * Componente que representa el primer paso de un trámite.
 */
export class PasoUnoComponent implements OnInit {
  /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
  indice: number = 1;

   public destroyNotifier$: Subject<void> = new Subject();
   
  selectedCheckboxes: string[] = []; 

  public AvisoState!: Solicitud30505State;
  
 constructor(public tramiteStore:Solicitud30505Store,public tramiteQuery:Solicitud30505Query
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

   ngOnInit(): void {

    this.tramiteQuery.selectSolicitud$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState) => {
                this.AvisoState = seccionState;
              })
            )
            .subscribe()

   this.selectedCheckboxes = this.AvisoState?.selectedCheckbox;
  }
  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i:number): void {
    this.indice = i;
  }

  toggleDataVisibility(datos: string[]): void {
    this.selectedCheckboxes = datos;
  }
}
