import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite230902Query } from '../../estados/tramite230902.query';


/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {

  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;
  isTablDisabled: boolean = false;
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private tramite230901Query: Tramite230902Query) {
    //do nothing
  }


  ngOnInit(): void {
    this.tramite230901Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$))
      .subscribe(state => { this.isTablDisabled = state.tipodeMovimiento ? false : true });
  }


  /**
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}