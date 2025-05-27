import { Component } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';
import { Solocitud220401Service } from '../../services/service220401.service';
/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */ 
@Component({
  selector: 'app-pantalla-datos',
  templateUrl: './datos.component.html'
})

export class DatosComponent {
  public esDatosRespuesta: boolean = false;
   public consultaState!:ConsultaioState;
   private destroyNotifier$: Subject<void> = new Subject();
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

    constructor(
    private solocitud220401Service: Solocitud220401Service,
    private consultaQuery: ConsultaioQuery
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

    guardarDatosFormulario(): void {
    this.solocitud220401Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud220401Service.actualizarEstadoFormulario(resp);
        }
      });
  }
}
