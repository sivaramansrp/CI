import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { map, Subject, takeUntil } from 'rxjs';
import { FormularioRegistroService } from '../../services/octava-temporal.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit, OnDestroy {
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
    private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
  constructor( private consultaQuery: ConsultaioQuery,
     private formularioRegistroService: FormularioRegistroService
  ){

  }
   ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      //this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
  // guardarDatosFormulario(): void {
  //   this.solocitud301Service
  //     .getRegistroTomaMuestrasMercanciasData().pipe(
  //       takeUntil(this.destroyNotifier$)
  //     )
  //     .subscribe((resp) => {
  //       if(resp){
  //       this.esDatosRespuesta = true;
  //       this.solocitud301Service.actualizarEstadoFormulario(resp);
  //       }
  //     });
  // }
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
