import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import {Subject, map,takeUntil } from 'rxjs';
/**
 * Componente que representa el paso uno del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {
     /**
     * showPreFillingOptions
     * Indica si se deben mostrar las opciones de prellenado.
     */
 showPreFillingOptions: boolean = false; 

 /**
* Índice de la pestaña actualmente seleccionada.
* Inicializado a 1 por defecto.
*/
 indice = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido del store. */
  public consultaState!: ConsultaioState;


 /**
  * Método para seleccionar una pestaña específica.
  *
  * @param i El índice de la pestaña a seleccionar.
  */
 seleccionaTab(i: number): void {
   this.indice = i;
 }

  constructor(
    private consultaQuery: ConsultaioQuery) {

  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      //
    }
  }
 
}
