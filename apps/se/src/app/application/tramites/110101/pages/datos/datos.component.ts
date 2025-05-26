import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject,map, takeUntil } from 'rxjs';
import { PantallasSvcService } from '../../services/pantallas-svc.service';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 110101
 * Establecer el índice del subtítulo
 */ 

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
   indice: number = 1;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;

   constructor(
    private pantallasSvc: PantallasSvcService,
    private consultaQuery: ConsultaioQuery
   ) {

   }

   ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
    })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    }
   }
   /**
    * Este método se utiliza para establecer el índice del subtítulo.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

   public guardarDatosFormulario(): void {
    this.pantallasSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.pantallasSvc.actualizarEstadoFormulario(response);
    })
   }

    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
   

}
