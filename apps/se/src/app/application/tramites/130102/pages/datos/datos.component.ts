import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { ConsultaioState} from '@ng-mf/data-access-user';
import { FormularioRegistroService } from '../../services/octava-temporal.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit, OnDestroy {
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /*
  * @description Notificador para destruir el componente y cancelar suscripciones.
  */
    private destroyNotifier$: Subject<void> = new Subject();
    /*
  * @description Estado actual de la consulta, obtenido desde el store.
    */
  @Input() consultaState!: ConsultaioState;
  /**
   * Constructor del componente DatosComponent.
   * @param consultaQuery ConsultaQuery para obtener el estado de la consulta.
   * @param formularioRegistroService Servicio para manejar el registro del formulario.
   */
  constructor(
     private formularioRegistroService: FormularioRegistroService
  ){

  }
  /*
  * Método de inicialización del componente.
  * Se suscribe al estado de la consulta y actualiza la variable consultaState.
  */
   ngOnInit(): void {
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
  /**
   * Este método inicializa el formulario con validaciones y carga datos de productos.
   */
  guardarDatosFormulario(): void {
    this.formularioRegistroService
      .getSolicitudData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.formularioRegistroService.actualizarEstadoFormulario(resp);
        }
      });
  }
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
  /*
    * Método que se ejecuta al destruir el componente.
  */

   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
