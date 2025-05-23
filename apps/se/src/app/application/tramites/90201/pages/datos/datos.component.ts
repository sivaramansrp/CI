import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import{ ConsultaioStore } from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 90201
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

  public consultaState!:ConsultaioState;

  private destroyNotifier$: Subject<void> = new Subject();


  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

constructor(private consultaQuery: ConsultaioQuery,private consultaStore:ConsultaioStore,private productoresService: ExpansionDeProductoresService) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
this.consultaStore.establecerConsultaio(
      '90201',
      'BANDEJA_SOLICITUDES',
      'se',
      '03039399393939393',
      'tipoTramite',
      'tipoTramite',
      true,
      false,
      true
    );
  }

   ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
      console.log(this.consultaState);
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  guardarDatosFormulario(): void {
    this.productoresService
      .getRegistroExpansionDeProductoresData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
       // this.productoresService.actualizarEstadoFormulario(resp);
        }
      });
  }
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
