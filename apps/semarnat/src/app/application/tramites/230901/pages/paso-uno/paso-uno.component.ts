import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite230401Store } from '../../../230401/estados/tramite230401.store';
import { Tramite230901Query } from '../../estados/tramite230901.query';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit{
  
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;
  isTablDisabled: boolean = false;
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private tramite230901Store: Tramite230401Store, private tramite230901Query:Tramite230901Query){
    //do nothing
  }


  ngOnInit(): void {
this.tramite230901Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$))
      .subscribe(state => {this.isTablDisabled = state.tipoDeMovimiento ? false : true});
  }


  /**
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
